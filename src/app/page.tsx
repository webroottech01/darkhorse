import 'server-only'

import { ResolvingMetadata, Metadata } from 'next'

import HomePage from '../components/pages/HomePage'
import { ProductSort } from '@/types/product'
import productService from '@/api/productService'
import venueService from '@/api/venueService'
import { getMetaData } from '@/utils/meta'
import { RouteName } from '@/utils/route'

export type Props = {
  params: {}
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const venue = await venueService.getById(
    process.env.NEXT_PUBLIC_DISPENSE_VENUE_ID!
  )

  return getMetaData({
    routeName: RouteName.HOME,
    data: {
      venue,
    },
  })
}

export default async function HomePageSSR() {
  const venue = await venueService.getById(
    process.env.NEXT_PUBLIC_DISPENSE_VENUE_ID!
  )
  const productsResponse = await productService.list({
    venueId: venue.id,
    limit: 8,
    sort: ProductSort.TOTAL_SOLD_DESC,
  })

  return <HomePage products={productsResponse.data} />
}
