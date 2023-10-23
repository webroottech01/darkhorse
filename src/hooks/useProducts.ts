import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { request } from 'src/apiClient'
import { QueryClientKey } from 'src/queryClient'
import { Product, ProductType } from 'src/types'

type ProductsResponse = { data: Product[] }

export default function useProducts({
  params,
  options,
}: {
  params: {
    venueId: string
    featured?: boolean
    new?: boolean
    type?: ProductType | ProductType[]
  }
  options?: UseQueryOptions<ProductsResponse>
}) {
  return useQuery<ProductsResponse>(
    [...QueryClientKey.PRODUCTS, params],
    () => {
      return request<ProductsResponse>({
        path: '/products',
        params,
      })
    },
    {
      ...options,
    }
  )
}
