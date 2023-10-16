import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { Venue } from 'src/types'
import useVenueId from './useVenueId'
import { getVenueById } from 'src/api/venueService'

type VenueResponse = Venue

export default function useVenue({
  params,
  options,
}: {
  params: {
    venueId: string
    productId: string
  }
  options?: UseQueryOptions<VenueResponse>
}) {
  const venueId = useVenueId()

  return useQuery<VenueResponse>(
    ['venue', params],
    () => {
      return getVenueById(venueId)
    },
    {
      ...options,
    }
  )
}
