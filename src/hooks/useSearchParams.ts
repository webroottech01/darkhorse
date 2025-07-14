'use client'

import { useSearchParams as useNextSearchParams } from 'next/navigation'
import React from 'react'

export default function useSearchParams<T extends { [key: string]: any }>() {
  const nextSearchParams = useNextSearchParams()
  // convert to plain URLSearchParams
  const urlSearchParams = new URLSearchParams(nextSearchParams.toString())

  const [searchParams, setSearchParams] = React.useState<Record<string, any>>(
    convertNextParams(urlSearchParams)
  )

  React.useEffect(() => {
    const outputParams: Record<string, any> = convertNextParams(
      new URLSearchParams(nextSearchParams.toString())
    )
    setSearchParams(outputParams)
  }, [nextSearchParams])

  return searchParams as T
}

// nextjs search params are Record<string, string>
// but we need array values to be arrays
function convertNextParams(nextSearchParams: URLSearchParams) {
  const params = nextSearchParams?.entries()
    ? Object.fromEntries(nextSearchParams?.entries())
    : {}
  const outputParams: Record<string, any> = {}

  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (value && value.indexOf(',') > -1) {
      outputParams[key] = value.split(',').map((v) => v.replace(/[\[\]']+/g, ''))
    } else {
      outputParams[key] = value.replace(/[\[\]']+/g, '')
    }
  })

  return outputParams
}
