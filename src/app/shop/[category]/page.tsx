import ProductsPage from '@/components/pages/Products/ProductsPage'
import { ProductType } from '@/types/product'

type Props = {
  params: {
    category: string
  }
}

export default function ShopCategoryPageSSR({ params }: Props) {
  return (
    <ProductsPage category={params.category.toUpperCase() as ProductType} />
  )
}
