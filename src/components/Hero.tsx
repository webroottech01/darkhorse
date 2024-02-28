'use client'

import Link from 'next/link'
import Image from 'next/image'
import styled, { css } from 'styled-components'

import Button from '@/components/Button'
import Typography from '@/components/Typography'
import { MediaQuery } from '@/utils/mediaQueries'
import { addQueryStringParams } from '@/utils/url'

const Banner = styled.div`
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  overflow: hidden;
  background: var(--brand-primary);
`

const HeroInner = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  color: var(--white);
  padding: 240px 60px 30px;
`

const HeroImage = styled(Image)`
  object-fit: cover;
  position: absolute;
  top: 0;
`

const HeroH1 = styled(Typography).withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  color: var(--white);
  font-size: 80px;
  font-family: var(--font-family-secondary);
  margin: 0 0 -20px;

  @media (max-width: ${MediaQuery.screenMd}) {
    font-size: 50px;
  }
`

export default function Hero() {
  return (
    <Banner>
      <HeroInner>
        <Typography
          variant="body"
          as="h2"
          style={{
            fontSize: '1.4rem',
            margin: '0 0 20px 0',
            color: 'var(--white)',
          }}
        >
          High Score Cannabis
        </Typography>
        <HeroH1 variant="h1" as="h1" style={{ margin: 0, maxWidth: '700px' }}>
          Where Every Strain is a High Score
        </HeroH1>
        <div
          css={css`
            padding: 40px 0;
            display: flex;
            flex-direction: row;
            gap: 20px;
          `}
        >
          <Link href="/shop">
            <Button
              size="default"
              variant="primary"
              style={{ paddingInline: '80px' }}
            >
              Order Online
            </Button>
          </Link>
          <Link
            href={addQueryStringParams('/shop', {
              discounted: true,
            })}
          >
            <Button
              size="default"
              variant="secondary"
              style={{ paddingInline: '80px' }}
            >
              Shop Specials
            </Button>
          </Link>
        </div>
      </HeroInner>
      <HeroImage
        alt="Highscore Hero"
        priority={true}
        loading={'eager'}
        height={165}
        width={500}
        quality={70}
        sizes="100vw"
        style={{
          width: '100%',
          height: 'auto',
        }}
        src={'https://dispense-images.imgix.net/highscore/v2/hs-hero-3.png'}
      />
    </Banner>
  )
}
