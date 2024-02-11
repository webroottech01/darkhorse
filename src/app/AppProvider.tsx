'use client'

import React from 'react'

import authUtils from '@/utils/auth'

export const AppContext = React.createContext<{
  isLoggedIn: boolean
  setIsLoggedIn: (loggedIn: boolean) => void
  logout: () => void
}>({
  isLoggedIn: false,
  setIsLoggedIn: (loggedIn: boolean) => {},
  logout: () => {},
})

export default function AppProvider({
  authToken,
  children,
}: {
  authToken?: string
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!authToken)
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    logout() {
      authUtils.logout()

      setIsLoggedIn(false)
    },
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
