'use client'

import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

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
import Dropdown from './Dropdown/Dropdown'
import DropdownTrigger from './Dropdown/DropdownTrigger'
import Typography from './Typography'
import DropdownItem from './Dropdown/DropdownItem'
import SlideoutHeader from './SlideoutHeader'
import Accordion from './Accordion'
import useSearchParams from '@/hooks/useSearchParams'
import useRouteName from '@/hooks/useRouteName'
import { RouteName } from '@/utils/route'

const topNavLinks = [
  {
    name: 'Shop',
    path: '/shop',
    links: [
      {
        name: 'All Products',
        path: '/shop',
      },
      ...Object.values(ProductType).map((type) => {
        return {
          name: ProductTypeName[type],
          path: `/shop/${type.toLowerCase()}`,
        }
      }),
    ],
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

  @media (max-width: ${MediaQuery.screenSm}) {
    padding: 0 10px 0 15px;
  }
`

const TopNavImage = styled(Image)`
  object-fit: cover;
  position: absolute;
  top: 0;
  z-index: -1;
`

const TopNavLink = styled(Link)`
  font-family: var(--font-family-secondary);
  font-size: 1.6rem;
  color: var(--white);

  &:hover,
  &:active,
  &:focus-visible,
  &:focus-within {
    color: var(--brand-primary);
  }

  &:visited {
    color: var(--white);
  }

  path {
    fill: var(--white) !important;
  }
`

const MobileCenterText = styled(Typography)`
  position: absolute;
  font-family: var(--font-family-secondary);
  color: var(--white);
  text-align: center;
  width: 100%;
  inset: 0;
  z-index: 0;
  height: 100%;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;

  @media (max-width: ${MediaQuery.screenMd}) {
    display: flex;
  }
`

const MobileNavToggle = styled.a`
  display: none;

  svg {
    path {
      fill: var(--white);
    }
  }

  @media (max-width: ${MediaQuery.screenMd}) {
    display: block;
  }
`

const Logo = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: ${MediaQuery.screenMd}) {
    display: none;
  }
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

  .cart-icon {
    margin-top: 6px;
  }

  @media (max-width: ${MediaQuery.screenMd}) {
    gap: 10px;
  }

  @media (max-width: ${MediaQuery.screenSm}) {
    gap: 5px;
    margin-top: 6px;

    .cart-icon {
      margin-top: 6px;
    }
  }
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

        @media (max-width: ${MediaQuery.screenMd}) {
          display: none;
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
                css={css`
                  &:hover,
                  &:active,
                  &:focus-visible,
                  &:focus-within {
                    color: var(--brand-primary);
                    transform: none !important;

                    path {
                      fill: var(--white) !important;
                    }
                  }
                `}
              >
                <TopNavLink key={l.path} href={l.path}>
                  {l.name}
                </TopNavLink>
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
          <TopNavLink key={l.path} href={l.path}>
            {l.name}
          </TopNavLink>
        )
      })}
    </div>
  )
}

export default function TopNav() {
  const router = useRouter()
  const pathname = usePathname()
  const routeName = useRouteName()
  const searchParams = useSearchParams()
  const q_venue = useVenue()
  const q_cart = useCart()
  const [cartSlideOutOpen, setCartSlideOutOpen] = React.useState(false)
  const [mobileSlideoutOpen, setMobileSlideoutOpen] = React.useState(false)

  useEffect(() => {
    setCartSlideOutOpen(false)
    setMobileSlideoutOpen(false)
  }, [pathname])

  useEffect(() => {
    if (searchParams.cart) {
      setCartSlideOutOpen(true)
    }
  }, [searchParams])

  return (
    <>
      <TopNavEl
        style={{ display: routeName === RouteName.CHECKOUT ? 'none' : 'flex' }}
      >
        <MobileCenterText>
          <Link href="/">
            <Image
              css={css`
                display: block;
              `}
              alt={`${q_venue?.data?.name} logo`}
              src="https://dispense-images.imgix.net/highscore/v2/hs-logo-white-icon.png"
              height={47}
              width={150}
              priority={false}
            />
          </Link>
        </MobileCenterText>
        <LeftCol>
          <MobileNavToggle
            href="#"
            onClick={(e) => {
              e.preventDefault()

              setMobileSlideoutOpen(true)
            }}
          >
            <Icon height={40} width={40} type="HAMBURGER" />
          </MobileNavToggle>
          <Logo href="/">
            <Image
              css={css`
                display: block;
              `}
              alt={`${q_venue?.data?.name} logo`}
              src="https://dispense-images.imgix.net/highscore/v2/hs-logo-white-icon.png"
              height={62}
              width={200}
              priority={false}
            />
          </Logo>
          <Links />
        </LeftCol>
        <RightCol>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()

              setCartSlideOutOpen(true)
            }}
            className="cart-icon"
            css={css`
              position: relative;
            `}
          >
            <Icon height={52} width={52} type="CART" />
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
          src="https://dispense-images.imgix.net/highscore/v2/hs-nav-bg-2.png"
          fill
          quality={75}
          priority={false}
        />
      </TopNavEl>
      <SlideOutPanel
        width="100%"
        side="left"
        open={mobileSlideoutOpen}
        onClose={() => setMobileSlideoutOpen(false)}
      >
        <SlideoutHeader
          onClose={() => setMobileSlideoutOpen(false)}
          CenterText={
            <Typography variant="h2" style={{ fontSize: '1.4rem' }}>
              Menu
            </Typography>
          }
        />
        <div
          css={css`
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 15px;
            font-family: var(--font-family-secondary);
            font-size: 2rem;
            color: var(--brand-primary);
          `}
        >
          {topNavLinks.map((l) => (
            <React.Fragment key={l.path}>
              {l.links && l.links.length ? (
                <Accordion
                  trigger={<>{l.name}</>}
                  style={{
                    width: '100%',
                    borderBottom: '1px solid var(--gray-light)',
                  }}
                >
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      align-items: flex-start;
                      justify-content: center;
                      margin-left: 40px;
                      gap: 10px;
                    `}
                  >
                    {l.links.map((link) => (
                      <Link key={link.path} href={link.path}>
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </Accordion>
              ) : (
                <Link key={l.path} href={l.path}>
                  {l.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </SlideOutPanel>
      <SlideOutPanel
        width="600px"
        open={cartSlideOutOpen}
        onClose={() => setCartSlideOutOpen(false)}
      >
        <Cart
          onClose={() => {
            setCartSlideOutOpen(false)
          }}
        />
      </SlideOutPanel>
    </>
  )
}
