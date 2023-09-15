import React from 'react'
import styled, { CSSProp, css } from 'styled-components'

const SpanEl = styled.span<{ variant?: 'primary' }>`
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

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background: var(--brand-primary);
      color: white;
    `}
`

export default function Badge({
  variant,
  children,
  style,
}: {
  variant?: 'primary'
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <SpanEl style={style} variant={variant}>
      {children}
    </SpanEl>
  )
}
