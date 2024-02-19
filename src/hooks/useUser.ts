'use client'

import { useQuery } from '@tanstack/react-query'

import { QueryClientKey } from '@/utils/queryClient'
import { User } from '@/types/user'
import userService from '@/api/userService'

export default function useUser() {
  return useQuery<User>({
    queryKey: QueryClientKey.CURRENT_USER,
    queryFn: () => userService.getCurrent({}),
  })
}
