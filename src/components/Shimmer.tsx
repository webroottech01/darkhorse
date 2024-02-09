'use client'

import styled from 'styled-components'

export const Shimmer = styled.div`
  animation-duration: 2.8s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: shimmer;
  animation-timing-function: linear;
  background: var(--gray-lightest);
  background: linear-gradient(
    to right,
    var(--gray-lightest),
    #f0f2f5,
    var(--gray-lightest)
  );
  background-size: 1200px 100%;
  border-radius: 4px;
  @keyframes shimmer {
    0% {
      background-position: -1200px 0;
    }

    100% {
      background-position: 1200px 0;
    }
  }
  width: 100%;
  height: 100%;
`
