import { Venue } from '@/types/venue'
import { RequestOptions, request } from './dispenseApiClient'

class VenueService {
  getById = async (id: string, options?: RequestOptions) => {
    return request<Venue>({
      method: 'GET',
      path: `/venues/${id}`,
      options: {
        ...options,
        params: {},
      },
    })
  }
}

const venueService = new VenueService()

export default venueService
