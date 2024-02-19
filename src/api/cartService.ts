import cookie from 'js-cookie'

import { CartCreateData, Cart } from '@/types/cart'
import { RequestOptions, request } from './dispenseApiClient'
import { QueryClientKey, queryClientUtils } from '@/utils/queryClient'

const CART_ITEMS_KEY = 'highscore_cart_items'

class CartService {
  /**
   * will throw an error, so users should wrap in a try/catch
   */
  // async addProduct(
  //   { venueId, productId, quantity, purchaseWeight, priceTierData, cart }: AddToCartData,
  //   options: RequestOptions
  // ): Promise<Cart | null> {
  //   //   const cart = getCartFromStore()

  //   const items = cart?.items ?? []

  //   //PRICE_TIER (aka Price Breaks) are products that have a price that changes based on the quantity purchased
  //   //we need to calculate the quantity based on the weight of the product
  //   //we divide the purchaseWeight (how much the user wants to purchase) by the weight of the price tier product to get the quantity
  //   //ex use wants to buy 7g of Flower:
  //   //purchaseWeight = 7
  //   //weight = 3.5g - this is the product's weight field
  //   //quantity = 7 / 3.5 = 2 = user wants to buy 2 of the 3.5g price tier product
  //   if (
  //     priceTierData &&
  //     priceTierData.priceType === ProductPriceType.PRICE_TIER &&
  //     ![ProductType.ACCESSORIES, ProductType.MERCHANDISE].includes(priceTierData.type)
  //   ) {
  //     const weight =
  //       (purchaseWeight ?? 0) /
  //       (priceTierData.weight && priceTierData.weight > 0 ? priceTierData.weight : 1)
  //     quantity = weight * quantity
  //   }

  //   quantity = quantity || 1

  //   const result = await this.createCart(
  //     {
  //       venue: venueId,
  //       items: [
  //         ...items.map((i) => {
  //           return {
  //             quantity: i.quantity,
  //             productId: i.productId,
  //             purchaseWeight: i.purchaseWeight ?? undefined,
  //           }
  //         }),
  //         {
  //           productId: productId,
  //           quantity,
  //           purchaseWeight: priceTierData ? undefined : purchaseWeight,
  //         },
  //       ],
  //     },
  //     options
  //   )

  //   return result
  // }

  async create(
    data: CartCreateData,
    options?: RequestOptions
  ): Promise<Cart | null> {
    return request<Cart>({
      method: 'POST',
      path: `/venues/${data.venueId}/carts`,
      options: {
        ...options,
        body: {
          ...data,
          items: data.items ?? [],
        },
      },
    })
  }

  async getById(id: string, options?: RequestOptions): Promise<Cart | null> {
    return request<Cart>({
      method: 'GET',
      path: `/carts/${id}`,
      options,
    })
  }

  //   async addProduct({
  //     venueId,
  //     productId,
  //     quantity,
  //     purchaseWeight,
  //     priceTierData,
  //     cart,
  //   }: AddToCartProps) {}

  async getOrCreate(venueId: string): Promise<Cart | null> {
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
        } as unknown as Cart
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
}

function getCartFromStore() {
  const queryClient = queryClientUtils.getQueryClient()

  return queryClient.getQueryData<Cart>(QueryClientKey.CART)
}

export default new CartService()
