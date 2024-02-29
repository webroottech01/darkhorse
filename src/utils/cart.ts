import { CartItemWithProduct, CartItemStatus } from '@/types/cart'

export const hasSoldOutItems = (items: CartItemWithProduct[]) => {
  return !!(items ?? []).find((item) => item.status === CartItemStatus.SOLD_OUT)
}
