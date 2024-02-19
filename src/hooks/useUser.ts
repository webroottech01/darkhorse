'use client'

import { useQuery } from '@tanstack/react-query'

import { User } from '@dispense/dispense-js'
import { QueryClientKey } from '@/utils/queryClient'
import dispense from '@/utils/dispense'

export default function useUser() {
  return useQuery<User>({
    queryKey: QueryClientKey.CURRENT_USER,
    queryFn: () => dispense.getCurrentUser({}),
  })
}
