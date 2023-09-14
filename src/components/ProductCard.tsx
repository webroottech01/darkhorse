import { Link } from '@tanstack/react-router'
import React from 'react'
import styled from 'styled-components'

import { Product } from 'src/types'
import Typography from './Typography'
import { imageUrl } from 'src/sdk'

const Card = styled(Link)`
  border: 1px solid var(--gray-light, #e2e6ed);
  background: var(--white, #fff);
  box-shadow: 0px 4px 0px 0px rgba(168, 175, 187, 0.3);
  cursor: pointer;
  width: 100%;
  margin: 0px auto;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
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
        <ProductImage
          src={imageUrl(product.image, {
            height: '186px',
          })}
          alt={product.name}
        />
      ) : null}
      {!!product.brand?.name && (
        <Typography variant="h3">{product.brand.name}</Typography>
      )}
      <Typography variant="body">{product.name}</Typography>
    </Card>
  )
}
