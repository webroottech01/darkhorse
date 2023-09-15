import { useParams } from '@tanstack/react-router'
import React from 'react'
import Button from 'src/components/Button'
import Container from 'src/components/Container'
import Typography from 'src/components/Typography'
// import useCheckout from 'src/hooks/useCheckout'
import { css } from 'styled-components'

import useProduct from 'src/hooks/useProduct'
import useVenueId from 'src/hooks/useVenueId'
import { addProduct } from 'src/utils/cartUtils'
import { imageUrl } from 'src/sdk'

export default function ProductPage() {
  const venueId = useVenueId()
  const params = useParams()

  const q_product = useProduct({
    params: {
      productId: params.productId!,
    },
  })

  return (
    <Container>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          gap: 60px;
        `}
      >
        <div
          css={css`
            border-radius: 60px;
            height: 600px;

            img {
              border-radius: 60px;
              border: 1px solid var(--gray-light);
              height: 600px;
            }
          `}
        >
          {q_product.data?.image ? (
            <img
              src={imageUrl(q_product.data?.image, {
                height: '600px',
              })}
            />
          ) : null}
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 10px;
          `}
        >
          <Typography variant="body-sm" style={{ margin: 0 }}>
            {q_product.data?.brand?.name}
          </Typography>
          <Typography variant="h1" style={{ margin: 0 }}>
            {q_product.data?.name}
          </Typography>
          <Typography
            variant="body"
            dangerouslySetInnerHTML={{
              __html: q_product.data?.description ?? '',
            }}
          ></Typography>
          <div>
            <Button
              variant="primary"
              onClick={async (e) => {
                e.preventDefault()

                await addProduct({
                  venueId,
                  productId: q_product.data?.id!,
                  quantity: 1,
                })
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}
