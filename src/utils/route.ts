export enum RouteName {
  HOME = 'HOME',
  PRODUCTS = 'PRODUCTS',
  PRODUCT = 'PRODUCT',
}

export const getCurrentMenuRouteName = (path: string) => {
  path = path ?? '/'

  if (path === '/') {
    return RouteName.HOME
  } else if (path === '/products') {
    return RouteName.PRODUCTS
  } else if (path.match('/products/*')) {
    return RouteName.PRODUCT
  }

  return null
}
