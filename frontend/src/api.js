// Cliente fino da API Laravel. Base configurável por VITE_API_URL (padrão: /api, com proxy no Vite).
const BASE = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')
export const TOKEN_KEY = 'altlearn-token'

export class ApiError extends Error {
  constructor(message, status, errors = {}) {
    super(message)
    this.status = status
    this.errors = errors
  }
  get offline() { return this.status === 0 }
}

export async function api(path, { method = 'GET', body, token = localStorage.getItem(TOKEN_KEY) } = {}) {
  let response
  try {
    response = await fetch(`${BASE}${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError('Sem conexão com o servidor.', 0)
  }
  const data = response.status === 204 ? null : await response.json().catch(() => null)
  if (!response.ok) {
    const first = data?.errors ? Object.values(data.errors).flat()[0] : null
    throw new ApiError(first || data?.message || 'Algo deu errado. Tente de novo.', response.status, data?.errors)
  }
  return data
}

// Mapeamento entre as preferências do app (camelCase) e as colunas do MySQL (snake_case).
export const toServerPrefs = (s) => ({
  dark_mode: s.darkMode, high_contrast: s.highContrast, font_scale: s.fontScale,
  sound_on: s.soundOn, calm_mode: s.calmMode, grade_year: s.year,
})
export const fromServerPrefs = (p) => ({
  darkMode: !!p.dark_mode, highContrast: !!p.high_contrast, fontScale: Number(p.font_scale) || 1,
  soundOn: !!p.sound_on, calmMode: !!p.calm_mode, year: Number(p.grade_year) || 1,
})
