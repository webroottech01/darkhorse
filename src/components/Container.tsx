'use client'

import styled from 'styled-components'

type ContainerProps = {
  children: React.ReactNode
}
const Container = styled.div<ContainerProps>`
  padding: 15px;
  margin-inline: auto;
  position: relative;

  @media (min-width: 1200px) {
    width: 1200px;
  }

  @media (max-width: 1200px) {
    width: 100%;
  }
`

export default Container
