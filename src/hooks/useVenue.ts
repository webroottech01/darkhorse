'use client'

import { useQuery } from '@tanstack/react-query'

import { QueryClientKey } from '@/utils/queryClient'
import venueService from '@/api/venueService'

const useVenue = () => {
  return useQuery({
    queryKey: QueryClientKey.VENUE,
    queryFn: () => {
      return venueService.getById(process.env.NEXT_PUBLIC_DISPENSE_VENUE_ID!)
    },
  })
}

export default useVenue
