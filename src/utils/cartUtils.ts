import cookie, { CookieAttributes } from 'js-cookie'
import { QueryClientKey, queryClient } from 'src/queryClient'

import { OrderCart } from 'src/types'
import topBarNotificationUtils from './topBarNotificationUtils'
import { createCart, getCartById } from 'src/api/cartService'

const cookieAttributes: CookieAttributes = {
  sameSite: 'strict',
  secure: false,
  session: false,
}

const CART_ID_KEY = 'highscore-id'

export const getCart = async (): Promise<OrderCart | null> => {
  const cart = getCartFromStore()

  if (cart) return cart

  try {
    const cartId = cookie.get(CART_ID_KEY)

    if (!cartId) {
      return {
        items: [],
      } as unknown as OrderCart
    }

    return getCartById(cartId)
  } catch (error: any) {
    console.log('error creating cart', error)

    return null
  }
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
  const cart = getCartFromStore()

  const items = (cart?.items ?? []).map((i) => {
    return {
      productId: i.product.id,
      quantity: i.quantity,
      purchaseWeight: i.purchaseWeight,
    }
  })

  try {
    const cart = await createCart({
      venueId,
      items: [
        ...items,
        {
          productId,
          quantity,
          purchaseWeight,
        },
      ],
    })

    cookie.set(CART_ID_KEY, cart.id, {
      ...cookieAttributes,
      expires: 7,
    })

    queryClient.setQueryData(QueryClientKey.CART, {
      ...cart,
    })

    return cart
  } catch (error: any) {
    topBarNotificationUtils.show({
      text: error.message,
    })

    return null
  }
}

export const getTotalItemCount = () => {
  const cart = getCartFromStore()

  if (!cart || !cart.items) return 0

  let total = 0

  cart.items.forEach((i) => {
    total += i.quantity
  })

  return total
}

function getCartFromStore() {
  return queryClient.getQueryData<OrderCart>(QueryClientKey.CART)
}
