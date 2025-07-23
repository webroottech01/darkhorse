import { ListParams } from './constants'
import { DiscountType } from './pricing'

export const ProductDefaultImage =
  'https://imgix.dispenseapp.com/default-image.png'

export type Product = {
  id: string
  name: string
  enable?: boolean
  slug: string
  price: number
  image?: string
  description?: string
  seoDescription?: string
  discountAmount?: number
  discountAmountFinal?: number
  discountValueFinal?: number
  discountTypeFinal?: DiscountType
  brand?: {
    name?: string
    logo?: string
  }
  new?: boolean
  featured?: boolean
  weight?: number
  weightUnit?: ProductWeightUnit
  size?: string
  type: ProductType
  subType?: string
  cannabisType?: CannabisType
  tiers?: ProductTier[]
  variants?: Product[]
  effects?: CannabisEffect[]
  weightFormatted?: string
  priceType: ProductPriceType
  quantity: number
  quantityTotal?: number
  purchaseMax?: number
  labs?: {
    terpenes?: string[]
    potency?: ProductPotencyLevels
    //
    alphaPinene?: number | null
    alphaPineneContentUnit?: CannabisContentUnit | null
    betaCaryophyllene?: number | null
    betaCaryophylleneContentUnit?: CannabisContentUnit | null
    betaEudesmol?: number | null
    betaEudesmoContentUnitl?: number | null
    betaMyrcene?: number | null
    betaMyrceneContentUnit?: CannabisContentUnit | null
    betaPinene?: number | null
    betaPineneContentUnit?: CannabisContentUnit | null
    bisabolol?: number | null
    bisabololContentUnit?: CannabisContentUnit | null
    caryophylleneOxide?: number | null
    caryophylleneOxideContentUnit?: CannabisContentUnit | null
    guaiol?: number | null
    guaiolContentUnit?: CannabisContentUnit | null
    humulene?: number | null
    humuleneContentUnit?: CannabisContentUnit | null
    limonene?: number | null
    limoneneContentUnit?: CannabisContentUnit | null
    linalool?: number | null
    linaloolContentUnit?: CannabisContentUnit | null
    ocimene?: number | null
    ocimeneContentUnit?: CannabisContentUnit | null
    terpinene?: number | null
    terpineneContentUnit?: CannabisContentUnit | null
    terpinolene?: number | null
    terpinoleneContentUnit?: CannabisContentUnit | null
    threeCarene?: number | null
    threeCareneContentUnit?: CannabisContentUnit | null
    transNerolidol?: number | null
    transNerolidolContentUnit?: CannabisContentUnit | null
    //
    thcMax?: number | null
    thc?: number | null
    thcContentUnit?: CannabisContentUnit | null
    thcA?: number | null
    thcAContentUnit?: CannabisContentUnit | null
    cbdMax?: number | null
    cbd?: number | null
    cbdContentUnit?: CannabisContentUnit | null
    cbdA?: number | null
    cbdAContentUnit?: CannabisContentUnit | null
    cbaA?: number | null
    cbaAContentUnit?: CannabisContentUnit | null
    cbn?: number | null
    cbnContentUnit?: CannabisContentUnit | null
    cbg?: number | null
    cbgContentUnit?: CannabisContentUnit | null
  }
}

export type ProductsResponse = {
  data: Product[]
  count: number
  pageCount: number
}

export type ProductTier = {
  id: string
  price: number
  weight?: number
  weightUnit?: ProductWeightUnit
  weightFormatted?: string
  quantityAvailable?: number
  purchaseQuantity?: number
  discountValue?: number
  discountAmount?: number
  discountAmountFinal?: number
  discountValueFinal?: number
  discountTypeFinal?: DiscountType
}

export enum ProductType {
  FLOWER = 'FLOWER',
  PRE_ROLLS = 'PRE_ROLLS',
  VAPORIZERS = 'VAPORIZERS',
  CONCENTRATES = 'CONCENTRATES',
  EDIBLES = 'EDIBLES',
  TINCTURES = 'TINCTURES',
  TOPICALS = 'TOPICALS',
  ACCESSORIES = 'ACCESSORIES',
  BEVERAGES = 'BEVERAGES',
  MERCHANDISE = 'MERCHANDISE',
}

