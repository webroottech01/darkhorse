import 'server-only'

import { ResolvingMetadata, Metadata } from 'next'

import { getVenueById } from '@/api/venueService'
import { listProducts } from '@/api/productService'
import HomePage from '../components/pages/HomePage'

export type Props = {
  params: {}
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const venue = await getVenueById(process.env.NEXT_PUBLIC_VENUE_ID!)

  return {
    title: venue.name,
    //@ts-ignore
    icons: [
      venue.favicon
        ? {
            url: venue.favicon,
          }
        : undefined,
    ].filter(Boolean),
  }
}

export default async function Home() {
  const venue = await getVenueById(process.env.NEXT_PUBLIC_VENUE_ID!)
  const productsResponse = await listProducts({
    venueId: venue.id,
    limit: 10,
  })

  return <HomePage products={productsResponse.data} />
}
