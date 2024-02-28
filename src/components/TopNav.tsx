'use client'

import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { imageUrl } from '@/utils/image'
import SlideOutPanel from './SlideOutPanel'
import Icon from './Icon'
import useVenue from '@/hooks/useVenue'
import useCart from '@/hooks/useCart'
import Badge from './Badge'
import cartService from '@/api/cartService'
import Cart from './Cart'
import { MediaQuery } from '@/utils/mediaQueries'

const topNavLinks = [
  {
    name: 'Shop',
    path: '/shop',
  },
]

const TopNavEl = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding: 0 24px;
  position: relative;
`

const TopNavImage = styled(Image)`
  object-fit: cover;
  width: 1200px;
  height: 700px;
  position: absolute;
  top: 0;
  z-index: -1;
`

const Logo = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  gap: 20px;
`

const RightCol = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  gap: 20px;
`

const Links = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
      `}
    >
      {topNavLinks.map((l) => {
        return (
          <Link
            key={l.path}
            href={l.path}
            css={css`
              font-family: var(--font-family-secondary);
              font-size: 1.6rem;
              color: var(--white);
            `}
          >
            {l.name}
          </Link>
        )
      })}
    </div>
  )
}

export default function TopNav() {
  const router = useRouter()
  const q_venue = useVenue()
  const q_cart = useCart()
  const [cartSlideOutOpen, setCartSlideOutOpen] = React.useState(false)

  useEffect(() => {
    setCartSlideOutOpen(false)
  }, [router])

  return (
    <>
      <TopNavEl>
        <LeftCol>
          <Logo href="/">
            <Image
              css={css`
                display: block;

                @media (max-width: ${MediaQuery.screenSm}) {
                  display: none;
                }
              `}
              alt={`${q_venue?.data?.name} logo`}
              src={q_venue?.data?.logo ?? ''}
              height={62}
              width={200}
              loading="eager"
            />
            <Image
              css={css`
                display: none;

                @media (max-width: ${MediaQuery.screenSm}) {
                  display: block;
                }
              `}
              alt={`${q_venue?.data?.name} logo`}
              src={imageUrl(q_venue?.data?.logoSquare ?? '', {
                height: '50px',
              })}
              fill
              loading="eager"
            />
          </Logo>
          <Links />
        </LeftCol>
        <RightCol>
          <Icon type="SEARCH" />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()

              setCartSlideOutOpen(true)
            }}
          >
            <Icon type="CART" />
            {q_cart?.data?.items && q_cart?.data?.items.length ? (
              <Badge
                style={{ position: 'absolute', top: '14px', right: '10px' }}
                variant="primary"
              >
                {cartService.getTotalItemCount()}
              </Badge>
            ) : null}
          </a>
        </RightCol>
        <TopNavImage
          alt="Highscore Nav Background"
          src={imageUrl(
            'https://dispense-images.imgix.net/highscore/v2/hs-nav-bg-2.png',
            {
              height: 80,
            }
          )}
          fill
          quality={75}
          loading="eager"
          priority={false}
        />
      </TopNavEl>
      <SlideOutPanel
        width="600px"
        open={cartSlideOutOpen}
        onClose={() => setCartSlideOutOpen(false)}
      >
        <Cart
          onClose={() => {
            console.log('CLOSE')
            setCartSlideOutOpen(false)
          }}
        />
      </SlideOutPanel>
    </>
  )
}
