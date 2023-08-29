import { Link, Outlet } from '@tanstack/react-router'
import React from 'react'
import styled, { css } from 'styled-components'

import Container from 'src/components/Container'

const topNavLinks = [
  {
    name: 'Shop',
    path: '/shop',
  },
]

const TopNav = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

const Logo = styled(Link)`
  height: 50px;

  img {
    height: 50px;
  }
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

export default function Layout() {
  return (
    <>
      <Container>
        <TopNav>
          <Logo to="/" search={{}} params={{}}>
            <img src="https://dispense-images.imgix.net/99fa3360-9deb-11ed-8a76-0bf2dff1df72.png?ixlib=js-2.3.2&h=50px&auto=format%2Ccompress" />
          </Logo>
          <Links />
        </TopNav>
      </Container>
      <Outlet />
    </>
  )
}
