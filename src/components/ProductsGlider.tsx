import React from 'react'
import styled from 'styled-components'

import { Product } from 'src/types'
import useVenueId from 'src/hooks/useVenueId'
import { Link } from '@tanstack/react-router'
import ProductCard from './ProductCard'
import Glider from './Glider'

type ProductsGliderProps = {
  loading: boolean
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
  const venueId = useVenueId()

  return (
    <Glider
      hasArrows
      skipTrack
      responsive={gliderResponsiveStyles}
      style={{ margin: '0 -15px' }}
    >
      <GliderTrack style={{ padding: '0 10px' }}>
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
  )
}
