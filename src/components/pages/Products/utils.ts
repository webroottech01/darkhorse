import { ProductCategory, Venue, ProductCategoryType } from 'shared'

export const getProductCategoryName = ({
  productCategory,
  productSubCategory,
  venue,
}: {
  productCategory: ProductCategory
  productSubCategory?: string
  venue: Venue
}) => {
  let name: string = ''

  if (productCategory.type === ProductCategoryType.SYSTEM) {
    const productType = (venue.productCategoryConfigs ?? []).find((i) => {
      return i.type === productCategory.filterTypes?.[0]
    })

    name = productType?.name ?? productCategory.name
  } else {
    name = productCategory.name
  }

  return productSubCategory ? `${name} - ${productSubCategory}` : name
}
