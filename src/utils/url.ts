export const addQueryStringParams = (
  str: string,
  params: Record<string, any>
) => {
  const strParts = (str ?? '').split('?')
  str = strParts[0]

  if (strParts.length > 1) {
    params = {
      ...params,
      ...Object.fromEntries(new URLSearchParams(strParts[1])),
    }
  }

  const out: string[] = []

  Object.keys(params).forEach((key) => {
    const value = `${params[key]}`

    if (
      value !== 'null' &&
      value !== null &&
      value !== 'undefined' &&
      value !== undefined &&
      value.trim &&
      value.trim() !== ''
    ) {
      out.push(`${key}=${encodeURIComponent(value)}`)
    } else if (Array.isArray(value)) {
      value.forEach((v) => {
        if (
          v !== 'null' &&
          v !== null &&
          value !== 'undefined' &&
          v !== undefined &&
          v.trim &&
          v.trim() !== ''
        ) {
          out.push(`${key}=${encodeURIComponent(v)}`)
        }
      })
    }
  })

  const result = out.length > 0 ? `${str}?${out.join('&')}` : str

  return result
}

export const removeNilQueryParams = (
  searchParams: Record<string, unknown>
): Record<string, unknown> => {
  //react-query won't remove URL params unless you pass the key with undefined
  //
  return Object.fromEntries(
    Object.keys(searchParams).map((k) => [k, undefined])
  )
}
