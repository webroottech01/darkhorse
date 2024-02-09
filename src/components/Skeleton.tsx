'use client'

import React from 'react'
import styled, { css } from 'styled-components'

export type NonHTMLProps = {
  round?: boolean
  diameter?: number
  width?: number
  height?: number
}

export type SkeletonProps = React.ComponentProps<typeof Skeleton> & NonHTMLProps

const DEFAULT_DIAMETER = 50

const Skeleton = styled.div<NonHTMLProps>`
  @keyframes skeleton {
    100% {
      transform: translateX(100%);
    }
  }

  background-color: var(--gray-light);
  width: ${({ width }) => (width !== undefined ? `${width}px` : '100%')};
  max-width: 100%;
  border-radius: 0.25rem;
  display: inline-flex;
  line-height: 1;
  height: ${({ height }) => height ?? 22}px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  ${({ round, diameter = DEFAULT_DIAMETER }) =>
    round &&
    diameter !== undefined &&
    css`
      border-radius: 50%;
      width: ${diameter}px;
      height: ${diameter}px;
    `}

  ::after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    display: block;
    animation-duration: 2.8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: skeleton;
    animation-timing-function: linear;
    background: var(--gray-lightest);
    background: linear-gradient(
      to right,
      var(--gray-lightest),
      #f0f2f5,
      var(--gray-lightest)
    );
    background-size: 1200px 100%;
    @keyframes skeleton {
      0% {
        background-position: -1200px 0;
      }

      100% {
        background-position: 1200px 0;
      }
    }
    @keyframes skeleton-1 {
      0% {
        background-position: -900px 0;
      }

      100% {
        background-position: 900px 0;
      }
    }
  }
`

export default Skeleton
