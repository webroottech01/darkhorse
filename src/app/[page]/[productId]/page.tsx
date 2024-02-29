import { ResolvingMetadata, Metadata } from 'next'

import ProductPage from '@/components/pages/ProductPage'
import productService from '@/api/productService'
import venueService from '@/api/venueService'
import { getMetaData } from '@/utils/meta'
import { RouteName } from '@/utils/route'

export type Props = {
  params: {
    productId: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const venue = await venueService.getById(
    process.env.NEXT_PUBLIC_DISPENSE_VENUE_ID!
  )
  const product = await productService.getById({
    id: params.productId,
    venueId: venue.id,
  })

  return getMetaData({
    routeName: RouteName.PRODUCT,
    data: {
      venue,
      product,
    },
  })
}

export default async function ProductPageSSR({
  params,
}: {
  params: { productId: string }
}) {
  const venue = await venueService.getById(
    process.env.NEXT_PUBLIC_DISPENSE_VENUE_ID!
  )
  const product = await productService.getById({
    id: params.productId,
    venueId: venue.id,
  })

  return <ProductPage product={product} />
}
