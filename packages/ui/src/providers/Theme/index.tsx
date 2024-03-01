'use client'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { canUseDOM } from '../..'

export type Theme = 'dark' | 'light'

export type ThemeContext = {
  autoMode: boolean
  setTheme: (theme: Theme) => void
  theme: Theme
}

const initialContext: ThemeContext = {
  autoMode: true,
  setTheme: () => null,
  theme: 'light',
}

const Context = createContext(initialContext)

const localStorageKey = 'payload-theme'

const getTheme = (): {
  theme: Theme
  themeFromStorage: null | string
} => {
  let theme: Theme
  const themeFromStorage = window.localStorage.getItem(localStorageKey)

  if (themeFromStorage === 'light' || themeFromStorage === 'dark') {
    theme = themeFromStorage
  } else {
    theme =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
  }

  document.documentElement.setAttribute('data-theme', theme)
  return { theme, themeFromStorage }
}

const defaultTheme = 'light'

export const ThemeProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)

  const [autoMode, setAutoMode] = useState<boolean>()

  useEffect(() => {
    const { theme, themeFromStorage } = getTheme()
    setThemeState(theme)
    setAutoMode(!themeFromStorage)
  }, [])

  const setTheme = useCallback((themeToSet: 'auto' | Theme) => {
    if (themeToSet === 'light' || themeToSet === 'dark') {
      setThemeState(themeToSet)
      setAutoMode(false)
      window.localStorage.setItem(localStorageKey, themeToSet)
      document.documentElement.setAttribute('data-theme', themeToSet)
    } else if (themeToSet === 'auto') {
      const existingThemeFromStorage = window.localStorage.getItem(localStorageKey)
      if (existingThemeFromStorage) window.localStorage.removeItem(localStorageKey)
      const themeFromOS =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      document.documentElement.setAttribute('data-theme', themeFromOS)
      setAutoMode(true)
      setThemeState(themeFromOS)
    }
  }, [])

  return <Context.Provider value={{ autoMode, setTheme, theme }}>{children}</Context.Provider>
}

export const useTheme = (): ThemeContext => useContext(Context)

export default Context
