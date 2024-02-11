'use client'

import Link from 'next/link'
import React from 'react'
import styled, { css } from 'styled-components'

import { Product } from '@/types'
import Glider from './Glider'
import ProductCard from './ProductCard'
import Container from './Container'
import useVenue from '@/hooks/useVenue'

type ProductsGliderProps = {
  loading?: boolean
  products?: Product[]
}

const gliderResponsiveStyles = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 4,
    },
  },
  {
    breakpoint: 700,
    settings: {
      slidesToShow: 3,
      slidesToScroll: 3,
    },
  },
  {
    breakpoint: 500,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
  {
    breakpoint: 0,
    settings: {
      exactWidth: true,
      itemWidth: 245,
      slidesToShow: 2,
      slidesToScroll: 2,
    },
  },
]

const GliderTrack = styled.div`
  > div {
    display: flex;
    flex-direction: row;
  }

  .center {
    text-align: left;
  }
`

export function ProductsGlider({ loading, products }: ProductsGliderProps) {
  const currentVenue = useVenue()

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
          // display: flex;
          // flex-direction: row;
          // overflow-x: hidden;

          // .track:not(:global(.glider-track)) {
          //   display: flex;
          //   flex-direction: row;
          //   overflow-x: hidden;
          // }

          // .glider-slide {
          //   flex: 0 0 calc(100% - 2rem);
          // }
        `}
      >
        <Glider
          hasArrows
          skipTrack
          responsive={gliderResponsiveStyles}
          style={{ margin: '0 -15px' }}
        >
          <GliderTrack>
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
          </GliderTrack>
        </Glider>
      </div>
    </Container>
  )
}
