import React from 'react'
import styled from 'styled-components'

import Image from './Image'

const CardImageContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 20px 0;
`

const ImageEl = styled(Image)`
  user-select: none;
`

const CardImage = (props: React.ComponentProps<typeof ImageEl>) => {
  return (
    <CardImageContainer style={props.style}>
      <ImageEl {...props} />
    </CardImageContainer>
  )
}

export default CardImage
