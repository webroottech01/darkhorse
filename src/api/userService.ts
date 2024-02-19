import { User } from '@/types/user'
import { RequestOptions, request } from './dispenseApiClient'

class UserService {
  getCurrent = async (params: {}, options?: RequestOptions): Promise<User> => {
    return request<User>({
      method: 'GET',
      path: '/user/me',
      options: {
        ...options,
        params,
      },
    })
  }
}

const userService = new UserService()

export default userService
