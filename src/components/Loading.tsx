import React from 'react'
import styled, { css } from 'styled-components'

export type LoadingProps = {
  size?: 'default' | 'small' | 'xsmall'
} & React.ComponentPropsWithoutRef<'div'>

const Loading = styled.div<LoadingProps>`
  display: inline-block;
  position: relative;
  height: 42px;
  width: 42px;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  ${(props) =>
    props.size === 'small' &&
    css<LoadingProps>`
      left: 7px;
      top: 7px;
      height: 1.3125rem;
      width: 1.3125rem;
    `}

  ${(props) =>
    props.size === 'xsmall' &&
    css<LoadingProps>`
      left: 4px;
      top: 4px;
      height: 1rem;
      width: 1rem;
    `}
`

const Icon = styled.i<LoadingProps>`
  position: absolute;
  left: 14px;
  top: 14px;
  display: block;

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 42px;
    width: 42px;
    margin-top: -15px;
    margin-left: -15px;
    border-radius: 50%;
    border: 2px solid var(--gray-light);
    border-top-color: var(--brand-primary);
    animation: spinner 0.6s linear infinite;

    ${(props) =>
      props.size === 'small' &&
      css<LoadingProps>`
        height: 21px;
        width: 21px;
      `}

    ${(props) =>
      props.size === 'xsmall' &&
      css<LoadingProps>`
        height: 16px;
        width: 16px;
      `}
  }
`

export default ({ size, ...rest }: LoadingProps) => {
  return (
    <Loading size={size} {...rest}>
      <Icon size={size} />
    </Loading>
  )
}
