import styled from 'styled-components'
import React from 'react'

import ProductCard from 'src/components/ProductCard'
import useProducts from 'src/hooks/useProducts'
import Container from 'src/components/Container'
import useVenueId from 'src/hooks/useVenueId'

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 22px;
`

export default function ShopPage() {
  const venueId = useVenueId()
  const q_products = useProducts({
    params: {
      venueId,
    },
  })

  return (
    <Container>
      <ProductsList>
        {q_products.data?.data.map((p) => {
          return <ProductCard key={p.id} product={p} />
        })}
      </ProductsList>
    </Container>
  )
}
