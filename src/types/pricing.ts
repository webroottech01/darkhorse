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
