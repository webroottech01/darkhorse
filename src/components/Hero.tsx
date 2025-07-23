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
  width: 100%;
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
  color: var(--cream);
  padding: 240px 20px 30px;

  @media (max-width: ${MediaQuery.screenMd}) {
    padding: 120px 40px 30px;
  }

  @media (max-width: ${MediaQuery.screenSm}) {
    padding: 120px 20px 30px;
  }
`

const HeroImage = styled(Image)`
  object-fit: cover;
  position: absolute;
  top: 0;

  @media (max-width: ${MediaQuery.screenMd}) {
    width: 120% !important;
  }

  @media (max-width: ${MediaQuery.screenSm}) {
    height: 100% !important;
    width: 220% !important;
  }
`

const HeroH1 = styled(Typography).withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})`
  color: var(--cream);
  font-size: 75px; 
  font-family: var(--font-family-secondary);
  margin: 0 0 -20px;

  @media (max-width: ${MediaQuery.screenMd}) {
    font-size: 40px;
    line-height: 1.2;
  }
`

export default function Hero() {
  return (
    <Banner className='homebanner'>
      <HeroInner className='container'>
        <Typography
          variant="body"
          as="h2"
          style={{
            fontSize: '1.4rem',
            margin: '0 0 20px 0',
            color: 'var(--cream)',
          }}
        >
          Welcome to Dark Horse
        </Typography>
        <HeroH1 variant="h1" as="h1" style={{ margin: 0, maxWidth: '720px' }}>
        From the Shadows to the Spotlight
        </HeroH1>
        <Typography
          variant="body"
          as="h2"
          style={{
            fontSize: '1rem',
            margin: '20px 0 0px 0',
            color: 'var(--cream)',
            maxWidth : '650px'
          }}
        >
          In an industry full of loud players, we are proud to be the dark horse, providing refined, authentic canna products for the discerning connoisseur.
        </Typography>
        <div
          css={css`
            padding: 40px 0;
            display: flex;
            flex-direction: row;
            gap: 20px;

            @media (max-width: ${MediaQuery.screenSm}) {
              flex-direction: column;
              gap: 20px;
              width: 100%;

              button {
                width: 100%;
              }
            }
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
        src={'./images/pattern_med_03_med_08-1.png'}
      />
    </Banner>
  )
}
