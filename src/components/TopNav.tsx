import { Link } from '@tanstack/react-router'
import React from 'react'
import styled, { css } from 'styled-components'

import Container from 'src/components/Container'
import Icon from './Icon'
import Badge from './Badge'
import useCart from 'src/hooks/useCart'
import { getTotalItemCount } from 'src/utils/cartUtils'
import Cart from 'src/components/Cart'
import SlideOutPanel from './SlideOutPanel'

const topNavLinks = [
  {
    name: 'Shop',
    path: '/shop',
  },
]

const TopNavEl = styled.div`
  height: 70px;
  box-shadow: 0px -1px 0px 0px var(--card-border-color) inset;
`

const Logo = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;

  img {
    height: 50px;
  }
`

const LeftCol = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  gap: 50px;
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
            css={css`
              padding: 10px 15px;
              text-align: center;
            `}
            key={l.path}
            to={l.path}
            search={{}}
            params={{}}
          >
            {l.name}
          </Link>
        )
      })}
    </div>
  )
}

export default function TopNav() {
  const q_cart = useCart()
  const [cartSlideOutOpen, setCartSlideOutOpen] = React.useState(false)

  return (
    <>
      <TopNavEl>
        <Container
          css={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 20px;
            padding-block: 0;
            height: 100%;
          `}
        >
          <LeftCol>
            <Logo to="/" search={{}} params={{}}>
              <Icon type="LOGO" width="193" height="24" viewBox="0 0 193 24" />
            </Logo>
            <Links />
          </LeftCol>
          <RightCol>
            <Icon type="SEARCH" />
            <a
              href="#"
              css={css`
                display: flex;
                flex-direction: row;
                gap: 4px;
                align-items: center;
                justify-content: center;
              `}
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
                  {getTotalItemCount()}
                </Badge>
              ) : null}
            </a>
          </RightCol>
        </Container>
      </TopNavEl>
      <SlideOutPanel
        width="600px"
        open={cartSlideOutOpen}
        onClose={() => setCartSlideOutOpen(false)}
      >
        <Cart onClose={() => setCartSlideOutOpen(false)} />
      </SlideOutPanel>
    </>
  )
}
