'use client'

import styled, { css } from 'styled-components'

import { Product } from '@/types'
import { MediaQuery } from '@/utils/mediaQueries'
import { imageUrl } from '@/utils/imageUtils'
import Button from '../Button'
import Container from '../Container'
import Image from '../Image'
import Typography from '../Typography'
import { useContext } from 'react'
import { AppContext } from '@/app/AppContextProvider'

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
    position: relative !important;
  }

  @media (max-width: ${MediaQuery.screenSm}) {
    max-height: 100%;
    min-height: 0;
  }
`

export default function ProductPage({ product }: { product: Product }) {
  const appContext = useContext(AppContext)

  return (
    <Container>
      <Wrapper>
        <LeftCol>
          <ImageWrapper>
            {/* {q_product.isFetching ||
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
                  src={imageUrl(product.image, {
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
            )} */}

            <div
              css={css`
                margin: 0 auto;
                text-align: center;
                border-radius: 10px;
                width: 100%;
                height: 600px;

                img {
                  //   max-height: 500px;
                  //   min-height: 300px;
                  border-radius: 10px;
                }
              `}
            >
              <Image
                alt={`${product.name} image at ${appContext.currentVenue.name}`}
                src={imageUrl(product.image ?? '', {
                  height: '600px',
                })}
                fill
                loading="lazy"
              />
            </div>
          </ImageWrapper>
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

                alert(
                  JSON.stringify({
                    title: 'Added to cart',
                    description: `${product.name} has been added to your cart`,
                  })
                )

                // await addProduct({
                //   venueId,
                //   productId: q_product.data.id,
                //   quantity: 1,
                // })
              }}
            >
              Add to Cart
            </Button>
          </div>
        </RightCol>
      </Wrapper>
    </Container>
  )
}
