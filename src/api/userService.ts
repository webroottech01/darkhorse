import { User } from '@/types/user'
import { RequestOptions, request } from './dispenseApiClient'

class UserService {
  getCurrent = async (
    params: {
      token: string
    },
    options?: RequestOptions
  ): Promise<User> => {
    return request<User>({
      method: 'GET',
      path: '/user/me',
      options: {
        ...options,
        params,
        headers: new Headers({
          'x-access-token': params.token,
        }),
      },
    })
  }
}

const userService = new UserService()

export default userService
