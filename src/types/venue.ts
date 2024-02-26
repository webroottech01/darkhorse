export type Venue = {
  id: string
  name: string
  logo?: string
  logoSquare?: string
  favicon?: string
  addressFormatted?: string
  website?: string
  seoMenuUrl?: string
  currencyCode?: string
  languageCode?: string
  seoMenuMetaData?: {
    home?: {
      title?: string
      description?: string
    }
    productCategory?: {
      title?: string
      description?: string
    }
    productBrand?: {
      title?: string
      description?: string
    }
    productDetail?: {
      title?: string
      description?: string
    }
    productOffer?: {
      title?: string
      description?: string
    }
    productCannabisType?: {
      title?: string
      description?: string
    }
    productEffect?: {
      title?: string
      description?: string
    }
    productTerpene?: {
      title?: string
      description?: string
    }
  }
}