export enum ProductTypeImage {
  FLOWER = 'cat-images/hs-flower.png',
  PRE_ROLLS = 'cat-images/hs-prerolls.png',
  VAPORIZERS = 'cat-images/hs-vapes.png',
  CONCENTRATES = 'cat-images/hs-concentrates.png',
  EDIBLES = 'cat-images/hs-edibles.png',
  TINCTURES = 'cat-images/hs-tinctures.png',
  TOPICALS = 'cat-images/hs-topicals.png',
  ACCESSORIES = 'cat-images/hs-accessories.png',
  BEVERAGES = 'cat-images/hs-beverages.png',
  MERCHANDISE = 'cat-images/hs-merch.png',
}

export enum ProductWeightUnit {
  GRAMS = 'GRAMS',
  MILLIGRAMS = 'MILLIGRAMS',
  OUNCES = 'OUNCES',
  UNKNOWN = 'UNKNOWN',
  EACH = 'EACH',
}

export enum ProductPriceType {
  REGULAR = 'REGULAR',
  WEIGHT_TIER = 'WEIGHT_TIER', //deli style
  PRICE_TIER = 'PRICE_TIER', //price breaks
}

export enum ProductPotencyLevels {
  MILD = 'MILD',
  MEDIUM = 'MEDIUM',
  STRONG = 'STRONG',
}

export enum CannabisType {
  INDICA = 'INDICA',
  SATIVA = 'SATIVA',
  HYBRID = 'HYBRID',
  HYBRID_SATIVA = 'HYBRID_SATIVA',
  HYBRID_INDICA = 'HYBRID_INDICA',
  CBD = 'CBD',
  NA = 'NA',
  MIXED = 'MIXED',
}

export enum CannabisTypeName {
  INDICA = 'Indica',
  HYBRID_INDICA = 'Indica Hybrid',
  SATIVA = 'Sativa',
  HYBRID_SATIVA = 'Sativa Hybrid',
  HYBRID = 'Hybrid',
  CBD = 'CBD',
  NA = 'N/A',
  MIXED = 'Mixed',
}

export enum CannabisEffect {
  FOCUSED = 'focused',
  INSPIRED = 'inspired',
  CREATIVE = 'creative',
  ENERGIZED = 'energized',
  HAPPY = 'happy',
  RELAXED = 'relaxed',
  SLEEPY = 'sleepy',
  PAIN_RELIEF = 'pain-relief',
  NOT_HIGH = 'not-high',
  HUNGRY = 'hungry',
  ANXIOUS = 'anxious',
}

export enum ProductSort {
  NAME_ASC = 'name',
  NAME_DESC = '-name',
  PRICE_ASC = 'price',
  PRICE_DESC = '-price',
  BRAND_ASC = 'brand',
  BRAND_DESC = '-brand',
  TYPE_ASC = 'type',
  TYPE_DESC = '-type',
  TOTAL_SOLD_ASC = 'totalSold',
  TOTAL_SOLD_DESC = '-totalSold',
  QUANTITY_ASC = 'quantity',
  QUANTITY_DESC = '-quantity',
  WEIGHT_ASC = 'weight',
  WEIGHT_DESC = '-weight',
  CANNABIS_TYPE_ASC = 'cannabisType',
  CANNABIS_TYPE_DESC = '-cannabisType',
  SCORE_ASC = 'score',
  SCORE_DESC = '-score',
  CREATED_ASC = 'created',
  CREATED_DESC = '-created',
  ORDER_ID_ASC = 'orderId',
  ORDER_ID_DESC = '-orderId',
}

export enum ProductTypeName {
  FLOWER = 'Flower',
  VAPORIZERS = 'Vaporizers',
  PRE_ROLLS = 'Pre Rolls',
  CONCENTRATES = 'Concentrates',
  EDIBLES = 'Edibles',
  TOPICALS = 'Topicals',
  TINCTURES = 'Tinctures',
  ACCESSORIES = 'Accessories',
  BEVERAGES = 'Beverages',
  MERCHANDISE = 'Merchandise',
}

export enum CannabisEffectName {
  FOCUSED = 'Focused',
  INSPIRED = 'Inspired',
  CREATIVE = 'Creative',
  ENERGIZED = 'Energized',
  HAPPY = 'Happy',
  RELAXED = 'Relaxed',
  SLEEPY = 'Sleepy',
  PAIN_RELIEF = 'Pain Relief',
  NOT_HIGH = 'Not High',
  HUNGRY = 'Hungry',
  ANXIOUS = 'Anxious',
}

