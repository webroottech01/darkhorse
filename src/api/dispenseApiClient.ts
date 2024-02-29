import DispenseError from './dispenseError'

type RequestMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH'

export type RequestOptions = Pick<RequestInit, 'signal'> & {
  next?: {
    revalidate?: number
    tags?: string[]
  }
}

type RequestConfig = Omit<RequestInit, 'body'> & {
  headers?: Headers
  method: RequestMethod
  params?: Record<string, any>
  body?: Record<string, any>
} & RequestOptions

export async function request<T extends any>({
  method,
  path,
  options,
}: {
  method: RequestMethod
  path: string | URL
  options?: Omit<RequestConfig, 'method'>
}): Promise<T> {
  options = options ?? {}

  const url = new URL(
    joinUrl(
      process.env.NEXT_PUBLIC_DISPENSE_BASE_URL!,
      (path as URL)?.toString() ?? path
    )
  )

  console.log('URL', url.toString())

  Object.keys(options.params ?? {}).forEach((key) => {
    const value = options?.params?.[key]

    if (value) {
      if (Array.isArray(value)) {
        value.forEach((subValue) => {
          url.searchParams.append(key, subValue)
        })
      } else {
        url.searchParams.append(key, `${value}`)
      }
    }
  })

  const headers = new Headers(options.headers)
  headers.append('content-type', 'application/json')
  headers.append(
    'x-dispense-api-key',
    process.env.NEXT_PUBLIC_DISPENSE_API_KEY!
  )

  const config: {
    headers: Headers
    method: RequestMethod
  } = { ...options, headers, method }

  let body = undefined

  if (options.body) {
    body = JSON.stringify(options.body)
  }

  const response = await fetch(url, {
    ...config,
    body,
  })

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Too many requests, please try again later.')
    }

    const responseBody = await response.json()

    throw new Error(getErrorFromApiResponse(responseBody))
  }

  if (!response.ok) {
    const responseBody = await response.json()

    throw new DispenseError(
      getErrorFromApiResponse(responseBody)?.message ?? 'Error',
      response.status
    )
  }

  const responseBody = response.status === 204 ? {} : await response.json()

  return responseBody as Promise<T>
}

function getErrorFromApiResponse(response: any) {
  if (!response) return null

  console.log(response)

  if (response.errors && response.errors.length)
    return response.errors[0].message || response.errors[0]

  return 'Error'
}

function joinUrl(...parts: string[]): string {
  return parts
    .map((p) => {
      if (!p) return ''
      return p.replace(/(^\/|\/$)/g, '')
    })
    .join('/')
}
