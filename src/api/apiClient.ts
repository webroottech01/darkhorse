function joinUrl(...parts: string[]): string {
  return parts
    .map((p) => {
      if (!p) return ''
      return p.replace(/(^\/|\/$)/g, '')
    })
    .join('/')
}

export async function request<T extends any>({
  type,
  path,
  params,
  body,
  json,
}: {
  type?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  params?: Record<
    string,
    string | boolean | string[] | undefined | null | number
  >
  body?: Record<string, any>
  json?: boolean
}): Promise<T> {
  const fullUrl = joinUrl(process.env.NEXT_PUBLIC_DISPENSE_BASE_URL!, path)

  const urlParams = new URLSearchParams()

  if (params) {
    Object.keys(params).forEach((key) => {
      urlParams.append(key, params[key] as string)
    })
  }

  const response = await fetch(
    !!params && Object.keys(params).length
      ? fullUrl + '?' + urlParams
      : fullUrl,
    {
      method: type ?? 'GET',
      headers: {
        'x-dispense-api-key': process.env.NEXT_PUBLIC_API_KEY!,
        'content-type': 'application/json',
      },
      body: !!body ? JSON.stringify(body) : undefined,
      cache: 'force-cache',
    }
  )

  if (!response.ok) {
    //TODO: would need some way for each app to hook into this
    // if (response.status === 401) {
    //   return handleUnauthorizedError() as never
    // }
    if (response.status === 429) {
      throw new Error('Too many requests, please try again later.')
    }

    const responseBody = await response.json()

    throw new Error(getErrorFromApiResponse(responseBody))
  }

  if (json) {
    return (await response.text()) as T
  }

  const responseBody = response.status === 204 ? {} : await response.json()

  return responseBody as T
}

function getErrorFromApiResponse(response: any) {
  if (!response) return null

  console.log(response)

  if (response.errors && response.errors.length)
    return response.errors[0].message || response.errors[0]

  return 'Error'
}
