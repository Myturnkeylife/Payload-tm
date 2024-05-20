'use client'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

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

const getTheme = (
  cookieKey,
): {
  theme: Theme
  themeFromCookies: null | string
} => {
  let theme: Theme

  const themeFromCookies = window.document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${cookieKey}=`))
    ?.split('=')[1]

  if (themeFromCookies === 'light' || themeFromCookies === 'dark') {
    theme = themeFromCookies
  } else {
    theme =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
  }

  document.documentElement.setAttribute('data-theme', theme)

  return { theme, themeFromCookies }
}

export const defaultTheme = 'light'

export const ThemeProvider: React.FC<{
  children?: React.ReactNode
  cookiePrefix?: string
  theme?: Theme
}> = ({ children, cookiePrefix, theme: initialTheme }) => {
  const cookieKey = `${cookiePrefix || 'payload'}-theme`

  const [theme, setThemeState] = useState<Theme>(initialTheme || defaultTheme)

  const [autoMode, setAutoMode] = useState<boolean>()

  useEffect(() => {
    const { theme, themeFromCookies } = getTheme(cookieKey)
    setThemeState(theme)
    setAutoMode(!themeFromCookies)
  }, [cookieKey])

  const setTheme = useCallback(
    (themeToSet: 'auto' | Theme) => {
      const existingCookies = window.document.cookie

      if (themeToSet === 'light' || themeToSet === 'dark') {
        setThemeState(themeToSet)
        setAutoMode(false)
        // replace cookie if found, if not, set it
        const cookiesWithNewTheme = existingCookies.includes(cookieKey)
          ? existingCookies.replace(
              new RegExp(`${cookieKey}=(light|dark)`),
              `${cookieKey}=${themeToSet}`,
            )
          : `${cookieKey}=${themeToSet}; ${existingCookies}`

        window.document.cookie = cookiesWithNewTheme
        document.documentElement.setAttribute('data-theme', themeToSet)
      } else if (themeToSet === 'auto') {
        // remove cookie if found
        const cookiesWithoutTheme = existingCookies.replace(
          new RegExp(`${cookieKey}=(light|dark)`),
          '',
        )

        window.document.cookie = cookiesWithoutTheme

        const themeFromOS =
          window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
        document.documentElement.setAttribute('data-theme', themeFromOS)
        setAutoMode(true)
        setThemeState(themeFromOS)
      }
    },
    [cookieKey],
  )

  return <Context.Provider value={{ autoMode, setTheme, theme }}>{children}</Context.Provider>
}

export const useTheme = (): ThemeContext => useContext(Context)
