import { Link } from '@tanstack/react-router'
import React from 'react'
import styled from 'styled-components'

import { Product } from 'src/types'

const Card = styled(Link)`
  background-color: rgba(248, 245, 240, 0.4);
  border: 1px solid rgba(160, 153, 142, 0.4);
  cursor: pointer;
  width: 100%;
  margin: 0px auto;
  padding: 25px;
`

const ProductImage = styled.img`
  width: 100%;
  height: 186px;
  object-fit: contain;
  margin-bottom: 44px;
  mix-blend-mode: darken;
`

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      to={'/products/$productId'}
      search={{}}
      //@ts-ignore
      params={{
        productId: product.id,
      }}
    >
      {product.image ? (
        <ProductImage src={product.image} alt={product.name} />
      ) : null}
      {product.name}
    </Card>
  )
}
