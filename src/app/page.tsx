import 'server-only'

import { ResolvingMetadata, Metadata } from 'next'

import HomePage from '../components/pages/HomePage'
import dispense from '@/utils/dispense'

export type Props = {
  params: {}
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const venue = await dispense.getVenueById(
    process.env.NEXT_PUBLIC_DISPENSE_VENUE_ID!
  )

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

export default async function HomePageSSR() {
  const venue = await dispense.getVenueById(
    process.env.NEXT_PUBLIC_DISPENSE_VENUE_ID!
  )
  const productsResponse = await dispense.listProducts({
    venueId: venue.id,
    limit: 10,
  })

  return <HomePage products={productsResponse.data} />
}
