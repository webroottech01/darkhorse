export type Venue = {}

export type Product = {
  id: string
  name: string
  price: number
  image?: string
  description?: string
  brand?: {
    name?: string
  }
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

export enum DiscountType {
  PERCENT = 'PERCENT',
  FLAT = 'FLAT',
}

export type User = {
  id: string
  name: string
  firstName: string
  lastName: string
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
  items: CartItem[]
}
