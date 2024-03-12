import { ResolvingMetadata, Metadata } from 'next'

import ProductPage from '@/components/pages/ProductPage'
import productService from '@/api/productService'
import venueService from '@/api/venueService'
import { getMetaData } from '@/utils/meta'
import { RouteName } from '@/utils/route'
import CheckoutPage from '@/components/pages/CheckoutPage'

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

  return getMetaData({
    routeName: RouteName.CHECKOUT,
    data: {
      venue,
    },
  })
}

export default async function CheckoutPageSSR({
  params,
}: {
  params: { productId: string }
}) {
  return <CheckoutPage />
}
