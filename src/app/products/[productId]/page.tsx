import { ResolvingMetadata, Metadata } from 'next'

import ProductPageComponent from '@/components/pages/ProductPage'
import productService from '@/api/productService'
import venueService from '@/api/venueService'

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

  return {
    title: `Buy ${product.name} at ${venue.name}`,
  }
}

export default async function ProductPage({
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

  return <ProductPageComponent product={product}></ProductPageComponent>
}
