import { QueryClient } from '@tanstack/react-query'

export const QueryClientKey = {
  VENUE: ['VENUE'],
  CURRENT_USER: ['CURRENT_USER'],
  CART: ['CART'],
}

class QueryClientUtils {
  queryClient: QueryClient | null = null

  setQueryClient(queryClient: QueryClient) {
    this.queryClient = queryClient
  }

  getQueryClient() {
    return this.queryClient as QueryClient
  }
}

export const queryClientUtils = new QueryClientUtils()
