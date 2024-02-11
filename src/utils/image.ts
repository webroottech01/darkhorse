export const imageUrl = (
  url: string,
  options?: {
    height?: number | string
    width?: number | string
    // auto?: string
    // fit?:
    //   | 'clamp'
    //   | 'crop'
    //   | 'clip'
    //   | 'facearea'
    //   | 'fill'
    //   | 'fillmax'
    //   | 'max'
    //   | 'min'
    //   | 'scale'
    // dpr?: string
    // ar?: string
  }
) => {
  options = options ?? {}

  // const params: any = {}

  // if (imgxOptions.fit) params.fit = imgxOptions.fit
  // if (imgxOptions.height) params.h = imgxOptions.height
  // if (imgxOptions.width) params.w = imgxOptions.width
  // if (imgxOptions.dpr) params.dpr = imgxOptions.dpr
  // params.auto = imgxOptions.auto ?? 'format,compress'

  // if (imgxOptions.maxHeight) params['max-h'] = imgxOptions.maxHeight

  let imageUrl: URL

  try {
    imageUrl = new URL(url)
  } catch (error: any) {
    return ''
  }

  // imageUrl.searchParams.append('h', options.height)
  // imageUrl.searchParams.append('h', '100px')
  // imageUrl.searchParams.append('h', '100px')
  // imageUrl.searchParams.append('h', '100px')

  //@ts-ignore
  Object.keys(options).forEach((key: keyof typeof options) => {
    const value = options?.[key]

    let _key: string = key

    if (key === 'height') {
      _key = 'h'
    } else if (key === 'weight') {
      _key = 'w'
    }

    if (value) {
      imageUrl.searchParams.append(_key, value)
    }
  })

  imageUrl.searchParams.append('fit', 'crop')
  imageUrl.searchParams.append('auto', 'format,compress')

  // return imgixClient.buildURL(imageUrl.pathname, params)

  return imageUrl.toString()
}
