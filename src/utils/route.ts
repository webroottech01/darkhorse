export enum RouteName {
  HOME = 'HOME',
  PRODUCTS = 'PRODUCTS',
  PRODUCT_CATEGORY = 'PRODUCT_CATEGORY',
  PRODUCT = 'PRODUCT',
  CHECKOUT = 'CHECKOUT',
  BLOG = 'blogs',
}

export const getCurrentRouteName = (path: string) => {
  path = path ?? '/'

  if (path === '/') {
    return RouteName.HOME
  } else if (path.match(/\/[0-9A-Z&\-%]*\/checkout/i)) {
    return RouteName.CHECKOUT
  } else if (path === '/shop') {
    return RouteName.PRODUCTS
  } else if (path.match('/shop/*')) {
    return RouteName.PRODUCT_CATEGORY
  } else if (path.match('/products/*')) {
    return RouteName.PRODUCT
  } else if (path.match(/\/[0-9A-Z&\-%]*\/[0-9A-Z&\-%]*/i)) {
    return RouteName.PRODUCT
  } else if (path.match('/blog/*')) {
    return RouteName.BLOG
  }

  return null
}
