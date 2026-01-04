import { createContext, useContext, useEffect, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [mode, setMode] = useLocalStorage('theme', 'light')

  useEffect(() => {
    const body = document.body
    body.dataset.theme = mode
  }, [mode])

  function toggleTheme() {
    setMode(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const value = useMemo(() => ({ mode, toggleTheme }), [mode])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
