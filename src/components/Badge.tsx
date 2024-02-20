import React from 'react'
import styled from 'styled-components'

import Typography from './Typography'

export type BadgeProps = {
  children?: React.ReactNode
  variant?: 'default' | 'primary' | 'danger'
  style?: React.CSSProperties
}

const BadgeEl = styled(Typography)<{
  badgeVariant?: 'default' | 'primary' | 'danger'
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 19px;
  width: auto;
  padding: 5px 6px;
  border-radius: 20px;
  background-color: var(--gray);
  color: var(--white);
  font-size: 12px;

  ${({ badgeVariant }) =>
    badgeVariant === 'primary' &&
    `
    background-color: var(--brand-primary);
    color: var(--white);
  `};

  ${({ badgeVariant }) =>
    badgeVariant === 'danger' &&
    `
    background-color: var(--brand-danger);
    color: var(--white);
  `};
`

export default function Badge({ children, variant, style }: BadgeProps) {
  return (
    <BadgeEl className="badge" badgeVariant={variant} style={style}>
      {children}
    </BadgeEl>
  )
}
