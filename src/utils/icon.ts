import { IconType } from '@/components/Icon'
import { CannabisType, ProductType, TerpeneType } from '@/types/product'

export const cannabisTypeToIconType: {
  [key in CannabisType]: IconType | null
} = {
  [CannabisType.SATIVA]: 'CANNABIS_SATIVA',
  [CannabisType.HYBRID_SATIVA]: 'CANNABIS_SATIVA_HYBRID',
  [CannabisType.INDICA]: 'CANNABIS_INDICA',
  [CannabisType.HYBRID_INDICA]: 'CANNABIS_INDICA_HYBRID',
  [CannabisType.HYBRID]: 'CANNABIS_HYBRID',
  [CannabisType.CBD]: 'CANNABIS_CBD',
  [CannabisType.NA]: null,
  [CannabisType.MIXED]: 'CANNABIS_MIXED',
}

export const productTypeToIconType: {
  [key in ProductType]: IconType
} = {
  [ProductType.FLOWER]: 'PRODUCT_FLOWER',
  [ProductType.PRE_ROLLS]: 'PRODUCT_PREROLL',
  [ProductType.VAPORIZERS]: 'PRODUCT_VAPORIZER',
  [ProductType.EDIBLES]: 'PRODUCT_EDIBLE',
  [ProductType.TINCTURES]: 'PRODUCT_TINCTURE',
  [ProductType.CONCENTRATES]: 'PRODUCT_CONCENTRATE',
  [ProductType.TOPICALS]: 'PRODUCT_TOPICAL',
  [ProductType.ACCESSORIES]: 'PRODUCT_ACCESSORY',
  [ProductType.BEVERAGES]: 'PRODUCT_BEVERAGES',
  [ProductType.MERCHANDISE]: 'PRODUCT_MERCHANDISE',
}

export const terpeneTypeToIconType: {
  [key in TerpeneType]: IconType
} = {
  [TerpeneType.ALPHAPINENE]: 'ALPHAPINENE',
  [TerpeneType.BETACARYOPHYLLENE]: 'BETACARYOPHYLLENE',
  [TerpeneType.BETAEUDESMOL]: 'BETAEUDESMOL',
  [TerpeneType.BETAMYRCENE]: 'BETAMYRCENE',
  [TerpeneType.BETAPINENE]: 'BETAPINENE',
  [TerpeneType.BISABOLOL]: 'BISABOLOL',
  [TerpeneType.CARYOPHYLLENEOXIDE]: 'CARYOPHYLLENEOXIDE',
  [TerpeneType.GUAIOL]: 'GUAIOL',
  [TerpeneType.HUMULENE]: 'HUMULENE',
  [TerpeneType.LIMONENE]: 'LIMONENE',
  [TerpeneType.LINALOOL]: 'LINALOOL',
  [TerpeneType.OCIMENE]: 'OCIMENE',
  [TerpeneType.TERPINENE]: 'TERPINENE',
  [TerpeneType.TERPINOLENE]: 'TERPINOLENE',
  [TerpeneType.THREECARENE]: 'THREECARENE',
  [TerpeneType.TRANSNEROLIDOL]: 'TRANSNEROLIDOL',
}
