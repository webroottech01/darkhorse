'use client'

import Link from 'next/link'
import React from 'react'
import { css } from 'styled-components'

import ProductCard from './ProductCard'
import { MediaQuery } from '@/utils/mediaQueries'
import { Product } from '@/types/product'
import { getProductHref } from '@/utils/product'

export function ProductsList({
  loading,
  products,
}: {
  loading?: boolean
  products?: Product[]
}) {
  return (
    <div className='productlistmain'
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 40px;

        @media (max-width: ${MediaQuery.screenMd}) {
          grid-template-columns: 1fr 1fr 1fr;
          gap: 15px;
        }
        @media (max-width: ${MediaQuery.screenSm}) {
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
      `}
    >
      {loading ? (
        <>
          <ProductCard variant="loading" />
          <ProductCard variant="loading" />
          <ProductCard variant="loading" />
          <ProductCard variant="loading" />
          <ProductCard variant="loading" />
          <ProductCard variant="loading" />
        </>
      ) : (
        products?.map((product) => (
          <Link
            key={product.id}
            style={{ height: '100%' }}
            href={getProductHref(product)}
          >
            <ProductCard product={product} />
          </Link>
        ))
      )}
    </div>
  )
}
