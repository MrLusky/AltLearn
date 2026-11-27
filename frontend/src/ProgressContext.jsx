import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from './api.js'
import { useAuth } from './AuthContext.jsx'
import { ADOPT_GUEST_KEY } from './authKeys.js'
import { ACTIVITIES, YEARS, LEVELS_PER_YEAR } from './content/index.js'

// Progresso POR CONTA. Cada pessoa (e o visitante) tem a sua própria cópia no aparelho:
//   altlearn-progress-v1:guest  → visitante (sem conta)
//   altlearn-progress-v1:<id>   → conta com esse id
// O progresso do visitante é TRANSFERIDO (movido, não copiado) apenas para a conta recém-criada;
// depois disso o visitante volta a começar do zero. Entrar numa conta existente nunca mistura progressos.
// Sessões feitas sem internet ficam numa fila por conta e são enviadas ao MySQL quando houver conexão.
const ProgressContext = createContext(null)

const keyOf = (name, owner) => `altlearn-${name}:${owner}`
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback } catch { return fallback } }
const write = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* sem espaço/modo privado */ } }

function mergeStar(map, slug, year, level, stars) {
  const next = { ...map, [slug]: { ...(map[slug] || {}), [year]: { ...((map[slug] || {})[year] || {}) } } }
  next[slug][year][level] = Math.max(next[slug][year][level] || 0, stars)
  return next
}

function load(owner) {
  // compatibilidade: versão anterior guardava tudo numa chave única (era do visitante)
  if (owner === 'guest' && localStorage.getItem('altlearn-progress-v1') && !localStorage.getItem(keyOf('progress-v1', 'guest'))) {
    write(keyOf('progress-v1', 'guest'), read('altlearn-progress-v1', {}))
    localStorage.removeItem('altlearn-progress-v1')
    localStorage.removeItem('altlearn-progress-v1-last')
  }
  return { owner, stars: read(keyOf('progress-v1', owner), {}), last: read(keyOf('last', owner), null) }
}

// Resumo de uma fase já conquistada, para enviar ao banco quando o visitante vira conta.
function importedSession(slug, year, level, stars) {
  const total = ACTIVITIES.find((a) => a.slug === slug)?.levels.find((l) => l.year === Number(year) && l.level === Number(level))?.exercises.length ?? 1
  return { activity: slug, grade_year: Number(year), level: Number(level), correct: total, total, mistakes: 0, hints: stars >= 3 ? 0 : stars === 2 ? 1 : 3, stars, duration_seconds: 0, attempts: [] }
}

export function ProgressProvider({ children }) {
  const { user } = useAuth()
  const owner = user?.id ? String(user.id) : 'guest'
  const [state, setState] = useState(() => load(owner))

  // trocou de conta (entrou, saiu ou criou conta): carrega o progresso daquela pessoa
  if (state.owner !== owner) setState(load(owner))

  const queueKey = keyOf('pending-sessions', owner)

  // Conta recém-criada: adota o progresso do visitante uma única vez.
  useEffect(() => {
    if (owner === 'guest' || localStorage.getItem(ADOPT_GUEST_KEY) !== owner) return
    localStorage.removeItem(ADOPT_GUEST_KEY)
    const guestKey = keyOf('progress-v1', 'guest')
    const guest = read(guestKey, {})
    const sessions = []
    let merged = read(keyOf('progress-v1', owner), {})
    for (const [slug, years] of Object.entries(guest)) for (const [year, levels] of Object.entries(years)) for (const [level, stars] of Object.entries(levels)) {
      if (!stars) continue
      merged = mergeStar(merged, slug, year, level, stars)
      sessions.push(importedSession(slug, year, level, stars))
    }
    if (!sessions.length) return
    write(keyOf('progress-v1', owner), merged)
    write(queueKey, [...read(queueKey, []), ...sessions])
    localStorage.removeItem(guestKey)
    localStorage.removeItem(keyOf('last', 'guest'))
    setState((current) => (current.owner === owner ? { ...current, stars: merged } : current))
  }, [owner, queueKey])

  const flush = useCallback(async () => {
    const queue = read(queueKey, [])
    if (!queue.length) return
    const remaining = []
    for (const session of queue) {
      try { await api('/sessions', { method: 'POST', body: session }) } catch (error) {
        if (error.status === 0 || error.status >= 500) remaining.push(session) // tenta de novo mais tarde
      }
    }
    write(queueKey, remaining)
  }, [queueKey])

  const pull = useCallback(async () => {
    const data = await api('/progress')
    setState((current) => {
      if (current.owner !== owner) return current
      let merged = current.stars
      for (const row of data.progress) merged = mergeStar(merged, row.activity, row.grade_year, row.level, row.stars)
      write(keyOf('progress-v1', owner), merged)
      return { ...current, stars: merged }
    })
  }, [owner])

  // Ao entrar (ou voltar a ficar online): envia a fila e traz o que está no banco.
  useEffect(() => {
    if (owner === 'guest') return
    const sync = () => flush().then(pull).catch(() => {})
    sync()
    window.addEventListener('online', sync)
    return () => window.removeEventListener('online', sync)
  }, [owner, flush, pull])

  const recordSession = useCallback(async (session) => {
    const marker = { slug: session.activity, year: session.grade_year, level: session.level }
    setState((current) => {
      const stars = mergeStar(current.stars, session.activity, session.grade_year, session.level, session.stars)
      write(keyOf('progress-v1', current.owner), stars)
      write(keyOf('last', current.owner), marker)
      return { ...current, stars, last: marker }
    })
    if (owner === 'guest') return
    try { await api('/sessions', { method: 'POST', body: session }) } catch (error) {
      if (error.status === 0 || error.status >= 500) write(queueKey, [...read(queueKey, []), session])
    }
  }, [owner, queueKey])

  const value = useMemo(() => {
    const { stars, last } = state
    const starsOf = (slug, year, level) => stars[slug]?.[year]?.[level] || 0
    const yearStars = (slug, year) => Array.from({ length: LEVELS_PER_YEAR }, (_, i) => starsOf(slug, year, i + 1)).reduce((a, b) => a + b, 0)
    const totalStars = ACTIVITIES.reduce((sum, a) => sum + YEARS.reduce((s, y) => s + yearStars(a.slug, y), 0), 0)
    const nextFor = (year) => {
      for (const a of ACTIVITIES) for (let l = 1; l <= LEVELS_PER_YEAR; l += 1) if (!starsOf(a.slug, year, l)) return { slug: a.slug, year, level: l }
      return null
    }
    return { stars, last, starsOf, yearStars, totalStars, nextFor, recordSession }
  }, [state, recordSession])

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress() {
  return useContext(ProgressContext)
}
