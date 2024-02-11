'use client'

import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'

import Button from '@/components/Button'
import Typography from '@/components/Typography'
import { imageUrl } from '@/utils/image'

const Banner = styled.div`
  position: relative;
  height: 700px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 100px 0;
  align-items: center;
  justify-content: space-between;
`

const HeroInner = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
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
  max-width: 600px;
  color: #fff;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: 65px;
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
        <HeroH1 variant="body" as="h1">
          Level Up! <br /> Get Higher
        </HeroH1>
        <Link href="/shop">
          <Button
            size="default"
            variant="primary"
            style={{ paddingInline: '80px' }}
          >
            Shop
          </Button>
        </Link>
      </HeroInner>
    </Banner>
  )
}
