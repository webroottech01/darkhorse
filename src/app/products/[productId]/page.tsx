import { ResolvingMetadata, Metadata } from 'next'

import { getProductById } from '@/api/productService'
import { getVenueById } from '@/api/venueService'
import ProductPageComponent from '@/components/pages/ProductPage'

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
  const venue = await getVenueById(process.env.NEXT_PUBLIC_VENUE_ID!)
  const product = await getProductById(params.productId, {
    venueId: venue.id,
  })

  return {
    title: `Buy ${product.name} at ${venue.name}`,
  }
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string }
}) {
  const venue = await getVenueById(process.env.NEXT_PUBLIC_VENUE_ID!)
  const product = await getProductById(params.productId, {
    venueId: venue.id,
  })

  return <ProductPageComponent product={product}></ProductPageComponent>
}
