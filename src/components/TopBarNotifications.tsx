import React from 'react'
import { useQuery } from '@tanstack/react-query'
import styled, { css } from 'styled-components'

import {
  TopBarNotification,
  TopBarNotificationType,
} from 'src/utils/topBarNotificationUtils'
import { QueryClientKey, queryClient } from '../queryClient'
import Icon from './Icon'
import Typography from './Typography'

const Bar = styled.div<{ type?: TopBarNotificationType }>`
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ${({ type }) =>
    type === TopBarNotificationType.ERROR &&
    `
    background: var(--brand-danger);
    color: var(--white);
  `}

  ${({ type }) =>
    type === TopBarNotificationType.INFO &&
    `
    background: var(--brand-info);
    color: var(--white);
  `}

  ${({ type }) =>
    type === TopBarNotificationType.SUCCESS &&
    `
      background: var(--brand-success);
      color: var(--white);
  `}
`

export default function TopBarNotifications() {
  const notifications = useQuery<TopBarNotification[]>({
    queryKey: QueryClientKey.TOP_BAR_NOTIFICATIONS,
    queryFn: () => {
      return []
    },
  })

  const notification = notifications?.data?.[0]
  if (notification) {
    notification.type = notification.type || TopBarNotificationType.ERROR
  }

  const clear = () => {
    queryClient.setQueryData(QueryClientKey.TOP_BAR_NOTIFICATIONS, [])
  }

  return !!notification ? (
    <Bar type={notification.type}>
      {notification.type === TopBarNotificationType.ERROR ? (
        <>
          <Icon type="CLOSE_X_CIRCLED" height={24} width={24} />
          <Typography variant="body" style={{ color: 'var(--white)' }}>
            {notification.text}
          </Typography>
        </>
      ) : null}
      {notification.type === TopBarNotificationType.INFO ? (
        <>
          <Icon type="INFO_CIRCLED" height={24} width={24} />
          <Typography variant="body" style={{ color: 'var(--white)' }}>
            {notification.text}
          </Typography>
        </>
      ) : null}
      {notification.type === TopBarNotificationType.SUCCESS ? (
        <>
          <Icon type="CHECK_MARK_CIRCLED" height={24} width={24} />
          <Typography variant="body" style={{ color: 'var(--white)' }}>
            {notification.text}
          </Typography>
        </>
      ) : null}
      {notification.clearable ? (
        <Icon
          onClick={() => clear()}
          type="CLOSE_X"
          height={24}
          width={24}
          css={css`
            cursor: pointer;

            path {
              fill: var(--white);
            }
          `}
        />
      ) : null}
    </Bar>
  ) : null
}
