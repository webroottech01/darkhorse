import React from 'react'

import useProducts from 'src/hooks/useProducts'
import { ProductsGlider } from './ProductsGlider'
import useVenueId from 'src/hooks/useVenueId'
import Container from './Container'

export default function ProductList() {
  const venueId = useVenueId()

  const q_listProducts = useProducts({
    params: {
      venueId,
      featured: true,
    },
  })

  return (
    <Container>
      <ProductsGlider
        loading={q_listProducts.isFetching}
        products={q_listProducts?.data?.data}
      />
    </Container>
  )
}