export type TerpeneIcon =
  | 'ALPHAPINENE'
  | 'BETACARYOPHYLLENE'
  | 'BETAEUDESMOL'
  | 'BETAMYRCENE'
  | 'BETAPINENE'
  | 'BISABOLOL'
  | 'CARYOPHYLLENEOXIDE'
  | 'GUAIOL'
  | 'HUMULENE'
  | 'LIMONENE'
  | 'LINALOOL'
  | 'OCIMENE'
  | 'TERPINENE'
  | 'TERPINOLENE'
  | 'THREECARENE'
  | 'TRANSNEROLIDOL'

export type TerpeneStrength = {
  name: string
  relativeValue: number
  value: number
  context: string
  iconName: TerpeneIcon
  contentUnit: 'px' | 'em' | 'rem' | '%' | 'vw' | 'vh'
}

export enum TerpeneType {
  ALPHAPINENE = 'ALPHAPINENE',
  BETACARYOPHYLLENE = 'BETACARYOPHYLLENE',
  BETAEUDESMOL = 'BETAEUDESMOL',
  BETAMYRCENE = 'BETAMYRCENE',
  BETAPINENE = 'BETAPINENE',
  BISABOLOL = 'BISABOLOL',
  CARYOPHYLLENEOXIDE = 'CARYOPHYLLENEOXIDE',
  GUAIOL = 'GUAIOL',
  HUMULENE = 'HUMULENE',
  LIMONENE = 'LIMONENE',
  LINALOOL = 'LINALOOL',
  OCIMENE = 'OCIMENE',
  TERPINENE = 'TERPINENE',
  TERPINOLENE = 'TERPINOLENE',
  THREECARENE = 'THREECARENE',
  TRANSNEROLIDOL = 'TRANSNEROLIDOL',
}

export enum TerpeneName {
  ALPHAPINENE = 'Alpha Pinene',
  BETACARYOPHYLLENE = 'Beta Caryophyllene',
  BETAEUDESMOL = 'Beta Eudesmol',
  BETAMYRCENE = 'Beta Myrcene',
  BETAPINENE = 'Beta Pinene',
  BISABOLOL = 'Bisabolol',
  CARYOPHYLLENEOXIDE = 'Caryophyllene Oxide',
  CBG = 'CBG',
  CBN = 'CBN',
  GUAIOL = 'Guaiol',
  HUMULENE = 'Humulene',
  LIMONENE = 'Limonene',
  LINALOOL = 'Linalool',
  OCIMENE = 'Ocimene',
  TERPINENE = 'Terpinene',
  TERPINOLENE = 'Terpinolene',
  THREECARENE = '3-Carene',
  TRANSNEROLIDOL = 'Trans-Nerolidol',
}

export enum CannabinoidType {
  THC = 'THC',
  THC_A = 'THC_A',
  CBD = 'CBD',
  CBD_A = 'CBD_A',
  CBN = 'CBN',
  CBG = 'CBG',
}

export enum CannabinoidTypeName {
  THC = 'THC9',
  THC_A = 'THCa',
  CBD = 'CBD',
  CBD_A = 'CBDa',
  CBN = 'CBN',
  CBG = 'CBG',
}

export enum CannabisContentUnit {
  PERCENTAGE = '%',
  MILLIGRAMS = 'mg',
  MG_PER_GRAM = 'mg/g',
}

export type ProductCannabinoids = {
  thcMax?: number | null
  thc?: number | null
  thcContentUnit?: CannabisContentUnit | null
  thcA?: number | null
  thcAContentUnit?: CannabisContentUnit | null
  cbdMax?: number | null
  cbd?: number | null
  cbdContentUnit?: CannabisContentUnit | null
  cbdA?: number | null
  cbdAContentUnit?: CannabisContentUnit | null
  cbaA?: number | null
  cbaAContentUnit?: CannabisContentUnit | null
  cbn?: number | null
  cbnContentUnit?: CannabisContentUnit | null
  cbg?: number | null
  cbgContentUnit?: CannabisContentUnit | null
}

