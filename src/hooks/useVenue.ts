'use client'

import { useQueryClient } from '@tanstack/react-query'

import { QueryClientKey } from '@/utils/queryClient'
import { Venue } from '@/types'

const useVenue = () => {
  const queryClient = useQueryClient()

  return queryClient.getQueryData<Venue>(QueryClientKey.VENUE) as Venue
}

export default useVenue
