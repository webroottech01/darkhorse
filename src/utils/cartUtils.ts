import cookie, { CookieAttributes } from 'js-cookie'
import { request } from 'src/apiClient'
import { queryClient } from 'src/queryClient'

import { OrderCart } from 'src/types'

const cookieAttributes: CookieAttributes = {
  sameSite: 'strict',
  secure: false,
}

const COOKIE = 'leaf-lore-cart-id'

export const getFromStoredByVenueId = async (
  venueId: string,
  options?: {
    firstName?: string
    lastName?: string
    phone?: string
    email?: string
  }
): Promise<OrderCart | null> => {
  if (!venueId) throw new Error('venueId is required')

  const cartId = cookie.get(COOKIE)

  if (!cartId) return null

  const cart = queryClient.getQueryData<OrderCart>(['cart'])

  if (cart) return cart

  const _cart = await request<OrderCart>({
    path: `/carts/${cartId}`,
    params: {},
  })

  queryClient.setQueryData(['cart'], _cart)

  return _cart
}
