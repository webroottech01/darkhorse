import cookie from 'js-cookie'

import {
  CartCreateData,
  Cart,
  AddToCartData,
  CartWithItemProducts,
} from '@/types/cart'
import { RequestOptions, request } from './dispenseApiClient'
import { QueryClientKey, queryClientUtils } from '@/utils/queryClient'
import { ProductPriceType, ProductType } from '@/types/product'
import venueService from './venueService'

const CART_ITEMS_KEY = 'highscore_cart_items'

class CartService {
  async addProduct(
    {
      venueId,
      productId,
      quantity,
      purchaseWeight,
      priceTierData,
    }: AddToCartData,
    options?: RequestOptions
  ): Promise<CartWithItemProducts | null> {
    const cart = getCartFromStore()

    const items = cart?.items ?? []

    //PRICE_TIER (aka Price Breaks) are products that have a price that changes based on the quantity purchased
    //we need to calculate the quantity based on the weight of the product
    //we divide the purchaseWeight (how much the user wants to purchase) by the weight of the price tier product to get the quantity
    //ex use wants to buy 7g of Flower:
    //purchaseWeight = 7
    //weight = 3.5g - this is the product's weight field
    //quantity = 7 / 3.5 = 2 = user wants to buy 2 of the 3.5g price tier product
    if (
      priceTierData &&
      priceTierData.priceType === ProductPriceType.PRICE_TIER &&
      ![ProductType.ACCESSORIES, ProductType.MERCHANDISE].includes(
        priceTierData.type
      )
    ) {
      const weight =
        (purchaseWeight ?? 0) /
        (priceTierData.weight && priceTierData.weight > 0
          ? priceTierData.weight
          : 1)
      quantity = weight * quantity
    }

    quantity = quantity || 1

    const result = await this.create(
      {
        venueId,
        items: [
          ...(items.map((i) => {
            return {
              quantity: i.quantity,
              productId: i.product.id,
              purchaseWeight: i.purchaseWeight ?? undefined,
            }
          }) ?? []),
          {
            productId: productId,
            quantity,
            purchaseWeight: priceTierData ? undefined : purchaseWeight,
          },
        ],
      },
      options
    )

    return result
  }

  async create(
    data: CartCreateData,
    options?: RequestOptions
  ): Promise<CartWithItemProducts | null> {
    const previousCart = getCartFromStore()
    const venue = venueService.getCurrentVenue()

    if (!data.items?.length) {
      this.clearCart()

      return null
    }

    try {
      const newCart = await request<CartWithItemProducts>({
        method: 'POST',
        path: '/carts',
        options: {
          ...options,
          body: {
            ...data,
            items: data.items ?? [],
          },
        },
      })

      const previousCart = getCartFromStore()

      const queryClient = queryClientUtils.getQueryClient()

      queryClient.setQueryData(QueryClientKey.CART, newCart)

      setCartCookie(
        data.venueId,
        newCart.items?.map((i) => {
          return {
            productId: i.product.id,
            quantity: i.quantity,
            purchaseWeight: i.purchaseWeight ?? undefined,
          }
        }) ?? []
      )

      // if (previousCart) {
      //   diffCarts(newCart, previousCart, venue, {
      //     disableNotifications: options?.disableNotifications,
      //   })
      // }

      return newCart
    } catch (error: any) {
      // if (error.type === AppErrorType.RewardNotFoundError) {
      //   throw new Error('Sorry, the reward you selected is no longer available')
      // }

      throw error
    }
  }

  async getById(
    id: string,
    options?: RequestOptions
  ): Promise<CartWithItemProducts | null> {
    return request<CartWithItemProducts>({
      method: 'GET',
      path: `/carts/${id}`,
      options,
    })
  }

  async getOrCreate(venueId: string): Promise<CartWithItemProducts | null> {
    if (!venueId) throw new Error('venueId is required')

    const cart = getCartFromStore()

    if (cart) {
      return cart
    }

    try {
      const cartItems = JSON.parse(
        cookie.get(CART_ITEMS_KEY) ?? '[]' ?? []
      ) as {
        productId: string
        quantity: number
        purchaseWeight?: number
        venueId?: string
      }[]

      if (!cartItems || !cartItems.length) {
        return {
          items: [],
        } as unknown as CartWithItemProducts
      }

      return this.create({
        venueId,
        items: cartItems,
        //   promoCode: getPromoCode(),
      })
    } catch (error: any) {
      console.log('error creating cart', error)

      return null
    }
  }

  clearCart() {
    removeCartCookie()

    const queryClient = queryClientUtils.getQueryClient()

    queryClient.setQueryData(QueryClientKey.CART, null)
  }

  getTotalItemCount() {
    const cart = getCartFromStore()

    if (!cart || !cart.items) return 0

    return cart.items.reduce((acc, i) => acc + i.quantity, 0)
  }
}

function getCartFromStore() {
  const queryClient = queryClientUtils.getQueryClient()

  return queryClient.getQueryData<CartWithItemProducts>(QueryClientKey.CART)
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

  cookie.set(CART_ITEMS_KEY, JSON.stringify(items), { expires: 7 })
}

function removeCartCookie() {
  cookie.remove(CART_ITEMS_KEY, { expires: 7 })
}

export default new CartService()
