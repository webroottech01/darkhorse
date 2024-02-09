import { cache } from 'react'

import { Venue } from '@/types'
import { request } from './apiClient'

export const getVenueById = cache(async (id: string) => {
  return request<Venue>({
    path: `/venues/${id}`,
    params: {},
  })
})
