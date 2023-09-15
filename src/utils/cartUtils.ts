import cookie, { CookieAttributes } from 'js-cookie'
import { QueryClientKey, queryClient } from 'src/queryClient'

import { OrderCart } from 'src/types'
import topBarNotificationUtils from './topBarNotificationUtils'
import { createCart, getCartById } from 'src/api/cartService'

const cookieAttributes: CookieAttributes = {
  sameSite: 'strict',
  secure: false,
}

const CART_KEY = 'leaf_lore_cart'

export const getFromStoredByVenueId = async (
  venueId: string
): Promise<OrderCart | null> => {
  if (!venueId) throw new Error('venueId is required')

  const cart = getCart()

  if (cart) return cart

  try {
    const cartItems = JSON.parse(cookie.get(CART_KEY) ?? '[]')

    if (!cartItems || !cartItems.length) return null

    const result = await createCart({
      venueId,
      items: cartItems,
    })

    return result
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
  const cart = getCart()

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

    cookie.set(
      CART_KEY,
      JSON.stringify(
        cart.items.map((i) => {
          return {
            productId: i.product.id,
            quantity: i.quantity,
            purchaseWeight: i.purchaseWeight,
          }
        })
      ),
      cookieAttributes
    )

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
  const cart = getCart()

  if (!cart || !cart.items) return 0

  let total = 0

  cart.items.forEach((i) => {
    total += i.quantity
  })

  return total
}

function getCart() {
  return queryClient.getQueryData<OrderCart>(QueryClientKey.CART)
}
