'server-only'

import { Metadata } from 'next'

import { RouteName } from './route'
import { Product, ProductTypeName, CannabisTypeName } from '@/types/product'
import { Venue } from '@/types/venue'
// import { RouteName } from './route'
// import { getFullVenueUrl } from '@/utils/ssr'
// import { capitalize } from './string'

export const getMetaData = ({
  routeName,
  data,
}: {
  routeName: RouteName
  data: {
    venue: Venue
    product?: Product | null
    productCategoryName?: string
    productBrandName?: string
    productCannabisTypeName?: string
    productTerpeneName?: string
    productEffectName?: string
    productOfferName?: string
  }
}) => {
  // const { baseUrl, fullUrl, pathname } = getFullVenueUrl({
  //   venue: data.venue,
  // })
  const baseUrl = 'https://www.highscore-cannabis.com'
  // const pathname = new URL(window.location.href).pathname
  const pathname = '/'

  let metaData: Metadata = {}

  switch (routeName) {
    case RouteName.HOME:
      metaData = _getMetaData({
        venue: data.venue,
        baseUrl,
        pathname,
        titleTemplateStr: data.venue.seoMenuMetaData?.home?.title ?? '',
        descTemplateStr: data.venue.seoMenuMetaData?.home?.description ?? '',
        data: {
          ...convertVenueToMergeVariables(data.venue),
        },
      })
      break
    case RouteName.PRODUCTS:
    case RouteName.PRODUCT_CATEGORY:
      metaData = _getMetaData({
        venue: data.venue,
        baseUrl,
        pathname,
        titleTemplateStr:
          data.venue.seoMenuMetaData?.productCategory?.title ?? '',
        descTemplateStr:
          data.venue.seoMenuMetaData?.productCategory?.description ?? '',
        data: {
          ...convertVenueToMergeVariables(data.venue),
          ...{
            productCategory: data?.productCategoryName,
          },
        },
      })
      break
    case RouteName.PRODUCT:
      metaData = _getMetaData({
        venue: data.venue,
        baseUrl,
        pathname,
        titleTemplateStr:
          data.venue.seoMenuMetaData?.productDetail?.title ?? '',
        descTemplateStr:
          data.venue.seoMenuMetaData?.productDetail?.description ?? '',
        data: {
          ...convertVenueToMergeVariables(data.venue),
          ...(data?.product
            ? convertProductToMergeVariables(data?.product)
            : {}),
        },
      })
      break
    default:
      metaData = _getMetaData({
        venue: data.venue,
        baseUrl,
        pathname,
        titleTemplateStr: data.venue.seoMenuMetaData?.home?.title ?? '',
        descTemplateStr: data.venue.seoMenuMetaData?.home?.description ?? '',
        data: {
          ...convertVenueToMergeVariables(data.venue),
        },
      })
      break
  }

  return metaData
}

function _getMetaData({
  venue,
  baseUrl,
  pathname,
  titleTemplateStr,
  descTemplateStr,
  data,
}: {
  venue: Venue
  baseUrl: string
  pathname: string
  titleTemplateStr?: string
  descTemplateStr?: string
  data: object
}): Metadata {
  let pageTitle = ''
  let pageDescription = ''

  if (data) {
    pageTitle = convertTemplateString({
      template: titleTemplateStr ?? '',
      data,
    })
    pageDescription = convertTemplateString({
      template: descTemplateStr ?? '',
      data,
    })
  }

  const icons: Metadata['icons'] = []

  if (venue.favicon) {
    icons.push({
      url: venue.favicon,
    })
  }

  return {
    metadataBase: new URL(baseUrl),
    title: pageTitle.replace('undefined', ''), //fixes a flashing of 'undefined' in the title bar while api calls finish
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: 'website',
      url: '/',
      siteName: venue.name,
      images: [
        {
          url: venue.logo ?? '',
          width: 1200,
          height: 630,
          alt: venue.name,
        },
      ],
    },
    alternates: {
      canonical: pathname,
    },
    icons,
  }
}

function convertVenueToMergeVariables(venue: Venue) {
  return {
    storeName: venue.name,
    storeAddress: venue.addressFormatted,
    storeWebsite: venue.website ?? venue.seoMenuUrl,
  }
}

function convertProductToMergeVariables(product: Product) {
  const name = product.weightFormatted
    ? `${product.name} - ${product.weightFormatted}`
    : product.name

  return {
    productName: name,
    productDescription: `${name} - ${product.seoDescription}`,
    productCategory: ProductTypeName[product.type],
    productSubCategory: product.subType,
    productBrand: product.brand?.name,
    productCannabisType: product.cannabisType
      ? CannabisTypeName[product.cannabisType]
      : null,
  }
}

function convertTemplateString({
  template,
  data,
}: {
  template: string
  data: object
}) {
  return Object.entries(data).reduce(
    (res, [key, value]) =>
      res.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), value),
    template
  )
}
