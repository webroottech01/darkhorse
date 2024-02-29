import {
  Product,
  ProductPriceType,
  ProductTerpenes,
  TerpeneName,
  terpenes,
  TerpenesContext,
  TerpeneStrength,
  TerpeneToContentUnit,
} from '../types/product'
import { slugifyBrand } from './string'

export const getProductHref = ({
  brand,
  slug,
}: {
  brand?: { name?: string | null } | null
  slug: string
}) => {
  let brandId = 'none'

  if (brand && brand.name) {
    brandId = slugifyBrand(brand.name)
  }

  return `/${brandId}/${slug}`
}

export const getProductRemainingQuantity = (product: Product) => {
  return product.priceType === ProductPriceType.WEIGHT_TIER
    ? `${Number(product.quantity).toFixed(2)} grams`
    : product.quantity
}

export const getProductPurchaseMax = (product: Product) => {
  return product.priceType === ProductPriceType.WEIGHT_TIER
    ? `${Number(product.purchaseMax).toFixed(2)} grams`
    : product.purchaseMax
}

export const getVariantsWithQuantity = (product: Product) => {
  return (
    product.variants
      ?.filter((variant) => {
        return variant.quantity > 0 && variant.enable
      })
      .sort((variantA, variantB) => variantA.price - variantB.price) ?? []
  )
}

export const getQuantity = ({
  product,
  selectedVariant,
}: {
  product: Product
  selectedVariant?: Product | null
}) => {
  return selectedVariant?.quantity ?? product.quantity ?? 1
}

export const getPurchaseMax = ({
  product,
  selectedVariant,
}: {
  product: Product
  selectedVariant?: Product | null
}) => {
  return (
    selectedVariant?.purchaseMax ??
    product.purchaseMax ??
    selectedVariant?.quantity ??
    product.quantity ??
    null
  )
}

export const getTerpeneStrength = (
  terps: { [key: string]: number | null | undefined },
  total: number,
  product: Product
): TerpeneStrength[] => {
  const divisor = total / 100
  const arr = []

  for (const terp in terps) {
    const _terp = terps[terp]

    if (_terp && _terp > 0) {
      const contentUnitKey = TerpeneToContentUnit[terp as keyof ProductTerpenes]
      arr.push({
        name: TerpeneName[terp.toUpperCase() as keyof typeof TerpeneName],
        relativeValue: Number((_terp / divisor).toFixed(2)),
        value: _terp,
        context: TerpenesContext[terp as keyof ProductTerpenes],
        iconName: terp.toUpperCase(),
        // @ts-ignore
        contentUnit: String(product.labs?.[contentUnitKey as keyof Product]),
      } as TerpeneStrength)
    }
  }

  arr.sort((a, b) => Number(b.value) - Number(a.value))

  return arr
}

export const getProductTerpenes = (product: Product): ProductTerpenes => {
  const terps = {
    alphaPinene: 0,
    betaCaryophyllene: 0,
    betaEudesmol: 0,
    betaMyrcene: 0,
    betaPinene: 0,
    bisabolol: 0,
    caryophylleneOxide: 0,
    guaiol: 0,
    humulene: 0,
    limonene: 0,
    linalool: 0,
    ocimene: 0,
    terpinene: 0,
    terpinolene: 0,
    threeCarene: 0,
    transNerolidol: 0,
  }

  terpenes.forEach((terp) => {
    const temp = product.labs?.[terp]
    if (temp === null || temp === undefined) return
    if (typeof temp === 'number' && temp > 0) {
      terps[terp] = temp
    }
    return
  })

  return terps
}

export const showTerpenes = (terps: {
  [key: string]: number | null | undefined
}): boolean => {
  if (terps === undefined) return false

  const vals = Object.values(terps)
  const notAllNullOrZero = vals.filter((val) => val && val > 0).length > 0

  if (!notAllNullOrZero) return false

  let hasTerpsToShow = false

  while (hasTerpsToShow === false) {
    for (let i = 0; i < terpenes.length; i++) {
      const terp = terps[terpenes[i]]

      if (terp && terp > 0) {
        hasTerpsToShow = true
        break
      }
    }
  }

  return hasTerpsToShow
}
