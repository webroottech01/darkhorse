import { ProductType } from './product'

export enum TaxThcTypes {
  THC = 'THC9',
  THC_A = 'THCa',
  THC9_THCa = 'THC9_THCa',
}

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
  productOffer?: string
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

export type Tax = {
  name: string
  amount: number
  value?: number | null
  taxable?: boolean | null
  grossTax?: boolean | null
  productTypes?: ProductType[] | null
  productThc?: {
    type: TaxThcTypes
    units: string
    min?: number | null
    max?: number | null
  }
}

export type PricingBreakdown = {
  subtotal: number
  subtotalWithoutDiscounts: number
  tax: number
  totalTax: number
  taxPercent: number
  taxes?: Tax[] | null
  fees?: Fee[] | null
  feeTotal?: number | null
  total: number
  discounts?: Discount[] | null
  discountTotal?: number | null
}
