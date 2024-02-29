import { OrderPickUpType, OrderType } from './order'
import { Discount } from './pricing'
import { ProductType, ProductPriceType, Product } from './product'

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
  discounts?: Discount[]
  subtotalWithoutDiscounts?: number
  subtotal?: number
  checkoutUrl: string
}

export type CartWithItemProducts = Omit<Cart, 'items'> & {
  items: (Omit<CartItem, 'product'> & {
    product: Product
  })[]
}

export type CartCreateData = Omit<
  Cart,
  | 'id'
  | 'organization'
  | 'venue'
  | 'user'
  | 'prospect'
  | 'items'
  | 'checkoutUrl'
> & {
  venueId: string
  userId?: string
  prospectId?: string
  cartId?: string
  date?: Date
  pickUpType?: OrderPickUpType
  items?: CartItemCreateData[]
  promoCode?: string | null
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  administrativeArea?: string
  type?: OrderType
  rewardId?: string | null
}

export type CartItem = {
  id: string
  product: Product
  quantity: number
  status?: CartItemStatus
  /**
   * @description Only use with WEIGHT_TIER products. This is the weight of the product in grams.
   */
  purchaseWeight?: number
  name?: string
  price: number
  priceWithDiscounts?: number
  size?: string
  weightFormatted?: string
  discountTotal?: number
}

export type CartItemCreateData = {
  productId: string
  quantity: number
  purchaseWeight?: number
}

export type CartItemWithProduct = Omit<CartItem, 'product'> & {
  product: Product
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
