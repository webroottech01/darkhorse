import { OrderPickUpType, OrderType } from './order'
import { ProductType, ProductPriceType } from './product'

export type Cart = {
  id: string
  date?: Date
  venue: string
  organization: string
  user?: string | null
  promoCode?: string | null
  items?: CartItem[]
  disableNotifications?: boolean
  // sessionId?: string
  pickUpType?: OrderPickUpType
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  administrativeArea?: string
  type?: OrderType
  rewardId?: string | null
}

export type CartCreateData = Omit<Cart, 'id' | 'organization' | 'venue' | 'user' | 'prospect'> & {
  venueId: string
  userId?: string
  prospectId?: string
  cartId?: string
}

export type CartItem = {
  productId: string
  quantity: number
  /**
   * @description Only use with WEIGHT_TIER products. This is the weight of the product in grams.
   */
  purchaseWeight?: number
}

export enum CartItemStatus {
  SOLD_OUT = 'SOLD_OUT',
  QUANTITY_NOT_AVAILABLE = 'QUANTITY_NOT_AVAILABLE',
  QUANTITY_OVER_PURCHASE_MAX = 'QUANTITY_OVER_PURCHASE_MAX',
  QUANTITY_UNDER_PURCHASE_MINX = 'QUANTITY_UNDER_PURCHASE_MINX',
}

export type AddToCartData = {
  venueId: string
  productId: string
  quantity: number
  purchaseWeight?: number
  priceTierData?: {
    weight?: number
    type: ProductType
    priceType: ProductPriceType.PRICE_TIER
  }
}
