'use client'

import { useMutation } from '@tanstack/react-query'

import useVenue from './useVenue'
import { CartWithItemProducts, CartCreateData, Cart } from '@/types/cart'
import { QueryClientKey } from '@/utils/queryClient'
import DispenseError from '@/api/dispenseError'
import cartService from '@/api/cartService'

export default function useCartMutation(props?: {
  onSuccess?: (cart: CartWithItemProducts | null) => void
  onError: (error: DispenseError) => void
}) {
  const q_venue = useVenue()

  return useMutation({
    mutationKey: QueryClientKey.CART,
    mutationFn: async (data: CartCreateData) => {
      const res = await cartService.create({
        ...data,
        venueId: q_venue?.data?.id!,
      })

      return res as CartWithItemProducts
    },
    onSuccess(data) {
      props?.onSuccess?.(data)
    },
    onError: (error: DispenseError) => {
      props?.onError?.(error)
    },
  })
}
