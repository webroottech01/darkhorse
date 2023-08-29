import React from 'react'
import { Product } from 'src/types'

export default function ProductCart({ product }: { product: Product }) {
  return <div>{product.name}</div>
}
