'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { css } from 'styled-components'

import useSearchParams from '@/hooks/useSearchParams'
import Link from 'next/link'
import Icon from './Icon'
import Typography from './Typography'

const linkStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

type BackLinkProps = {
  children?: React.ReactNode
  href?: string
  query?: Record<string, unknown>
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

export default function BackLink({
  href,
  query,
  onClick,
  children,
}: BackLinkProps) {
  const searchParams = useSearchParams<{
    back?: string
  }>()
  const props: any = {}
  const router = useRouter()

  if (!!href) {
    props.href = href
  } else if (searchParams.back) {
    props.href = searchParams.back
  } else if (onClick) {
    props.href = '#'
    props.onClick = onClick
  } else {
    props.onClick = () => {
      router.back()
    }
  }

  props.href = props.href ?? '#'

  return (
    <Link {...props} query={query} css={linkStyles}>
      <Icon
        width={15}
        height={15}
        type="ARROW_BACK"
        color="var(--brand-primary)"
      />
      <Typography variant="link">{children ?? 'Back'}</Typography>
    </Link>
  )
}
