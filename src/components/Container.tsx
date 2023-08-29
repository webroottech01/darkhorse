import styled from 'styled-components'

type ContainerProps = {
  children: React.ReactNode
}
const Container = styled.div<ContainerProps>`
  padding: 15px;
  margin-inline: auto;
  position: relative;

  @media (min-width: 1300px) {
    width: 1300px;
  }

  @media (max-width: 1300px) {
    width: 100%;
  }
`

export default Container
