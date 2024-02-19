import { Cart, AddToCartProps } from '@dispense/dispense-js'
import cookie from 'js-cookie'

import { QueryClientKey, queryClientUtils } from './queryClient'
import dispense from './dispense'

const CART_ITEMS_KEY = 'highscore_cart_items'

export const addProduct = async ({
  venueId,
  productId,
  quantity,
  purchaseWeight,
  priceTierData,
  cart,
}: AddToCartProps) => {}

export const getOrCreateCart = async (
  venueId: string
): Promise<Cart | null> => {
  if (!venueId) throw new Error('venueId is required')

  const cart = getCartFromStore()

  if (cart) {
    return cart
  }

  try {
    const cartItems = JSON.parse(cookie.get(CART_ITEMS_KEY) ?? '[]' ?? []) as {
      productId: string
      quantity: number
      purchaseWeight?: number
      venueId?: string
    }[]

    if (!cartItems || !cartItems.length) {
      return {
        items: [],
      } as unknown as Cart
    }

    return dispense.createCart({
      venueId,
      items: cartItems,
      //   promoCode: getPromoCode(),
    })
  } catch (error: any) {
    console.log('error creating cart', error)

    return null
  }
}

function getCartFromStore() {
  const queryClient = queryClientUtils.getQueryClient()

  return queryClient.getQueryData<Cart>(QueryClientKey.CART)
}
