'use client'

import React from 'react'
import styled, { css } from 'styled-components'

import Typography from './Typography'
import Tag from './Tag'
import Skeleton from './Skeleton'
import CardImage from './CardImage'
import { Product, CannabisType } from '@dispense/dispense-js'
import { imageUrl } from '@/utils/image'
import { MediaQuery } from '@/utils/mediaQueries'

console.log('CannabisType', CannabisType)

const Card = styled.div`
  border: 1px solid var(--gray-light, #e2e6ed);
  background: var(--white, #fff);
  box-shadow: 0px 4px 0px 0px rgba(168, 175, 187, 0.3);
  cursor: pointer;
  width: 100%;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export default function ProductCard({
  product,
  variant,
}: {
  product?: Product
  variant?: 'default' | 'loading'
}) {
  return (
    <div
      css={css`
        padding: 15px 7.5px 20px;
        height: 100%;
      `}
    >
      <Card>
        {variant === 'loading' || !product ? (
          <>
            <Skeleton as="span" style={{ height: '186px', width: '80%' }} />
            <Skeleton as="span" style={{ height: '26px', width: '60px' }} />
            <Skeleton as="span" style={{ height: '24px', width: '64px' }} />
            <Skeleton as="span" style={{ height: '25px', width: '85px' }} />
          </>
        ) : (
          <>
            {product.image ? (
              <CardImage
                src={imageUrl(product.image, {
                  height: '186px',
                })}
                height={186}
                width={186}
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
              />
            ) : null}
            <div
              css={css`
                display: flex;
                flex-direction: column;
                gap: 10px;
                align-items: center;
                justify-content: center;
                text-align: center;
              `}
            >
              {!!product.cannabisType &&
                product.cannabisType !== CannabisType.NA && (
                  <Tag cannabisType={product.cannabisType}></Tag>
                )}
              {!!product.brand?.name && (
                <Typography variant="body-sm">{product.brand.name}</Typography>
              )}
              <Typography as="span" variant="body">
                {product.name}
              </Typography>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
