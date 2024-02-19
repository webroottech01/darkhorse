'use client'

import Link from 'next/link'
import React from 'react'
import { css } from 'styled-components'

import ProductCard from './ProductCard'
import { MediaQuery } from '@/utils/mediaQueries'
import { Product } from '@/types/product'

export function ProductsList({
  loading,
  products,
}: {
  loading?: boolean
  products?: Product[]
}) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 40px;

        @media (max-width: ${MediaQuery.screenMd}) {
          grid-template-columns: 1fr 1fr 1fr;
        }
        @media (max-width: ${MediaQuery.screenSm}) {
          grid-template-columns: 1fr 1fr;
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
            href={`products/${product.slug}`}
            //   to={RouteName.MENU_APP_PRODUCT}
            //   params={{
            //     ...getProductLinkRouteParams(product),
            //   }}
          >
            <ProductCard
              product={product}
              // style={{ height: '100%' }}
              // {...mapProductToProductCardProps(product)}
              // {...{
              //   onChange: (productId, purchaseWeight) =>
              //     addProduct({
              //       venueId: currentVenue.id,
              //       productId,
              //       quantity: 1,
              //       purchaseWeight,
              //     }),
              // }}
            />
          </Link>
        ))
      )}
    </div>
  )
}
