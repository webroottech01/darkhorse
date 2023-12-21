import cookie, { CookieAttributes } from 'js-cookie'
import { QueryClientKey, queryClient } from 'src/queryClient'

import { OrderCart } from 'src/types'
import topBarNotificationUtils from './topBarNotificationUtils'
import { createCart } from 'src/api/cartService'

const cookieAttributes: CookieAttributes = {
  sameSite: 'strict',
  secure: false,
  session: false,
}

const CART_ITEMS_KEY = 'highscore_cart_items'

export const getCart = async (venueId: string): Promise<OrderCart | null> => {
  if (!venueId) throw new Error('venueId is required')

  const cart = getCartFromStore()

  if (cart) {
    return cart
  }

  try {
    const cartItems = (
      JSON.parse(cookie.get(CART_ITEMS_KEY) ?? '[]' ?? []) as {
        productId: string
        quantity: number
        venueId?: string
      }[]
    ).filter((i) => {
      if (!('venueId' in i)) {
        return true
      }

      return i.venueId === venueId
    })

    if (!cartItems || !cartItems.length) {
      return {
        items: [],
      } as unknown as OrderCart
    }

    console.log('venueId', venueId)
    console.log('cartItems', cartItems)

    return createCart({
      venueId,
      items: cartItems,
    })
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
      productId: i.product,
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

    setCartCookie(
      venueId,
      cart.items.map((i) => {
        return {
          productId: i.product,
          quantity: i.quantity,
          purchaseWeight: i.purchaseWeight,
        }
      })
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

function setCartCookie(
  venueId: string,
  items: {
    productId: string
    quantity: number
    purchaseWeight?: number
  }[]
) {
  items = items.map((i) => {
    return {
      ...i,
      venueId: 'venueId' in i ? i.venueId : venueId,
    }
  })

  cookie.set(CART_ITEMS_KEY, JSON.stringify(items), cookieAttributes)
}
