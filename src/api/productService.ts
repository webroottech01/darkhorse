import { ListProductsParams, ProductsResponse, Product } from '@/types/product'
import { RequestOptions, request } from './dispenseApiClient'

class ProductService {
  list = async (
    params: ListProductsParams,
    options?: RequestOptions
  ): Promise<ProductsResponse> => {
    return request<ProductsResponse>({
      method: 'GET',
      path: '/products',
      options: {
        ...options,
        params,
      },
    })
  }

  getById = async (
    params: {
      id: string
      venueId: string
    },
    options?: RequestOptions
  ): Promise<Product> => {
    return request<Product>({
      method: 'GET',
      path: `/products/${params.id}`,
      options: {
        ...options,
        params: {
          ...params,
          group: true,
        },
      },
    })
  }
}

const productService = new ProductService()

export default productService
