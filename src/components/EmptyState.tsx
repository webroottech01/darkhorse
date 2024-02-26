'use client'

import React, { ReactNode } from 'react'

import Icon from './Icon'
import Typography from './Typography'

type EmptyStateProps = { children?: ReactNode }

export default function EmptyState({ children }: EmptyStateProps) {
  return (
    <>
      <Icon type="EMPTY_STATE" height="150" width="150" viewBox="0 0 100 100" />
      <Typography variant="h2" css="color: var(--gray);">
        {children ?? 'Nothing here'}
      </Typography>
    </>
  )
}
