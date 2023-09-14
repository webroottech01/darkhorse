import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { OrderCart } from 'src/types'
import { getFromStoredByVenueId } from 'src/utils/cartUtils'
import useVenueId from './useVenueId'
import { QueryClientKey } from 'src/queryClient'

const useCart = (
  options?: Omit<UseQueryOptions<OrderCart>, 'queryKey' | 'queryFn'>
) => {
  const venueId = useVenueId()

  return useQuery<OrderCart | null>({
    ...((options ?? {}) as any),
    queryKey: QueryClientKey.CART,
    queryFn: () => getFromStoredByVenueId(venueId),
  })
}

export default useCart
