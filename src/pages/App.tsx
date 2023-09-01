import { Outlet } from '@tanstack/react-router'
import React from 'react'

import TopNav from 'src/components/TopNav'
import useCart from 'src/hooks/useCart'

export default function App() {
  useCart()

  return (
    <>
      <TopNav />
      <Outlet />
    </>
  )
}
