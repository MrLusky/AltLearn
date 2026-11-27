import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api, ApiError, TOKEN_KEY, fromServerPrefs, toServerPrefs } from './api.js'
import { ADOPT_GUEST_KEY } from './authKeys.js'
import { useTheme } from './ThemeContext.jsx'

const USER_KEY = 'altlearn-user'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const { replace, settings } = useTheme()
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || 'null') } catch { return null }
  })
  const [ready, setReady] = useState(!token)

  const store = useCallback((nextToken, nextUser) => {
    if (nextToken) localStorage.setItem(TOKEN_KEY, nextToken); else localStorage.removeItem(TOKEN_KEY)
    if (nextUser) localStorage.setItem(USER_KEY, JSON.stringify(nextUser)); else localStorage.removeItem(USER_KEY)
    setToken(nextToken)
    setUser(nextUser)
  }, [])

  // Revalida a sessão ao abrir o app. Sem internet, mantém o usuário salvo (uso offline).
  useEffect(() => {
    if (!token) return
    let active = true
    api('/me', { token })
      .then((data) => {
        if (!active) return
        setUser(data.user)
        localStorage.setItem(USER_KEY, JSON.stringify(data.user))
        if (data.preferences) replace(fromServerPrefs(data.preferences))
      })
      .catch((error) => { if (active && error instanceof ApiError && error.status === 401) store(null, null) })
      .finally(() => { if (active) setReady(true) })
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const finishAuth = useCallback((data) => {
    store(data.token, data.user)
    if (data.preferences) replace(fromServerPrefs(data.preferences))
    return data.user
  }, [store, replace])

  // Conta nova: o progresso do visitante passa para ela (uma única vez) e as escolhas de
  // personalização feitas no aparelho viram as preferências da conta.
  const finishSignup = useCallback((data) => {
    localStorage.setItem(ADOPT_GUEST_KEY, String(data.user.id))
    store(data.token, data.user)
    api('/preferences', { method: 'PUT', body: toServerPrefs(settings), token: data.token }).catch(() => {})
    return data.user
  }, [store, settings])

  const login = useCallback(async (email, password) => finishAuth(await api('/login', { method: 'POST', body: { email, password }, token: null })), [finishAuth])
  const register = useCallback(async (payload) => finishSignup(await api('/register', { method: 'POST', body: payload, token: null })), [finishSignup])
  // Entrar com Google: a API confere o token do Google; `created` indica conta nova.
  const loginWithGoogle = useCallback(async (credential) => {
    const data = await api('/auth/google', { method: 'POST', body: { credential, grade_year: settings.year }, token: null })
    return data.created ? finishSignup(data) : finishAuth(data)
  }, [finishAuth, finishSignup, settings.year])
  const logout = useCallback(async () => {
    try { await api('/logout', { method: 'POST' }) } catch { /* sem conexão: apenas sai localmente */ }
    store(null, null)
  }, [store])

  const value = useMemo(() => ({ user, token, ready, login, register, loginWithGoogle, logout }), [user, token, ready, login, register, loginWithGoogle, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
