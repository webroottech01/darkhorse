import cookie, { CookieAttributes } from 'js-cookie'
import { request } from 'src/apiClient'
import { QueryClientKey, queryClient } from 'src/queryClient'

import { CartItem, OrderCart } from 'src/types'
import topBarNotificationUtils from './topBarNotificationUtils'

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

  const cart = getStoredCart()

  if (cart) return cart

  const _cart = await request<OrderCart>({
    path: `/carts/${cartId}`,
    params: {},
  })

  queryClient.setQueryData(QueryClientKey.CART, _cart)

  return _cart
}

export const addProduct = async ({
  venueId,
  productId,
  quantity,
  purchaseWeight,
}: {
  venueId: string
  productId: string
  quantity: number
  purchaseWeight?: number
}) => {
  const cart = getStoredCart()

  const items = cart?.items ?? []

  try {
    const result = await createByVenueId(venueId, {
      items: items.map((i) => {
        return {
          ...i,
          productId: i.product.id,
        }
      }),
      newItems: [
        {
          productId,
          quantity,
          purchaseWeight,
        },
      ],
    })

    return result
  } catch (error: any) {
    topBarNotificationUtils.show({
      text: error.message,
    })

    return null
  }
}

type CartItemCreate = {
  productId: string
  quantity: number
  purchaseWeight?: number
}

export const createByVenueId = async (
  venueId: string,
  options: {
    items: CartItemCreate[]
    newItems?: CartItemCreate[]
    disableNotifications?: boolean
    sessionId?: string
    promoCode?: string | null
    firstName?: string
    lastName?: string
    phone?: string
    email?: string
  }
): Promise<OrderCart | null> => {
  if (!venueId) throw new Error('venueId is required')
  if (!options) throw new Error('options is required')
  if (!options.items) throw new Error('options.items.length')

  options.sessionId = Math.random().toString(36).substring(2, 15)

  // if (options.newItems) validateItems(options.newItems)

  // const previousCart = getStoredCart()

  // const items = getItems(options)

  // if (options.promoCode === undefined && previousCart?.promoCode) {
  //   const previousPromoCode = getPreviousPromoCode(previousCart)

  //   if (previousPromoCode) options.promoCode = previousPromoCode
  // }

  // if (!items.length) {
  //   clearCart()

  //   return null
  // }

  options.items = [...(options.items ?? []), ...(options.newItems ?? [])]
  delete options.newItems

  const cartData = {
    ...options,
    date: new Date().toISOString(),
  }

  try {
    const newCart = await request<OrderCart>({
      type: 'POST',
      path: `/venues/${venueId}/carts`,
      body: cartData,
    })

    console.log('newCart', newCart)

    cookie.set(COOKIE, newCart.id, cookieAttributes)

    // return _saveNewCart(newCart, {
    //   disableNotifications: options.disableNotifications,
    // })

    queryClient.setQueryData(QueryClientKey.CART, newCart)

    return newCart
  } catch (error: any) {
    throw error
  }
}

function getStoredCart() {
  return queryClient.getQueryData<OrderCart>(QueryClientKey.CART)
}
