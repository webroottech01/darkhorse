'use client'

import React from 'react'

import useCart from '@/hooks/useCart'
import useUser from '@/hooks/useUser'

export default function AppInit({}: {}) {
  const q_cart = useCart()
  const q_user = useUser()

  React.useEffect(() => {
    q_cart.refetch()
  }, [])

  return null
}
