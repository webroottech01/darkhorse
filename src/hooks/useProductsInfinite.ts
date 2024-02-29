'use client'

import {
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query'

import useVenue from './useVenue'
import { ListProductsParams, Product, ProductsResponse } from '@/types/product'
import productService from '@/api/productService'

export default function useProductsInfinite({
  queryKey,
  params,
  options,
}: {
  queryKey: QueryKey
  params: {
    productCategoryId?: string
    productOfferId?: string
    limit: number
  } & ListProductsParams
  options?: UseInfiniteQueryOptions<ProductsResponse>
}): UseInfiniteQueryResult<ProductsResponse> {
  const q_venue = useVenue()
  return useInfiniteQuery<ProductsResponse>({
    ...options,
    queryKey: ['products', ...queryKey].filter(Boolean),
    queryFn: async ({ pageParam = 1, signal }) => {
      const queryParams = {
        ...params,
        skip: (pageParam - 1) * params.limit,
      }

      return productService.list(
        {
          ...queryParams,
          venueId: q_venue?.data?.id!,
        },
        {
          signal,
        }
      )
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.pageCount) return false //no more products
      return pages.length + 1
    },
  })
}
