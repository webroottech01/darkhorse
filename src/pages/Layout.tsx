import { Outlet } from '@tanstack/react-router'
import React from 'react'

import TopNav from 'src/components/TopNav'

export default function Layout() {
  return (
    <>
      <TopNav />
      <Outlet />
    </>
  )
}
