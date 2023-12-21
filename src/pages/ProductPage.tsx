import { useParams } from '@tanstack/react-router'
import React from 'react'
import Button from 'src/components/Button'
import Container from 'src/components/Container'
import Typography from 'src/components/Typography'
// import useCheckout from 'src/hooks/useCheckout'
import styled, { css } from 'styled-components'

import useProduct from 'src/hooks/useProduct'
import useVenueId from 'src/hooks/useVenueId'
import { addProduct } from 'src/utils/cartUtils'
import { imageUrl } from 'src/sdk'
import Skeleton from 'src/components/Skeleton'
import Image from 'src/components/Image'
import { MediaQuery } from 'src/utils/mediaQueries'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;
  justify-content: space-between;
  padding-top: 60px;
`

const LeftCol = styled.div`
  width: 58.3333%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 60px;
    border: 1px solid var(--gray-light);
    max-height: 500px;
    min-height: 300px;
    margin: 0 auto;
    max-width: 100%;
  }
`

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 0 0 auto;
  width: 41.6667%;
`

const ImageWrapper = styled.div`
  position: relative;
  max-height: 500px;
  min-height: 300px;
  max-width: 100%;

  img {
    max-width: 100%;
  }

  @media (max-width: ${MediaQuery.screenSm}) {
    max-height: 100%;
    min-height: 0;
  }
`

export default function ProductPage() {
  const venueId = useVenueId()
  const params = useParams()

  const q_product = useProduct({
    params: {
      venueId,
      productId: params.productId!,
    },
    options: {
      enabled: !!params.productId,
      keepPreviousData: true,
    },
  })

  return (
    <Container>
      <Wrapper>
        <LeftCol>
          <ImageWrapper>
            {q_product.isFetching ||
            !q_product.data ||
            !q_product.data.image ? (
              <Skeleton
                css={css`
                  max-height: 500px;
                  min-height: 500px;
                  width: 500px;
                  margin: 0 auto;
                  border-radius: 10px;
                `}
              />
            ) : (
              <div
                css={css`
                  margin: 0 auto;
                  text-align: center;
                  border-radius: 10px;
                `}
              >
                <Image
                  src={imageUrl(q_product.data?.image, {
                    height: '600px',
                  })}
                  css={css`
                    border-radius: 10px;
                    margin: 0 auto;
                    width: 100%;

                    img {
                      display: inline-block;
                      max-height: 500px;
                      min-height: 300px;
                      border-radius: 10px;
                    }
                  `}
                />
              </div>
            )}
          </ImageWrapper>
        </LeftCol>
        <RightCol>
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
          />
          {q_product.isFetching || !q_product.data ? (
            <div>
              <Skeleton style={{ height: '30px', width: '80%' }} />
            </div>
          ) : (
            <div>
              <Button
                variant="primary"
                onClick={async (e) => {
                  e.preventDefault()

                  await addProduct({
                    venueId,
                    productId: q_product.data.id,
                    quantity: 1,
                  })
                }}
              >
                Add to Cart
              </Button>
            </div>
          )}
        </RightCol>
      </Wrapper>
    </Container>
  )
}
