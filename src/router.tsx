import * as React from 'react'
import {
  Router,
  Route,
  lazyRouteComponent,
  RouterContext,
} from '@tanstack/react-router'
import { css } from 'styled-components'

import App from './pages/App'

export const routerContext = new RouterContext<{}>()

const rootRoute = routerContext.createRootRoute({
  component: App,
})

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRouteComponent(() => import('src/pages/HomePage')),
})

export const shopRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'shop',
  component: lazyRouteComponent(() => import('src/pages/ShopPage')),
})

export const productRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'products/$productId',
  component: lazyRouteComponent(() => import('src/pages/ProductPage')),
})

export const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '*',
  component: () => (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 100px;
      `}
    >
      404 Not Found
    </div>
  ),
})

const routeTree = rootRoute.addChildren([
  indexRoute.addChildren([shopRoute, productRoute]),
  notFoundRoute,
])

const router = new Router({
  routeTree,
  defaultErrorComponent: ({ error }) => {
    console.log('ERROR', error)

    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 100px;
        `}
      >
        Error
      </div>
    )
  },
  context: {},
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default router
