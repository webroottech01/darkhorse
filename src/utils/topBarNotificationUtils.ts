import { queryClient, QueryClientKey } from 'src/queryClient'
import scrollUtils from './scrollUtils'

export enum TopBarNotificationType {
  INFO = 'INFO',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

export type TopBarNotification = {
  type?: TopBarNotificationType
  text: string
  timeout?: number
  clearable?: boolean
}

class TopBarNotificationUtils {
  show(notification: TopBarNotification) {
    notification.clearable = notification.clearable ?? true

    queryClient.setQueryData(QueryClientKey.TOP_BAR_NOTIFICATIONS, [
      notification,
    ])

    setTimeout(() => {
      queryClient.setQueryData(QueryClientKey.TOP_BAR_NOTIFICATIONS, [])
    }, notification.timeout || 5000)

    scrollUtils.scrollTo({
      top: 0,
    })

    return this.getAll()
  }

  getAll() {
    return queryClient.getQueryData(
      QueryClientKey.TOP_BAR_NOTIFICATIONS
    ) as TopBarNotification[]
  }
}

const topBarNotificationUtils = new TopBarNotificationUtils()

export default topBarNotificationUtils
