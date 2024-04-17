import React from 'react'
import styled, { css } from 'styled-components'

import { MediaQuery } from '@/utils/mediaQueries'
import { getTypographyStyles } from './Typography'

type ProductTagProps = {
  variant: 'new' | 'sale'
  children: React.ReactNode
  size: 'small' | 'medium'
}

const Tag = styled.div<ProductTagProps>`
  margin: 0 0 8px 0;
  text-align: center;
  text-transform: uppercase;
  color: white;

  * {
    color: white;
  }

  ${(props) =>
    props.variant === 'new' &&
    css`
      background: var(--black);
    `}

  ${(props) =>
    props.variant === 'sale' &&
    css`
      background: var(--brand-danger);
    `}

  ${(props) =>
    props.size === 'small' &&
    css`
      padding: 5px 8px;
      ${getTypographyStyles('body-sm')}
      color: white;
    `}

  ${(props) =>
    props.size === 'medium' &&
    css`
      padding: 10px 15px;
      ${getTypographyStyles('body')}
      color: white;

      @media (max-width: ${MediaQuery.screenSm}) {
        padding: 5px 8px;
        ${getTypographyStyles('body-sm')}
        color: white;
      }
    `}
`

export default function ProductTag(props: ProductTagProps) {
  return <Tag {...props} />
}
