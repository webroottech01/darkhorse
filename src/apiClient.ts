const baseUrl = 'http://localhost:3030/2023-03'

function joinUrl(...parts: string[]): string {
  return parts
    .map((p) => {
      return p.replace(/(^\/|\/$)/g, '')
    })
    .join('/')
}

export async function request<T extends object>({
  type,
  path,
  params,
  body,
}: {
  type?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  params?: Record<string, string>
  body?: Record<string, any>
}): Promise<T> {
  const fullUrl = joinUrl(baseUrl, path)

  const response = await fetch(
    !!params && Object.keys(params).length
      ? fullUrl + '?' + new URLSearchParams(params)
      : fullUrl,
    {
      method: type ?? 'GET',
      headers: {
        'x-dispense-api-key': process.env.API_KEY!,
        'content-type': 'application/json',
      },
      body: !!body ? JSON.stringify(body) : undefined,
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
