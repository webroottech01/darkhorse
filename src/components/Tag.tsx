import React from 'react'
import { CannabisType, CannabisTypeName } from 'src/types'
import styled, { CSSProp, css } from 'styled-components'

const SpanEl = styled.span<{
  variant?: 'primary'
  cannabisType?: CannabisType
}>`
  display: inline-flex;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 12px;

  ${(props) =>
    props.variant === 'primary' &&
    css`
      background: var(--brand-primary);
      color: white;
    `}

  ${(props) =>
    props.cannabisType === CannabisType.SATIVA &&
    css`
      border-radius: 4px;
      border: 1px solid var(--orange);
      color: var(--orange);
      background: rgba(238, 135, 15, 0.2);
    `}

${(props) =>
    props.cannabisType === CannabisType.INDICA &&
    css`
      border-radius: 4px;
      border: 1px solid var(--purple);
      color: var(--purple);
      background: rgba(108, 67, 255, 0.2);
    `}

${(props) =>
    props.cannabisType === CannabisType.HYBRID &&
    css`
      border-radius: 4px;
      border: 1px solid var(--green);
      color: var(--green);
      background: rgba(19, 181, 16, 0.2);
    `}
`

export default function Tag({
  variant,
  children,
  style,
  cannabisType,
}: {
  variant?: 'primary'
  children?: React.ReactNode
  style?: React.CSSProperties
  cannabisType?: CannabisType
}) {
  if (
    cannabisType === CannabisType.HYBRID_INDICA ||
    cannabisType === CannabisType.HYBRID_SATIVA
  ) {
    cannabisType = CannabisType.HYBRID
  }

  if (!!cannabisType) {
    return (
      <SpanEl style={style} variant={variant} cannabisType={cannabisType}>
        {CannabisTypeName[cannabisType]}
      </SpanEl>
    )
  }

  return (
    <SpanEl style={style} variant={variant}>
      {children}
    </SpanEl>
  )
}
