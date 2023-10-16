import { request } from 'src/apiClient'
import { Venue } from 'src/types'

export const getVenueById = async (id: string) => {
  return request<Venue>({
    path: `/venues/${id}`,
    params: {},
  })
}
