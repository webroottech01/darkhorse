import { ResolvingMetadata, Metadata } from 'next'

import venueService from '@/api/venueService'
import ProductsPage from '@/components/pages/Products/ProductsPage'
import { ProductType } from '@/types/product'
import { getMetaData } from '@/utils/meta'
import { RouteName } from '@/utils/route'
import { capitalize } from '@/utils/string'

type Props = {
  params: {
    category: string
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
    routeName: RouteName.PRODUCT_CATEGORY,
    data: {
      venue,
      productCategoryName: capitalize(params.category),
    },
  })
}

export default function ShopCategoryPageSSR({ params }: Props) {
  return (
    <ProductsPage category={params.category.toUpperCase() as ProductType} />
  )
}
