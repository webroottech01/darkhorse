import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { OrderCart } from 'src/types'
import { getFromStoredByVenueId } from 'src/utils/cartUtils'
import useVenueId from './useVenueId'

const useCart = (
  options?: Omit<UseQueryOptions<OrderCart>, 'queryKey' | 'queryFn'>
) => {
  const venueId = useVenueId()

  console.log('venueId', venueId)

  return useQuery<OrderCart | null>({
    ...((options ?? {}) as any),
    queryKey: ['cart'],
    queryFn: () => getFromStoredByVenueId(venueId),
  })
}

export default useCart
