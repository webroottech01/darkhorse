'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Loader from './Loader'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1200) // simulate loading delay or replace with actual data load status

    return () => clearTimeout(timer)
  }, [pathname]) // triggers on route change

  return (
    <>
      {loading && <Loader />}
      {!loading && children}
    </>
  )
}