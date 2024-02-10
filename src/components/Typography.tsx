'use client'

import styled from 'styled-components'

type Variant =
  | 'body'
  | 'body-sm'
  | 'body-xs'
  | 'label-sm'
  | 'label'
  | 'number-lg'
  | 'number-lg-secondary'
  | 'number-lg-discount'
  | 'number-lg-sale'
  | 'number'
  | 'number-sm'
  | 'number-secondary'
  | 'number-sm-secondary'
  | 'number-sm-discount'
  | 'number-sm-sale'
  | 'number-discount'
  | 'link'
  | 'link-sm'
  | 'link-secondary'
  | 'link-sm-secondary'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'

export const getVariantStyles = (variant?: Variant) => {
  switch (variant) {
    case 'body-sm':
      return `
        color: var(--gray);
        font-size: 0.8125rem;
      `
    case 'body-xs':
      return `
        color: var(--gray);
        font-size: 0.625rem;
      `
    case 'label-sm':
      return `
        color: var(--gray);
        font-size: 0.75rem;
      `
    case 'label':
      return `
        color: var(--gray);
        font-size: 0.8125rem;
        font-weight: 700;
      `
    case 'number-sm':
      return `
        color: var(--black);
        font-size: 0.8125rem;
      `
    case 'number-lg':
      return `
        font-size: 1.5rem;
        color: var(--black);
      `
    case 'number-lg-secondary':
      return `
        font-size: 1.5rem;
        color: var(--gray);
      `
    case 'number':
      return `
        font-size: 1rem;
        color: var(--black);
      `
    case 'number-secondary':
      return `
        font-size: 1rem;
        color: var(--gray);
      `
    case 'number-discount':
      return `
        font-size: 1rem;
        text-decoration: line-through;
        color: var(--gray);
      `
    case 'number-sm-secondary':
      return `
        font-size: 0.8125rem;
        color: var(--gray);
      `
    case 'number-lg-sale':
      return `
        font-size: 1.5rem;
        color: var(--brand-danger);
      `
    case 'link':
      return `
        font-size: 1rem;
        font-weight: 700;
        color: var(--brand-primary);
      `
    case 'link-sm':
      return `
        font-size: 0.8125rem;
        color: var(--brand-primary);
        font-weight: 700;
      `
    case 'link-secondary':
      return `
        font-size: 1rem;
        font-weight: 700;
        color: var(--gray);
      `
    case 'link-sm-secondary':
      return `
        font-size: 0.8125rem;
        color: var(--gray);
        font-weight: 800;
      `
    case 'h1':
      return `
        font-size: 3.75rem;
        color: var(--black);
        font-weight: 800;
      `
    case 'h2':
      return `
        font-size: 2.00rem;
        color: var(--black);
        font-weight: 800;
      `
    case 'h3':
      return `
        font-size: 1rem;
        color: var(--black);
        font-weight: 800;
      `
    case 'h4':
      return `
        font-size: 0.75rem;
        font-weight: 400;
        letter-spacing: 1px;
        color: var(--gray);
        text-transform: uppercase;
      `
    case 'body':
    default:
      return `
        color: var(--black);
        font-size: 1rem;
      `
  }
}

export type TypographyProps = {
  variant?: Variant
}

export const getTypographyStyles = (variant?: Variant) =>
  `
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: 0.4px;
  ${getVariantStyles(variant)}
`
const Typography = styled.div<TypographyProps>`
  ${(props) => getTypographyStyles(props.variant)}
`

export default Typography
