'use client'

import React from 'react'
import styled, { css } from 'styled-components'

import { Product, ProductDefaultImage } from '@/types/product'
import BrandImage from './BrandImage'
import { imageUrl } from '@/utils/image'

const Wrapper = styled.img`
  border-radius: 4px;
  border: 1px solid var(--gray-light);
  margin-right: 15px;
`

export default function ProductImage({ product }: { product: Product }) {
  const isDefaultImage = (product.image ?? '').startsWith(ProductDefaultImage)
  const [status, setStatus] = React.useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [imageSrc, setImageSrc] = React.useState(product.image)

  return (!product.image || isDefaultImage) &&
    product.brand &&
    product.brand.logo ? (
    <div
      css={css`
        border-radius: 4px;
        border: 1px solid var(--gray-light);
        margin-right: 15px;
        height: 78px;
        width: 78px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: var(--white);

        img {
          box-shadow: none;
        }
      `}
    >
      <BrandImage
        height={70}
        width={70}
        image={product.brand.logo}
        alt={product.brand.name ?? 'brand logo'}
      />
    </div>
  ) : (
    <Wrapper
      height="78px"
      width="78px"
      src={imageUrl(imageSrc ?? '', {
        height: 78,
        width: 78,
      })}
      onError={() => {
        setStatus('error')

        setImageSrc(ProductDefaultImage)
      }}
      onLoadStart={() => setStatus('loading')}
      onLoad={() => {
        setStatus('success')
      }}
    />
  )
}
