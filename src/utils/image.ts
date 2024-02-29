export const imageUrl = (
  url: string,
  options?: {
    height?: number | string
    width?: number | string
    quality?: number
  }
) => {
  options = options ?? {}

  let imageUrl: URL

  try {
    imageUrl = new URL(url)
  } catch (error: any) {
    return ''
  }

  const params = imageUrl.searchParams
  params.set('auto', params.getAll('auto').join(',') || 'format,compress')
  params.set('fit', params.get('fit') || 'max')
  if (options.width) params.set('w', options.width.toString())
  if (options.height) params.set('h', options.height.toString())
  params.set('q', (options?.quality || 50).toString())
  return imageUrl.href
}
