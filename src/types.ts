/* --- Venue --- */
export type Venue = {}

/* --- Product --- */
export type Product = {
  id: string
  name: string
  price: number
  image?: string
  description?: string
  brand?: {
    name?: string
  }
  type: ProductType
  cannabisType?: CannabisType
}

export enum ProductType {
  FLOWER = 'FLOWER',
  PRE_ROLLS = 'PRE_ROLLS',
  VAPORIZERS = 'VAPORIZERS',
  CONCENTRATES = 'CONCENTRATES',
  EDIBLES = 'EDIBLES',
  TINCTURES = 'TINCTURES',
  TOPICALS = 'TOPICALS',
  ACCESSORIES = 'ACCESSORIES',
  BEVERAGES = 'BEVERAGES',
  MERCHANDISE = 'MERCHANDISE',
}

export enum CannabisType {
  INDICA = 'INDICA',
  SATIVA = 'SATIVA',
  HYBRID = 'HYBRID',
  HYBRID_SATIVA = 'HYBRID_SATIVA',
  HYBRID_INDICA = 'HYBRID_INDICA',
  CBD = 'CBD',
  NA = 'NA',
}

export enum CannabisTypeName {
  INDICA = 'Indica',
  HYBRID_INDICA = 'Indica Hybrid',
  SATIVA = 'Sativa',
  HYBRID_SATIVA = 'Sativa Hybrid',
  HYBRID = 'Hybrid',
  CBD = 'CBD',
  NA = 'N/A',
}

/* --- Pricing/Discounts/Fees --- */
export enum DiscountType {
  PERCENT = 'PERCENT',
  FLAT = 'FLAT',
}

export type Discount = {
  name: string
  value: number
  amount: number
  type: DiscountType
  appliesTo: 'CART' | 'ITEM'
}

export enum FeeType {
  PERCENT = 'PERCENT',
  FLAT = 'FLAT',
}

export type Fee = {
  name: string
  value: number
  amount: number
  type: FeeType
}

/* --- User --- */

export type User = {
  id: string
  name: string
  firstName: string
  lastName: string
}

/* --- Cart + Order --- */

export type CartCreateArgs = {
  venueId: string
  items: {
    productId: string
    quantity: number
    purchaseWeight?: number
  }[]
  promoCode?: string
  sessionId: string
}

export enum OrderItemStatus {
  SOLD_OUT = 'SOLD_OUT',
  QUANTITY_NOT_AVAILABLE = 'QUANTITY_NOT_AVAILABLE',
  QUANTITY_OVER_PURCHASE_MAX = 'QUANTITY_OVER_PURCHASE_MAX',
  QUANTITY_UNDER_PURCHASE_MINX = 'QUANTITY_UNDER_PURCHASE_MINX',
}

export type CartItem = {
  id: string
  product: Product
  slug: string
  image: string
  name: string
  brand: string
  price: number
  priceWithDiscounts: number
  type: ProductType
  description: string
  size: string
  quantity: number
  purchaseWeight?: number
  weight?: number
  weightUnit: string
  weightFormatted: string
  discountValue?: number
  discountType: DiscountType
  discountAmount?: number
  discountTotal?: number
  quantityIntended: number
  status: OrderItemStatus
}

export type OrderCart = {
  id: string
  created: string
  items: CartItem[]
  date: string
  discountTotal?: number
  discounts?: Discount[]
  feeTotal?: number
  fees?: Fee[]
  organization: string
  venue: string
  subtotal: number
  subtotalWithoutDiscounts: number
  tax?: number
  taxPercent?: number
  total: number
}
