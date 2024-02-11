import { Venue } from '@/types'
import { request } from './apiClient'

export const getVenueById = async (id: string) => {
  return request<Venue>({
    path: `/venues/${id}`,
    params: {},
  })
}
