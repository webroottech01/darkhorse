import styled from 'styled-components'
import React from 'react'

import ProductCard from 'src/components/ProductCard'
import useProducts from 'src/hooks/useProducts'
import Container from 'src/components/Container'

const storeId = '7ec840a066d21812'

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 22px;
`

export default function ShopPage() {
  const q_products = useProducts({
    params: {
      storeId,
    },
  })

  console.log('PRODUCTS', q_products)

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
