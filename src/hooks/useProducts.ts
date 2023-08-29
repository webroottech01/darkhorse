import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { request } from 'src/apiClient'
import { Product } from 'src/types'

type ProductsResponse = { data: Product[] }

export default function useProducts({
  params,
  options,
}: {
  params: {
    storeId: string
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
