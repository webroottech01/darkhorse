import ImgixClient from 'imgix-core-js'

const imgixClient = new ImgixClient({
  domain: 'dispense-images.imgix.net',
  useHTTPS: true,
})

export const imageUrl = (
  url: string,
  imgxOptions?: {
    height?: number | string
    maxHeight?: number | string
    width?: number | string
    auto?: string
    fit?:
      | 'clamp'
      | 'crop'
      | 'clip'
      | 'facearea'
      | 'fill'
      | 'fillmax'
      | 'max'
      | 'min'
      | 'scale'
    dpr?: string
    ar?: string
  }
) => {
  imgxOptions = imgxOptions || {}

  const params: any = {}

  if (imgxOptions.fit) params.fit = imgxOptions.fit
  if (imgxOptions.height) params.h = imgxOptions.height
  if (imgxOptions.width) params.w = imgxOptions.width
  if (imgxOptions.dpr) params.dpr = imgxOptions.dpr
  params.auto = imgxOptions.auto ?? 'format,compress'

  if (imgxOptions.maxHeight) params['max-h'] = imgxOptions.maxHeight

  const _url = new URL(url)

  return imgixClient.buildURL(_url.pathname, params)
}
