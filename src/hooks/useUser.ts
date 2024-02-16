'use client'

import { useQuery } from '@tanstack/react-query'

import { getCurrentUser, User } from '@dispense/dispense-js'
import { QueryClientKey } from '@/utils/queryClient'

export default function useUser() {
  return useQuery<User>({
    queryKey: QueryClientKey.CURRENT_USER,
    queryFn: () => getCurrentUser({}),
  })
}
