import { QueryClient } from '@tanstack/react-query'

export const QueryClientKey = {
  APP_CONFIG: ['appConfig'],
  TOP_BAR_NOTIFICATIONS: ['topBarNotifications'],
  CART: ['cart'],
  TOASTS: ['toasts'],
  PRODUCT_CATEGORY_CONFIGS: ['productCategoryConfigs'],
  PRODUCTS: ['products'],
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: process.env.ENV !== 'local',
      refetchOnWindowFocus: process.env.ENV !== 'local',
      staleTime: 60 * 20000, // 20 minutes
    },
  },
})
