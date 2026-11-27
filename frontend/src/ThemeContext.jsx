import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// Preferências de personalização da interface e dos estímulos (artigo, seção 4.4):
// alto contraste, tamanho da fonte e controle de som. Também: tema escuro, modo calmo e ano escolar.
// Obs.: o controle de vibração NÃO é implementado — o artigo o trata como recurso não confirmado.
const STORAGE_KEY = 'altlearn-settings'

export const FONT_SCALES = [
  { value: 1, label: 'Normal', sample: 'A' },
  { value: 1.2, label: 'Grande', sample: 'A' },
  { value: 1.4, label: 'Maior', sample: 'A' },
  { value: 1.6, label: 'Gigante', sample: 'A' },
]

export const DEFAULT_SETTINGS = {
  darkMode: false,
  highContrast: false,
  fontScale: 1,
  soundOn: true,
  calmMode: false,
  year: 1,
}

function readSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    if (saved) return { ...DEFAULT_SETTINGS, ...saved }
  } catch { /* ignora JSON inválido */ }
  // compatibilidade com as chaves do protótipo inicial
  return {
    ...DEFAULT_SETTINGS,
    darkMode: localStorage.getItem('altlearn-dark-mode') === 'true',
    highContrast: localStorage.getItem('altlearn-high-contrast') === 'true',
  }
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(readSettings)

  useEffect(() => {
    const { darkMode, highContrast, fontScale, calmMode } = settings
    for (const el of [document.documentElement, document.body]) {
      el.classList.toggle('dark-mode', darkMode)
      el.classList.toggle('light-mode', !darkMode)
      el.classList.toggle('high-contrast', highContrast)
      el.classList.toggle('calm-mode', calmMode)
    }
    document.documentElement.style.colorScheme = darkMode || highContrast ? 'dark' : 'light'
    document.documentElement.style.setProperty('--fs', String(fontScale))
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)) } catch { /* modo privado */ }
  }, [settings])

  const update = useCallback((patch) => setSettings((current) => ({ ...current, ...patch })), [])
  const replace = useCallback((next) => setSettings({ ...DEFAULT_SETTINGS, ...next }), [])

  const value = useMemo(() => ({
    ...settings,
    settings,
    update,
    replace,
    setDarkMode: (darkMode) => update({ darkMode }),
    setHighContrast: (highContrast) => update({ highContrast }),
    setSoundOn: (soundOn) => update({ soundOn }),
  }), [settings, update, replace])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext)
}
