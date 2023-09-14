import { request } from 'src/apiClient'
import { OrderCart } from 'src/types'

export const getCartById = async (id: string) => {
  return request<OrderCart>({
    path: `/carts/${id}`,
    params: {},
  })
}
