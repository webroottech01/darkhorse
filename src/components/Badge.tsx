import React from 'react'
import styled from 'styled-components'

import Typography from './Typography'

export type BadgeProps = {
  children?: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'danger'
  style?: React.CSSProperties
}

const BadgeEl = styled(Typography)<{
  badgeVariant?: 'default' | 'primary' | 'secondary' | 'danger'
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  padding: 0;
  margin: 0;
  border-radius: 100%;
  background-color: var(--gray);
  color: var(--white);
  font-size: 12px;

  > span {
    position: relative;
    top: 4px;
  }

  ${({ badgeVariant }) =>
    badgeVariant === 'primary' &&
    `
    background-color: var(--brand-primary);
    color: var(--white);
  `};

  ${({ badgeVariant }) =>
    badgeVariant === 'secondary' &&
    `
    background-color: var(--brand-secondary);
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
      <span>{children}</span>
    </BadgeEl>
  )
}
