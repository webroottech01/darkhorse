'use client'

import { ProductsGlider } from '@/components/ProductsGlider'
import Hero from '../Hero'
import { Product } from '@/types'

export default function HomePage({ products }: { products: Product[] }) {
  return (
    <main>
      <Hero />
      <ProductsGlider products={products} />
    </main>
  )
}
