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
}: {
  type?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  params?: Record<string, string>
}): Promise<T> {
  const fullUrl = joinUrl(baseUrl, path)

  const res = await fetch(
    !!params ? fullUrl + '?' + new URLSearchParams(params) : fullUrl,
    {
      method: type ?? 'GET',
      headers: {
        'x-dispense-api-key': '4e098e6b-8e87-459f-bae4-84101618caff',
      },
    }
  )

  return res.json()
}
