'use client'

import Link from 'next/link'
import React, { useContext } from 'react'
import styled, { css } from 'styled-components'

import { AppContext } from '@/app/AppContextProvider'
import { Product } from '@/types'
import ProductCard from './ProductCard'
import Container from './Container'

export function ProductsList({
  loading,
  products,
}: {
  loading?: boolean
  products?: Product[]
}) {
  const { currentVenue } = useContext(AppContext)

  return (
    <Container
      css={css`
        @media (max-width: 1200px) {
          padding: 0;
        }
      `}
    >
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
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
    </Container>
  )
}
