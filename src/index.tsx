import type {} from 'styled-components/cssprop'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './global.css'
import reportWebVitals from './reportWebVitals'
import router from './router'
import { RouterProvider } from '@tanstack/react-router'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)

reportWebVitals()
