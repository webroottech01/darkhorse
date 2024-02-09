import { cache } from 'react'

import { Product } from '@/types'
import { request } from './apiClient'

type ProductsResponse = {
  data: Product[]
  count: number
}

export const listProducts = cache(
  async (params: {
    venueId: string
    limit?: number
  }): Promise<ProductsResponse> => {
    return request<ProductsResponse>({
      type: 'GET',
      path: '/products',
      params,
    })
  }
)

export const getProductById = cache(
  async (
    id: string,
    params: {
      venueId: string
    }
  ): Promise<Product> => {
    return request<Product>({
      type: 'GET',
      path: `/products/${id}`,
      params,
    })
  }
)
