'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { RouteName, getCurrentRouteName } from '@/utils/route'

export default function useRouteName() {
  const pathname = usePathname()
  const [currentRouteName, setCurrentRouteName] =
    React.useState<RouteName | null>(getCurrentRouteName(pathname))

  React.useEffect(() => {
    setCurrentRouteName(getCurrentRouteName(pathname))
  }, [pathname])

  return currentRouteName
}
