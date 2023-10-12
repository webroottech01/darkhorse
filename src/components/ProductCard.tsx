import { Link } from '@tanstack/react-router'
import React from 'react'
import styled, { css } from 'styled-components'

import { CannabisType, Product } from 'src/types'
import Typography from './Typography'
import { imageUrl } from 'src/sdk'
import Tag from './Tag'
import Skeleton from './Skeleton'
import Image from './Image'
import CardImage from './CardImage'
import { MediaQuery } from 'src/utils/mediaQueries'

const Card = styled(Link)`
  border: 1px solid var(--gray-light, #e2e6ed);
  background: var(--white, #fff);
  box-shadow: 0px 4px 0px 0px rgba(168, 175, 187, 0.3);
  cursor: pointer;
  width: 100%;
  margin: 0px auto;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
`

const ProductImage = styled(Image)`
  width: 100%;
  height: 186px;
  object-fit: contain;
  margin-bottom: 44px;
  mix-blend-mode: darken;
`

export default function ProductCard({
  product,
  variant,
}: {
  product?: Product
  variant?: 'default' | 'loading'
}) {
  return (
    <Card
      to={'/products/$productId'}
      search={{}}
      //@ts-ignore
      params={{
        productId: product?.slug,
      }}
    >
      {variant === 'loading' || !product ? (
        <>
          <Skeleton style={{ height: '186px', width: '80%' }} />
          <Skeleton style={{ height: '26px', width: '60px' }} />
          <Skeleton style={{ height: '24px', width: '64px' }} />
          <Skeleton style={{ height: '25px', width: '85px' }} />
        </>
      ) : (
        <>
          {product.image ? (
            <CardImage
              src={imageUrl(product.image, {
                height: '186px',
              })}
              alt={product.name}
              css={css`
                margin-bottom: 'auto';
                justify-content: 'center';
                height: 160px;
                width: 100%;

                @media (max-width: ${MediaQuery.screenMd}) {
                  height: auto;
                }

                img {
                  height: 160px;
                  max-width: 100%;
                  margin: 0 auto;

                  @media (max-width: ${MediaQuery.screenMd}) {
                    height: auto;
                  }
                }
              `}
              height={160}
            />
          ) : null}
          {!!product.cannabisType &&
            product.cannabisType !== CannabisType.NA && (
              <Tag cannabisType={product.cannabisType}></Tag>
            )}
          {!!product.brand?.name && (
            <Typography variant="h3">{product.brand.name}</Typography>
          )}
          <Typography variant="body">{product.name}</Typography>
        </>
      )}
    </Card>
  )
}
