// 'use client'

// import { UseQueryOptions, useQuery } from '@tanstack/react-query'

// import { OrderCartWithItemsPopulated } from 'shared'
// import useVenue from './useVenue'
// import { getByIdAndVenueId } from 'api-library/orderCarts'
// import { QueryClientKey } from '@/utils/queryClient'
// import { getOrCreateCart } from '@/utils/cart'

// const useCart = (
//   options?: Omit<
//     UseQueryOptions<OrderCartWithItemsPopulated>,
//     'queryKey' | 'queryFn'
//   > & {
//     cartId?: string
//   }
// ) => {
//   const currentVenue = useVenue()

//   return useQuery<OrderCartWithItemsPopulated | null>({
//     ...((options ?? {}) as any),
//     queryKey: QueryClientKey.CART,
//     queryFn: async () => {
//       if (options?.cartId) {
//         return getByIdAndVenueId(options.cartId, currentVenue.id)
//       }

//       return getOrCreateCart(currentVenue.id)
//     },
//     keepPreviousData: true,
//     enabled: false,
//   })
// }

// export default useCart
