'use client'

import styled, { css } from 'styled-components'
import Image from 'next/image'

import { MediaQuery } from '@/utils/mediaQueries'
import { imageUrl } from '@/utils/image'
import Button from '../Button'
import Container from '../Container'
import Typography from '../Typography'
import useVenue from '@/hooks/useVenue'
import { Product } from '@/types/product'
import cartService from '@/api/cartService'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;
  justify-content: space-between;
`

const LeftCol = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--border-color);
`

const RightCol = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 0 0 auto;
`

export default function ProductPage({ product }: { product: Product }) {
  const q_venue = useVenue()

  return (
    <Wrapper>
      <LeftCol>
        <div
          css={css`
            margin: 0 auto;
            text-align: center;
            border-radius: 10px;
            position: relative;
            height: 100%;
            width: 100%;
          `}
        >
          <Image
            css={css`
              border-radius: 10px;
              margin: 0 auto;
              width: 100%;

              display: inline-block;
              max-height: 600px;
              min-height: 500px;
              position: relative !important;
              height: auto !important;
              width: auto !important;

              @media (max-width: ${MediaQuery.screenSm}) {
                max-height: auto;
              }
            `}
            alt={`${product.name} image at ${q_venue?.data?.name}`}
            src={product.image ?? ''}
            fill
            priority
          />
        </div>
      </LeftCol>
      <RightCol>
        <Typography variant="body-sm" style={{ margin: 0 }}>
          {product.brand?.name}
        </Typography>
        <Typography variant="h1" style={{ margin: 0 }}>
          {product.name}
        </Typography>
        <Typography
          variant="body"
          dangerouslySetInnerHTML={{
            __html: product.description ?? '',
          }}
        />
        <div>
          <Button
            variant="primary"
            onClick={async (e) => {
              e.preventDefault()

              await cartService.addProduct({
                venueId: q_venue?.data?.id!,
                productId: product.id,
                quantity: 1,
              })
            }}
          >
            Add to Cart
          </Button>
        </div>
      </RightCol>
    </Wrapper>
  )
}
