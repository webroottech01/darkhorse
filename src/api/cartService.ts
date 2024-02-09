import { CartCreateArgs, OrderCart } from '@/types'
import { request } from './apiClient'

export const createCart = async (
  data: Omit<CartCreateArgs, 'sessionId'>
): Promise<OrderCart> => {
  return request<OrderCart>({
    type: 'POST',
    path: '/carts',
    body: data,
  })
}
