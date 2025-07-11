'use client'

import styled from 'styled-components'

type ContainerFluidProps = {
  children: React.ReactNode
}
const ContainerFluid = styled.div<ContainerFluidProps>`
  padding: 15px;
  margin-inline: auto;
  position: relative;

  @media (min-width: 1300px) {
    max-width: 1920px;
  }

  @media (max-width: 1300px) {
    width: 100%;
  }
`

export default ContainerFluid
