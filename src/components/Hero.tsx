'use client'

import Link from 'next/link'
import Image from 'next/image'
import styled, { css } from 'styled-components'

import Button from '@/components/Button'
import Typography from '@/components/Typography'
import { imageUrl } from '@/utils/image'
import { MediaQuery } from '@/utils/mediaQueries'

const Banner = styled.div`
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 12% 0;
  align-items: center;
  justify-content: space-between;
  height: 700px;

  @media (max-width: ${MediaQuery.screenMd}) {
    height: 500px;
  }
`

const HeroInner = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  color: var(--white);
`

const HeroImage = styled(Image)`
  object-fit: cover;
  width: 1200px;
  height: 700px;
  position: absolute;
  top: 0;
`

const HeroH1 = styled(Typography).withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  color: var(--white);
  text-align: center;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  text-shadow: -6px 4px 4px rgba(107, 107, 107, 0.25);
  font-size: 66px;
  margin: 0 0 -20px;

  @media (max-width: ${MediaQuery.screenMd}) {
    font-size: 50px;
  }
`

const HeroH2 = styled(Typography).withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  color: var(--white);
  font-family: var(--font-family-primary);
  font-weight: 700;
  margin: 0;
`

export default function Hero() {
  return (
    <Banner>
      <HeroImage
        alt="Highscore Hero"
        src={imageUrl(
          'https://dispense-images.imgix.net/highscore-hero-1.png',
          {
            height: 700,
            width: 1200,
          }
        )}
        fill
        quality={75}
        loading="eager"
        priority
      />
      <HeroInner>
        <HeroH1 variant="h1" as="h1">
          Level up!
        </HeroH1>
        <HeroH2 variant="h2" as="h2">
          with our top notch cannabis products
        </HeroH2>
        <div
          css={css`
            padding: 40px 0;
          `}
        >
          <Link href="/shop">
            <Button
              size="default"
              variant="primary"
              style={{ paddingInline: '80px' }}
            >
              Shop
            </Button>
          </Link>
        </div>
      </HeroInner>
    </Banner>
  )
}
