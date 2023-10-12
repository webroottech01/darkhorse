import { request } from 'src/apiClient'
import { CartCreateArgs, OrderCart } from 'src/types'

export const getCartById = async (id: string) => {
  return request<OrderCart>({
    path: `/carts/${id}`,
    params: {},
  })
}

export const createCart = async (
  data: Omit<CartCreateArgs, 'sessionId'>
): Promise<OrderCart> => {
  return request<OrderCart>({
    type: 'POST',
    path: `/venues/${data.venueId}/carts`,
    body: data,
  })
}
