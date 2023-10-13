import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { request } from 'src/apiClient'
import { Product } from 'src/types'

type ProductResponse = Product

export default function useProducts({
  params,
  options,
}: {
  params: {
    venueId: string
    productId: string
  }
  options?: UseQueryOptions<ProductResponse>
}) {
  return useQuery<ProductResponse>(
    ['product', params],
    () => {
      const productId = params.productId

      const _params: any = { ...params }
      delete _params.productId

      return request<ProductResponse>({
        path: `/products/${productId}`,
        params: _params,
      })
    },
    {
      ...options,
    }
  )
}
