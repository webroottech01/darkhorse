'use client'

import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import useVenue from './useVenue'
import { QueryClientKey } from '@/utils/queryClient'
import { Cart, CartWithItemProducts } from '@/types/cart'
import cartService from '@/api/cartService'

const useCart = (
  options?: Omit<UseQueryOptions<CartWithItemProducts>, 'queryKey' | 'queryFn'> & {
    cartId?: string
  }
) => {
  const q_venue = useVenue()

  return useQuery<CartWithItemProducts | null>({
    ...((options ?? {}) as any),
    queryKey: QueryClientKey.CART,
    queryFn: async () => {
      if (options?.cartId) {
        return cartService.getById(options.cartId)
      }
      return cartService.getOrCreate(q_venue.data?.id!)
    },
    keepPreviousData: true,
    enabled: false,
  })
}

export default useCart
