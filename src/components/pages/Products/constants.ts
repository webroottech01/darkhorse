export enum ProductsSort {
  POPULAR = 'POPULAR',
  TOP_RATED = 'TOP_RATED',
  NAME = 'NAME',
  TYPE = 'TYPE',
  BRAND = 'BRAND',
  NEW = 'NEW',
  WEIGHT = 'WEIGHT',
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
  THC_POTENCY_HIGH_TO_LOW = 'THC_POTENCY_HIGH_TO_LOW',
  THC_POTENCY_LOW_TO_HIGH = 'THC_POTENCY_LOW_TO_HIGH',
  CBD_POTENCY_HIGH_TO_LOW = 'CBD_POTENCY_HIGH_TO_LOW',
  CBD_POTENCY_LOW_TO_HIGH = 'CBD_POTENCY_LOW_TO_HIGH',
  CANNABIS_TYPE = 'CANNABIS_TYPE',
}

export enum ProductsSortName {
  POPULAR = 'Popular',
  TOP_RATED = 'Top Rated',
  NAME = 'Name',
  TYPE = 'Category',
  BRAND = 'Brand',
  NEW = 'New',
  WEIGHT = 'Weight',
  CANNABIS_TYPE = 'Cannabis Type',
  PRICE_LOW_TO_HIGH = 'Price: Low to High',
  PRICE_HIGH_TO_LOW = 'Price: High to Low',
  THC_POTENCY_HIGH_TO_LOW = 'THC: High to Low',
  THC_POTENCY_LOW_TO_HIGH = 'THC: Low to High',
  CBD_POTENCY_HIGH_TO_LOW = 'CBD: High to Low',
  CBD_POTENCY_LOW_TO_HIGH = 'CBD: Low to High',
}

export const productsSortKey: {
  [key in ProductsSort]: string
} = {
  [ProductsSort.POPULAR]: '-totalQuantitySold',
  [ProductsSort.TOP_RATED]: '-reviewStats.averageRating',
  [ProductsSort.NAME]: 'name',
  [ProductsSort.TYPE]: 'type',
  [ProductsSort.NEW]: 'new',
  [ProductsSort.WEIGHT]: 'weightFormatted',
  [ProductsSort.BRAND]: 'brand.name',
  [ProductsSort.PRICE_LOW_TO_HIGH]: 'price',
  [ProductsSort.PRICE_HIGH_TO_LOW]: '-price',
  [ProductsSort.THC_POTENCY_HIGH_TO_LOW]: '-labs.thcMax',
  [ProductsSort.THC_POTENCY_LOW_TO_HIGH]: 'labs.thcMax',
  [ProductsSort.CBD_POTENCY_HIGH_TO_LOW]: '-labs.cbdMax',
  [ProductsSort.CBD_POTENCY_LOW_TO_HIGH]: 'labs.cbdMax',
  [ProductsSort.CANNABIS_TYPE]: 'cannabisType',
}
