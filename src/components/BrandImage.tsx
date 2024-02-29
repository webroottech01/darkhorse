'use client'

import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

export type BrandImageProps = {
  image: string
  height: number
  width: number
  alt: string
}

const ImageEl = styled(Image)<Pick<BrandImageProps, 'height' | 'width'>>`
  border: 1px solid var(--gray-lightest);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${(props) => `${props.height}px`};
  width: ${(props) => `${props.width}px`};

  img {
    height: auto;
  }

  > div {
    height: auto;
  }
`

const BrandImage = ({ image, height, width, alt }: BrandImageProps) => {
  return <ImageEl src={image} height={height} width={width} alt={alt} />
}

export default BrandImage
