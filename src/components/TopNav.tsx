import { Link } from '@tanstack/react-router'
import React from 'react'
import styled, { css } from 'styled-components'

import Container from 'src/components/Container'
import Icon from './Icon'

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
`

const RightCol = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
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
  return (
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
            <Icon type="LOGO" />
          </Logo>
          <Links />
        </LeftCol>
        <RightCol>
          <Icon type="SEARCH" />
          <Icon type="CART" />
        </RightCol>
      </Container>
    </TopNavEl>
  )
}
