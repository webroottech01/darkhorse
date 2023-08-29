import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import styled from 'styled-components'

import HomePage from './pages/HomePage'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  )
}
