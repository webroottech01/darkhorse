'use client'

import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react'
import { queryClientUtils } from '@/utils/queryClient'
import AppProvider from './AppProvider'

export default function Providers({
  children,
  dehydratedState,
  authToken,
}: {
  children: React.ReactNode
  dehydratedState: DehydratedState
  authToken?: string
}) {
  //This ensures that data is not shared between different users and requests, while still only creating the QueryClient once per component lifecycle.
  const [queryClient] = React.useState(() => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: process.env.NEXT_PUBLIC_ENV !== 'local',
          refetchOnWindowFocus: process.env.NEXT_PUBLIC_ENV !== 'local',
          staleTime: 60 * 20000, // 20 minutes
        },
      },
    })

    queryClientUtils.setQueryClient(queryClient)

    return queryClient
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <AppProvider authToken={authToken}>{children}</AppProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
