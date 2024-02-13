import cookie from 'js-cookie'

import { queryClientUtils, QueryClientKey } from '@/utils/queryClient'
import { Venue } from '@dispense/dispense-js'

const authCookie = 'highscore-auth'

class AuthUtils {
  isLoggedIn: boolean = false

  get cookieOptions() {
    return {
      expires: 7,
    }
  }

  async login({ token }: { token: string }) {
    const queryClient = queryClientUtils.getQueryClient()
    queryClient.removeQueries(QueryClientKey.CURRENT_USER, { exact: true })

    const venue = queryClient.getQueryData<Venue>(QueryClientKey.VENUE) as Venue

    this.setAuthToken(token)

    this.isLoggedIn = true

    // const user = await getMe()
    // queryClient.setQueryData(QueryClientKey.CURRENT_USER, user)

    // await queryClient.invalidateQueries(QueryClientKey.LOYALTY_ACCOUNT)
    // await queryClient.invalidateQueries(QueryClientKey.ORDER)
  }

  /**
   * @desc Should only be called via React AppContext - instead use AppContext logout method from React
   */
  async logout() {
    const queryClient = queryClientUtils.getQueryClient()
    const venue = queryClient.getQueryData<Venue>(QueryClientKey.VENUE) as Venue

    this.removeAuthToken()

    this.isLoggedIn = false

    // const user = await getMe()
    // queryClient.setQueryData(QueryClientKey.CURRENT_USER, user)

    // await queryClient.invalidateQueries(QueryClientKey.LOYALTY_ACCOUNT)
    // await queryClient.invalidateQueries(QueryClientKey.ORDER)
  }

  getAuthToken() {
    return cookie.get(authCookie)
  }

  private removeAuthToken() {
    cookie.remove(authCookie, {
      cookieOptions: this.cookieOptions,
    })
  }

  setAuthToken(token: string) {
    cookie.set(authCookie, token, {
      cookieOptions: this.cookieOptions,
    })
  }
}

const authUtils = new AuthUtils()

export default authUtils
