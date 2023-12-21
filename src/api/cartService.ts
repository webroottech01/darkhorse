import { request } from 'src/apiClient'
import { CartCreateArgs, OrderCart } from 'src/types'

export const createCart = async (
  data: Omit<CartCreateArgs, 'sessionId'>
): Promise<OrderCart> => {
  return request<OrderCart>({
    type: 'POST',
    path: '/carts',
    body: data,
  })
}
