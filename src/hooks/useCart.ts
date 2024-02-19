'use client'

import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { Cart } from '@dispense/dispense-js'

import useVenue from './useVenue'
import { QueryClientKey } from '@/utils/queryClient'
import { getOrCreateCart } from '@/utils/cart'
import dispense from '@/utils/dispense'

const useCart = (
  options?: Omit<UseQueryOptions<Cart>, 'queryKey' | 'queryFn'> & {
    cartId?: string
  }
) => {
  const q_venue = useVenue()

  return useQuery<Cart | null>({
    ...((options ?? {}) as any),
    queryKey: QueryClientKey.CART,
    queryFn: async () => {
      if (options?.cartId) {
        return dispense.getCartById(options.cartId)
      }
      return getOrCreateCart(q_venue.data?.id!)
    },
    keepPreviousData: true,
    enabled: false,
  })
}

export default useCart
