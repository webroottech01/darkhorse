export enum RouteName {
  HOME = 'HOME',
  PRODUCTS = 'PRODUCTS',
}

export const getCurrentMenuRouteName = (path: string) => {
  path = path ?? '/'

  if (path === '/') {
    return RouteName.HOME
  } else if (path === '/products') {
    return RouteName.PRODUCTS
  }

  return null
}
