'use client'

import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { MediaQuery } from '@/utils/mediaQueries'
import { ProductType, ProductTypeName } from '@/types/product'
import { addQueryStringParams } from '@/utils/url'
import Dropdown from '../Dropdown/Dropdown'
import DropdownTrigger from '../Dropdown/DropdownTrigger'
import Typography from '../Typography'
import DropdownItem from '../Dropdown/DropdownItem'


const topNavLinks = [
    {
        name: 'Home',
        path: '/',
      },
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
//   {
//     name: 'Specials',
//     path: addQueryStringParams('/shop', {
//       discounted: 'true',
//     }),
//   },
 
  {
    name: 'About',
    path: '/pages/about',
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
  display:none;
`

const TopNavLink = styled(Link)`
  font-family: var(--font-family-secondary);
  font-size: 1.4rem;
  color: var(--cream);

  &:hover,
  &:active,
  &:focus-visible,
  &:focus-within {
    color: var(--color-cream);
    border-bottom: 1px solid var(--color-cream)
  }

  &:visited {
    color: var(--cream);
  }

  path {
    fill: var(--cream) !important;
  }
`

const MobileCenterText = styled(Typography)`
  position: absolute;
  font-family: var(--font-family-secondary);
  color: var(--cream);
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
      fill: var(--cream);
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
const CenterCol = styled.div`
  z-index: 1;
  margin: 0 auto;
  flex: 0;
`

const RightCol = styled.div`

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
                      fill: var(--cream) !important;
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

export default function NavBar() {

  return (
    <>


        <Links />

    </>
  )
}
