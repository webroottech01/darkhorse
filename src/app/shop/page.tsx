import venueService from '@/api/venueService'
import ProductsPage from '@/components/pages/Products/ProductsPage'
import { getMetaData } from '@/utils/meta'
import { RouteName } from '@/utils/route'
import { capitalize } from '@/utils/string'
import { ResolvingMetadata, Metadata } from 'next'

type Props = {
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
    routeName: RouteName.PRODUCTS,
    data: {
      venue,
    },
  })
}

export default function ShopPageSSR() {
  return <ProductsPage />
}
