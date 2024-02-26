'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import { RouteName, getCurrentRouteName } from '@/utils/route'
import path from 'path'

export default function useRouteName() {
  const pathname = usePathname()
  const [currentRouteName, setCurrentRouteName] =
    React.useState<RouteName | null>(getCurrentRouteName(pathname))

  React.useEffect(() => {
    setCurrentRouteName(getCurrentRouteName(pathname))
  }, [pathname])

  // React.useEffect(() => {
  //   console.log('currentRouteName', currentRouteName)
  // }, [currentRouteName])

  return currentRouteName
}