export enum ProductCannabinoid {
  THC = 'thc',
  THC_A = 'thcA',
  CBD = 'cbd',
  CBD_A = 'cbdA',
  CBN = 'cbn',
  CBG = 'cbg',
}

export const cannabinoids: Array<keyof ProductCannabinoids> = [
  'thc',
  'thcA',
  'cbd',
  'cbdA',
  'cbn',
  'cbg',
]

export enum ProductPriceTypeName {
  REGULAR = 'Regular',
  WEIGHT_TIER = 'Weight Tier (aka Deli Style)',
  PRICE_TIER = 'Price Tier (aka Price Breaks)',
}

export enum TerpenesContext {
  alphaPinene = 'Pine: Energy, alertness',
  betaCaryophyllene = 'Pepper: Anti-inflammation, sleepy',
  betaEudesmol = 'Woody: Appetite stimulator',
  betaMyrcene = 'Herbal: Relaxing',
  betaPinene = 'Pine: Anti-depressant, alertness',
  bisabolol = 'Flower: Relaxing',
  caryophylleneOxide = 'Spice: Anti-inflammatory',
  guaiol = 'Pine: Focus, anti-anxiety',
  humulene = 'Hoppy: Appetite suppressor',
  limonene = 'Citrus: Elevated mood, anti-anxiety',
  linalool = 'Floral: Calming',
  ocimene = 'Mint: Uplifting',
  terpinene = 'Citrus: Antioxidant',
  terpinolene = 'Fruit: Sleepy',
  threeCarene = 'Sweet: Mental focus, anti-inflammation',
  transNerolidol = 'Berry: Relaxing, anti-insomnia',
}

export enum TerpeneToContentUnit {
  alphaPinene = 'alphaPineneContentUnit',
  betaCaryophyllene = 'betaCaryophylleneContentUnit',
  betaEudesmol = 'betaEudesmolContentUnit',
  betaMyrcene = 'betaMyrceneContentUnit',
  betaPinene = 'betaPineneContentUnit',
  bisabolol = 'bisabololContentUnit',
  caryophylleneOxide = 'caryophylleneOxideContentUnit',
  guaiol = 'guaiolContentUnit',
  humulene = 'humuleneContentUnit',
  limonene = 'limoneneContentUnit',
  linalool = 'linaloolContentUnit',
  ocimene = 'ocimeneContentUnit',
  terpinene = 'terpineneContentUnit',
  terpinolene = 'terpinoleneContentUnit',
  threeCarene = 'threeCareneContentUnit',
  transNerolidol = 'transNerolidolContentUnit',
}

// export type TerpeneStrength = {
//   name: string
//   relativeValue: number
//   value: number
//   context: string
//   iconName: TerpeneIcon
//   contentUnit: 'px' | 'em' | 'rem' | '%' | 'vw' | 'vh'
// }

export type ProductTerpenes = {
  alphaPinene?: number | null
  betaCaryophyllene?: number | null
  betaEudesmol?: number | null
  betaMyrcene?: number | null
  betaPinene?: number | null
  bisabolol?: number | null
  caryophylleneOxide?: number | null
  guaiol?: number | null
  humulene?: number | null
  limonene?: number | null
  linalool?: number | null
  ocimene?: number | null
  terpinene?: number | null
  terpinolene?: number | null
  threeCarene?: number | null
  transNerolidol?: number | null
}

export const terpenes: Array<keyof ProductTerpenes> = [
  'alphaPinene',
  'betaCaryophyllene',
  'betaEudesmol',
  'betaMyrcene',
  'betaPinene',
  'bisabolol',
  'caryophylleneOxide',
  'guaiol',
  'humulene',
  'limonene',
  'linalool',
  'ocimene',
  'terpinene',
  'terpinolene',
  'threeCarene',
  'transNerolidol',
]

//queries
export type ListProductsParams = {
  venueId: string
  sort?: ProductSort
  type?: ProductType | ProductType[]
  subType?: string | string[]
  cannabisType?: CannabisType | CannabisType[]
  brand?: string | string[]
  effects?: CannabisEffect | CannabisEffect[]
  enable?: boolean
  active?: boolean
  featured?: boolean
  new?: boolean
  group?: boolean
  quantityMin?: number
  quantityMax?: number
  discounted?: boolean
  weightFormatted?: string
} & ListParams
