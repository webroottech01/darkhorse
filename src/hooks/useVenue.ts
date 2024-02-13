'use client'

import { useQuery } from '@tanstack/react-query'

import { QueryClientKey } from '@/utils/queryClient'
import dispense from '@/utils/dispense'

const useVenue = () => {
  return useQuery({
    queryKey: QueryClientKey.VENUE,
    queryFn: () => {
      return dispense.getVenueById(process.env.NEXT_PUBLIC_DISPENSE_VENUE_ID!)
    },
  })
}

export default useVenue
