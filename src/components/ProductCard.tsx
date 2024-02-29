'use client'

import React from 'react'
import styled, { css } from 'styled-components'
import Image from 'next/image'

import Typography from './Typography'
import Tag from './Tag'
import Skeleton from './Skeleton'
import { MediaQuery } from '@/utils/mediaQueries'
import { Product, CannabisType } from '@/types/product'

const Card = styled.div`
  border: 1px solid var(--border-color);
  background: var(--white);
  border-radius: 20px;
  box-shadow: 0px 4px 0px 0px rgba(168, 175, 187, 0.3);
  cursor: pointer;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
`

const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex: 1;
  min-height: 300px;

  @media (max-width: ${MediaQuery.screenSm}) {
    min-height: 200px;
  }
`

const CardBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  justify-content: left;
  text-align: left;
  border-top: 1px solid var(--border-color);
  padding: 20px;
`

export default function ProductCard({
  product,
  variant,
  style,
}: {
  product?: Product
  variant?: 'default' | 'loading'
  style?: React.CSSProperties
}) {
  return (
    <Card style={style}>
      {variant === 'loading' || !product ? (
        <>
          <CardTop>
            <Skeleton as="span" style={{ height: '200px', width: '80%' }} />
          </CardTop>
          <CardBottom>
            <Skeleton as="span" style={{ height: '26px', width: '60px' }} />
            <Skeleton as="span" style={{ height: '24px', width: '64px' }} />
            <Skeleton as="span" style={{ height: '25px', width: '85px' }} />
          </CardBottom>
        </>
      ) : (
        <>
          <CardTop>
            {product.image ? (
              <Image
                src={product.image}
                height={300}
                width={300}
                alt={product.name}
                css={css`
                  height: auto;
                  max-height: 300px;
                  max-width: 100%;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  padding: 20px 0 0;
                  margin: 0 auto;

                  @media (max-width: ${MediaQuery.screenSm}) {
                    height: auto;
                    max-height: 200px;
                  }
                `}
              />
            ) : null}
          </CardTop>
          <CardBottom>
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
          </CardBottom>
        </>
      )}
    </Card>
  )
}
