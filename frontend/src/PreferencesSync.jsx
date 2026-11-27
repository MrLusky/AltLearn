import { useEffect, useRef } from 'react'
import { useAuth } from './AuthContext.jsx'
import { useTheme } from './ThemeContext.jsx'
import { api, toServerPrefs } from './api.js'

// Quando há usuário logado, salva as preferências no MySQL (com pequeno atraso para não enviar a cada clique).
export default function PreferencesSync() {
  const { user } = useAuth()
  const { settings } = useTheme()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) { first.current = false; return }
    if (!user) return
    const timer = setTimeout(() => {
      api('/preferences', { method: 'PUT', body: toServerPrefs(settings) }).catch(() => { /* tenta de novo na próxima mudança */ })
    }, 600)
    return () => clearTimeout(timer)
  }, [settings, user])

  return null
}
