import { Venue } from '@/types/venue'
import { RequestOptions, request } from './dispenseApiClient'
import { queryClientUtils, QueryClientKey } from '@/utils/queryClient'
import { AppConfig } from 'next/dist/build/utils'

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

  getCurrentVenue = () => {
    const queryClient = queryClientUtils.getQueryClient()
    return queryClient.getQueryData<Venue>(QueryClientKey.VENUE)
  }
}

const venueService = new VenueService()

export default venueService
