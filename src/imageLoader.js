export default function imgixLoader({ src, width, quality }) {
  // return `https://dispense-images.imgix.net/${src}?w=${width}&q=${quality || 75}`
  const url = new URL(src)
  const params = url.searchParams
  params.set('auto', params.getAll('auto').join(',') || 'format,compress')
  params.set('fit', params.get('fit') || 'max')
  params.set('w', params.get('w') || width.toString())
  params.set('q', (quality || 50).toString())
  return url.href
}
