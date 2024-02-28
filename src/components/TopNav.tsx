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
import { ProductType, ProductTypeName } from '@/types/product'
import { addQueryStringParams } from '@/utils/url'
import Dropdown, { DropdownTriggerProps } from './Dropdown/Dropdown'
import DropdownTrigger from './Dropdown/DropdownTrigger'
import Typography from './Typography'
import DropdownItem from './Dropdown/DropdownItem'

const topNavLinks = [
  {
    name: 'Shop',
    path: '/shop',
    links: Object.values(ProductType).map((type) => {
      return {
        name: ProductTypeName[type],
        path: `/shop/${type.toLowerCase()}`,
      }
    }),
  },
  {
    name: 'Specials',
    path: addQueryStringParams('/shop', {
      discounted: 'true',
    }),
  },
]

const TopNavEl = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 24px;
  position: relative;
  background: var(--brand-primary);
  z-index: 10;
`

const TopNavImage = styled(Image)`
  object-fit: cover;
  position: absolute;
  top: 0;
  z-index: -1;
`

const TopNavLink = styled(Typography)`
  font-family: var(--font-family-secondary);
  font-size: 1.6rem;
  color: var(--white);
`

const Logo = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  z-index: 1;
  flex: 0;
`

const RightCol = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  z-index: 1;
  flex: 0;
`

const Links = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 20px;

        .dispense-dropdown-menu {
          width: 220px;
        }
      `}
    >
      {topNavLinks.map((l) => {
        return l.links && l.links.length ? (
          <Dropdown
            position="left"
            key={l.path}
            Trigger={(props) => (
              <DropdownTrigger
                {...props}
                size="small"
                style={{ background: 'none', border: 'none' }}
              >
                <TopNavLink>{l.name}</TopNavLink>
              </DropdownTrigger>
            )}
          >
            {(props) => {
              return l.links.map((link) => (
                <DropdownItem key={link.path}>
                  <Link
                    href={link.path}
                    onClick={() => props.close()}
                    css={css`
                      display: block;
                      position: relative;
                      padding: 0 0 5px;

                      &:hover {
                        &:after {
                          transform: scaleX(1);
                        }
                      }

                      &:after {
                        content: '';
                        display: inline-block;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 2px;
                        background-color: var(--blue-dark);
                        -webkit-transition: 0.25s;
                        transition: 0.25s;
                        -webkit-transform: scaleX(0);
                        -ms-transform: scaleX(0);
                        transform: scaleX(0);
                      }
                    `}
                  >
                    <Typography>{link.name}</Typography>
                  </Link>
                </DropdownItem>
              ))
            }}
          </Dropdown>
        ) : (
          <Link key={l.path} href={l.path}>
            <TopNavLink>{l.name}</TopNavLink>
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
              priority={false}
            />
            <Image
              css={css`
                display: none;

                @media (max-width: ${MediaQuery.screenSm}) {
                  display: block;
                }
              `}
              alt={`${q_venue?.data?.name} logo`}
              src={q_venue?.data?.logoSquare ?? ''}
              height={50}
              width={50}
              priority={false}
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
            css={css`
              position: relative;
            `}
          >
            <Icon type="CART" />
            {q_cart?.data?.items && q_cart?.data?.items.length ? (
              <Badge
                style={{ position: 'absolute', top: '-5px', right: '10px' }}
                variant="danger"
              >
                {cartService.getTotalItemCount()}
              </Badge>
            ) : null}
          </a>
        </RightCol>
        <TopNavImage
          alt="Highscore Nav Background"
          src='https://dispense-images.imgix.net/highscore/v2/hs-nav-bg-2.png'
          fill
          quality={75}
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
