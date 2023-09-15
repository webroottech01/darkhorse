import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { request } from 'src/apiClient'
import { Product, ProductType } from 'src/types'

type ProductsResponse = { data: Product[] }

export default function useProducts({
  params,
  options,
}: {
  params: {
    venueId: string
    type?: ProductType
  }
  options?: UseQueryOptions<ProductsResponse>
}) {
  return useQuery<ProductsResponse>(
    ['products', params],
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
