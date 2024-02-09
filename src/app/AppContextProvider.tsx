'use client'

import { createContext } from 'react'

import { Venue } from '@/types'

type AppContext = {
  currentVenue: Venue
}

export const AppContext = createContext<AppContext>({
  currentVenue: {} as Venue,
})

export default function AppContextProvider({
  data,
  children,
}: {
  data: string
  children: React.ReactNode
}) {
  return (
    <AppContext.Provider
      value={{
        currentVenue: JSON.parse(data),
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
