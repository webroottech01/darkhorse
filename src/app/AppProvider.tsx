'use client'

import React from 'react'

import authUtils from '@/utils/auth'

export const AppContext = React.createContext<{
  venueId: string
  isLoggedIn: boolean
  setIsLoggedIn: (loggedIn: boolean) => void
  logout: () => void
}>({
  venueId: process.env.NEXT_PUBLIC_DISPENSE_VENUE_ID!,
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
    venueId: process.env.NEXT_PUBLIC_DISPENSE_VENUE_ID!,
    isLoggedIn,
    setIsLoggedIn,
    logout() {
      authUtils.logout()

      setIsLoggedIn(false)
    },
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
