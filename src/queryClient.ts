import { QueryClient } from '@tanstack/react-query'

export const QueryClientKey = {
  APP_CONFIG: ['appConfig'],
  TOP_BAR_NOTIFICATIONS: ['topBarNotifications'],
  CART: ['cart'],
  TOASTS: ['toasts'],
  PRODUCT_CATEGORY_CONFIGS: ['productCategoryConfigs'],
  PRODUCTS: ['products'],
}

export const queryClient = new QueryClient()
