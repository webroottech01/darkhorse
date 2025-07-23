'use client'

import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled, { css } from 'styled-components'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import Link from 'next/link'
// import { fetchProductMeta } from '@/types/productmetanew'
import useVenue from '@/hooks/useVenue'
import {
  getQuantity,
  getPurchaseMax,
  getProductTerpenes,
  showTerpenes,
  getTerpeneStrength,
  getProductPurchaseMax,
  getProductRemainingQuantity,
  getSortedVariants,
} from '@/utils/product'
import { MediaQuery } from '@/utils/mediaQueries'
import useEffectOnce from '@/hooks/useEffectOnce'
import {
  CannabisType,
  Product,
  ProductPriceType,
  ProductTier,
  ProductType,
  TerpeneType,
} from '@/types/product'
import { DiscountType } from '@/types/pricing'
import { formatCurrency } from '@/utils/currency'
import { decimalToPercent } from '@/utils/number'
import { slugifyBrand, capitalize } from '@/utils/string'
import BrandImage from '../BrandImage'
import Button from '../Button'
import Container from '../Container'
import InfoBox from '../InfoBox'
import Tag from '../Tag'
import Typography, { getTypographyStyles } from '../Typography'
import ProductTag from '../ProductTag'
import BackLink from '../BackLink'
import { CartItemStatus } from '@/types/cart'
import { RadioButtonGroup } from '../RadioButton'
import { venueCurrency } from '@/utils/venue'
import cartService from '@/api/cartService'
// import { useParams } from 'next/navigation'

const productFormSchema = z.object({
  quantity: z.number().min(1),
  tierId: z.string(),
  variantId: z.string(),
})

type ProductForm = z.infer<typeof productFormSchema>

const radioButtonGroupStyles = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  max-width: 300px;

  @media (max-width: ${MediaQuery.screenMd}) {
    max-width: 100%;
  }

  > button {
    border-radius: 4px;
    border-width: 1px;

    &.active {
      border-color: var(--brand-primary);
      background-color: var(--cream);

      &:hover {
        border-color: var(--brand-primary);
      }

      &:focus {
        border-color: var(--brand-primary);
        background-color: var(--cream);
      }
    }
  }
`

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: ${MediaQuery.screenMd}) {
    display: block;
    gap: 0;
  }
`

const TopWrapperCol = styled.div<{ variant: 'left' | 'right' }>`
  width: 50%;
  min-height: 600px;

  ${(props) =>
    props.variant === 'left'
      ? css`
          display: flex;
          flex-direction: row;
          justify-content: center;
          width: 58.33333333%;

          @media (max-width: ${MediaQuery.screenSm}) {
            justify-content: flex-start;
          }
        `
      : css`
          flex: 0 0 auto;
          width: 41.66666667%;
        `};

  @media (max-width: ${MediaQuery.screenMd}) {
    width: 100%;
    min-height: auto;
    margin-bottom: 20px;
  }
`

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const TypeTag = ({ type }: { type: ProductType }) => {
  const currentVenue = useVenue()

  return (
    <Link
      href="#"
      // href={`/categories/${getProductSlugByType(type, currentVenue) ?? ''}`}
    >
      <Tag variant="productType" type={type}></Tag>
    </Link>
  )
}

const CannabisTypeTag = ({
  venueId,
  cannabisType,
}: {
  venueId: string
  cannabisType: CannabisType
}) => (
  <Link
    href={`/cannabis-types/${encodeURIComponent(cannabisType).toLowerCase()}`}
  >
    <Tag variant="cannabisType" type={cannabisType}></Tag>
  </Link>
)

const TerpeneTypeTag = ({
  venueId,
  type,
}: {
  venueId: string
  type: TerpeneType
}) => {
  return (
    <Link href={`/terpenes/${encodeURIComponent(type).toLowerCase() ?? ''}`}>
      <Tag variant="terpeneType" type={type}></Tag>
    </Link>
  )
}

const ImageWrapper = styled.div`
  position: relative;
  max-height: 500px;
  min-height: 300px;
  max-width: 100%;
  height: 100%;
  width: 100%;

  img {
    max-width: 100%;
  }

  @media (max-width: ${MediaQuery.screenSm}) {
    max-height: 100%;
    min-height: 0;
  }
`

const TagsWrapper = styled.div`
  position: absolute;
  top: 15px;
  left: 1px;
  z-index: 1;
`

export default function ProductPage({ product }: { product: Product }) {
  const currentVenue = useVenue()
  const [selectedTier, setSelectedTier] = React.useState<ProductTier | null>(
    null
  )
  const [selectedVariant, setSelectedVariant] = React.useState<Product | null>(
    null
  )
  const hasDefaultImage = React.useMemo(() => {
    return selectedVariant && selectedVariant.image
  }, [product])
  const defaultValues = React.useMemo(() => {
    return {
      quantity: 1,
    }
  }, [product])
  const {
    register,
    getValues,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<ProductForm>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })
  const tiers = React.useMemo(() => {
    return product.tiers ?? []
  }, [product])
  // const variants = React.useMemo(() => {
  //   if (!product) return []

  //   return getVariantsWithQuantity(product)
  // }, [product])
  const productQuantity = React.useMemo(() => {
    if (!product) {
      return {
        quantity: 0,
      }
    }

    const quantity = getQuantity({
      product,
      selectedVariant,
    })

    return {
      quantity,
      purchaseMax: getPurchaseMax({
        product,
        selectedVariant,
      }),
      soldOut: quantity === 0 || !product.enable,
    }
  }, [product, selectedTier, selectedVariant])

  const shouldShowTerpenes = React.useMemo(() => {
    if (!selectedVariant) return false
    const terps = getProductTerpenes(selectedVariant)
    const terpValuesExist =
      Object.values(terps).reduce((a, b) => a ?? 0 + (b ?? 0)) !== 0
        ? true
        : false
    return terpValuesExist
      ? showTerpenes(terps)
      : selectedVariant.labs?.terpenes
      ? true
      : false
  }, [product, selectedVariant])
  const terpeneData = React.useMemo(() => {
    const terps = selectedVariant ? getProductTerpenes(selectedVariant) : {}
    const totalTerpeneAmount = shouldShowTerpenes
      ? Object.values(terps).reduce((a, b) => (a ?? 0) + (b ?? 0), 0)
      : 0
    const terpsForStrengthChart =
      shouldShowTerpenes && selectedVariant
        ? getTerpeneStrength(terps, totalTerpeneAmount ?? 0, selectedVariant)
        : []
    const greatestTerp = terpsForStrengthChart.length
      ? terpsForStrengthChart[0].iconName
      : null

    return {
      greatestTerp: greatestTerp as TerpeneType | null,
      totalTerpeneAmount,
      terpsForStrengthChart,
    }
  }, [product, shouldShowTerpenes, selectedVariant])

  const showNewTag = React.useMemo(() => {
    return product?.new
  }, [product])
  const showSaleTag = React.useMemo(() => {
    return (
      (selectedTier &&
        selectedTier.discountAmountFinal &&
        selectedTier.discountAmountFinal > 0) ||
      (!selectedTier &&
        selectedVariant &&
        selectedVariant?.discountAmountFinal &&
        selectedVariant?.discountAmountFinal > 0)
    )
  }, [selectedVariant, selectedTier])
  const priceType = React.useMemo(() => {
    return product.priceType ?? null
  }, [product])
  const productType = React.useMemo(() => {
    return product.type
  }, [product])
  const priceWithDiscounts = React.useMemo(() => {
    if (selectedTier) {
      return Math.max(
        selectedTier.price - (selectedTier.discountAmountFinal ?? 0),
        0
      )
    }

    if (selectedVariant) {
      return Math.max(
        selectedVariant.price - (selectedVariant.discountAmountFinal ?? 0),
        0
      )
    }

    return product.price ?? 0
  }, [selectedTier, selectedVariant])
  const discountAmountFinal = React.useMemo(() => {
    return (
      selectedTier?.discountAmountFinal ??
      selectedVariant?.discountAmountFinal ??
      0
    )
  }, [selectedVariant, selectedTier])
  const discountValueFinal = React.useMemo(() => {
    return (
      selectedTier?.discountValueFinal ??
      selectedVariant?.discountValueFinal ??
      0
    )
  }, [selectedVariant, selectedTier])
  const discountTypeFinal = React.useMemo(() => {
    return (
      selectedTier?.discountTypeFinal ??
      selectedVariant?.discountTypeFinal ??
      null
    )
  }, [selectedVariant, selectedTier])
  const description = React.useMemo(() => {
    return selectedVariant?.description ?? product.description ?? null
  }, [product, selectedTier, selectedVariant])
  const [addProductError, setAddProductError] = React.useState<{
    error: string
    status: CartItemStatus
  } | null>(null)

  const m_addToCart = useMutation(['addProduct'], async () => {
    let quantity = getValues().quantity

    const productId = selectedVariant?.id ?? ''

    const cart = await cartService.addProduct({
      venueId: currentVenue?.data?.id!,
      quantity,
      productId,
      purchaseWeight:
        priceType !== ProductPriceType.WEIGHT_TIER &&
        priceType !== ProductPriceType.PRICE_TIER
          ? undefined
          : selectedTier?.weight ?? selectedVariant?.weight ?? undefined,
      priceTierData:
        selectedVariant &&
        priceType &&
        priceType === ProductPriceType.PRICE_TIER
          ? {
              priceType: priceType,
              type: selectedVariant.type,
              weight: selectedVariant.weight ?? undefined,
            }
          : undefined,
    })

    const item = cart?.items?.find((i) => i.product.id === productId)

    if (item && !!item.status) {
      setAddProductError({
        error: '',
        status: item.status,
      })
    }

    return cart
  })

  // const productId = product.id;
  
  useEffectOnce(() => {
    // async function getMeta() {
    //   const meta = await fetchProductMeta(productId)
    //   console.log('Fetched product meta:', meta)
    //   console.log('Fetched product meta:', meta?.meta_title)
    //   console.log('Fetched product meta:', meta?.meta_description)
    //   console.log('productId:', productId);
    // }

    // if (productId) {
    //   getMeta()
    // }

    const data = product

    if (data.priceType !== ProductPriceType.REGULAR && data.tiers?.length) {
      setValue('tierId', data.tiers[0].id)
      setSelectedTier(data.tiers[0])
    }

    if (data.variants?.length) {
      const variants = getSortedVariants(data.variants)
      setValue('variantId', variants[0].id)
      setSelectedVariant(variants[0])
    }
  })

  const sortedVariants = product.variants
    ? getSortedVariants(product.variants)
    : []

  console.log('VARIANTS', product.variants)
  // console.log('id' , product.id)

  return (
    <>
      {/* <StoreClosedAlert /> */}
      <Container
        style={{ paddingTop: 0, paddingBottom: '100px', minHeight: '800px' }}
      >
        <div
          style={{
            padding: '25px 0',
            marginBottom: '0px',
          }}
        >
          <BackLink />
        </div>
        <>
          <TopWrapper>
            <TopWrapperCol variant="left">
              <ImageWrapper>
                {showNewTag || showSaleTag ? (
                  <TagsWrapper>
                    {showNewTag ? (
                      <ProductTag size="medium" variant="new">
                        New
                      </ProductTag>
                    ) : null}
                    {showSaleTag &&
                    discountAmountFinal &&
                    discountAmountFinal > 0 ? (
                      <ProductTag size="medium" variant="sale">
                        {discountTypeFinal === DiscountType.FLAT
                          ? `${formatCurrency(discountAmountFinal)} Off`
                          : `${decimalToPercent(discountValueFinal ?? 0)}% Off`}
                      </ProductTag>
                    ) : null}
                  </TagsWrapper>
                ) : null}
                {selectedVariant &&
                selectedVariant.image &&
                !hasDefaultImage ? (
                  <div
                    css={css`
                      margin: 0 auto;
                      text-align: center;
                      border-radius: 10px;
                      position: relative;
                      height: 100%;
                      width: 100%;
                    `}
                  >
                    <Image
                      css={css`
                        border-radius: 10px;
                        margin: 0 auto;
                        width: 100%;

                        display: inline-block;
                        max-height: 500px;
                        min-height: 300px;
                        position: relative !important;
                        height: auto !important;
                        width: auto !important;
                        object-fit: contain;

                        @media (max-width: ${MediaQuery.screenSm}) {
                          max-height: 0;
                        }
                      `}
                      alt={`Image of ${selectedVariant.name}`}
                      fill
                      priority={true}
                      src={selectedVariant.image}
                    />
                  </div>
                ) : null}
                {selectedVariant &&
                (!selectedVariant.image || hasDefaultImage) &&
                selectedVariant.brand &&
                selectedVariant.brand.logo ? (
                  <div
                    css={css`
                      display: flex;
                      flex-direction: row;
                      justify-content: center;
                      align-items: center;
                    `}
                  >
                    <BrandImage
                      height={300}
                      width={300}
                      priority={true}
                      src={selectedVariant.brand.logo}
                      alt={selectedVariant.brand.name ?? ''}
                    />
                  </div>
                ) : null}
              </ImageWrapper>
            </TopWrapperCol>
            <TopWrapperCol variant="right">
              <ProductInfo>
                <div
                  css={css`
                    display: flex;
                    flex-direction: row;
                    gap: 10px;
                    flex-wrap: wrap;
                  `}
                >
                  {productType && <TypeTag type={productType} />}
                  {shouldShowTerpenes && terpeneData?.greatestTerp && (
                    <TerpeneTypeTag
                      venueId={currentVenue?.data?.id!}
                      type={terpeneData.greatestTerp}
                    />
                  )}
                  {product.cannabisType &&
                    product.cannabisType !== CannabisType.NA && (
                      <CannabisTypeTag
                        venueId={currentVenue?.data?.id!}
                        cannabisType={product.cannabisType}
                      />
                    )}
                </div>
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                  `}
                >
                  {product.brand?.name && (
                    <Link
                      href={`/brands/${slugifyBrand(
                        product.brand?.name ?? ''
                      )}`}
                    >
                      <Typography
                        variant="body-sm"
                        style={{ color: 'var(--brand-primary)' }}
                      >
                        {product.brand.name}
                      </Typography>
                    </Link>
                  )}
                  <Typography
                    as="h1"
                    css={css`
                      margin: 0;
                      ${getTypographyStyles('h2')}
                    `}
                  >
                    {product.name}
                  </Typography>
                  <div
                    css={css`
                      display: flex;
                      flex-direction: row;
                      gap: 10px;
                    `}
                  >
                    <Typography
                      variant="number-lg"
                      css={css`
                        ${discountAmountFinal && discountAmountFinal > 0
                          ? 'text-decoration: line-through;'
                          : ''}
                      `}
                    >
                      {formatCurrency(
                        selectedTier?.price ?? selectedVariant?.price ?? 0
                      )}
                    </Typography>
                    {discountAmountFinal && discountAmountFinal > 0 ? (
                      <Typography
                        variant="number-lg"
                        style={{ color: 'var(--brand-danger)' }}
                      >
                        {formatCurrency(priceWithDiscounts)}
                      </Typography>
                    ) : null}
                  </div>

                  {/* <div
                    style={{ display: 'flex', flexDirection: 'row', gap: 10 }}
                  >
                    <ReviewStars
                      averageRating={product?.reviewStats?.averageRating ?? 0}
                    />
                    {(product?.reviewStats?.averageRating ?? 0) > 0 && (
                      <Typography
                        as="p"
                        variant="body-sm"
                        style={{ margin: 0 }}
                      >
                        {new Intl.NumberFormat('en-US', {
                          minimumIntegerDigits: 1,
                          minimumFractionDigits: 1,
                        }).format(product?.reviewStats?.averageRating ?? 0)}
                      </Typography>
                    )}
                    {product?.reviewStats?.total &&
                    product?.reviewStats?.total > 0 ? (
                      <Typography
                        onClick={(e) => {
                          e.preventDefault()
                          scrollUtils.scrollTo({
                            top: 9999999999,
                          })
                        }}
                        as="p"
                        variant="body-sm"
                        style={{ margin: 0, cursor: 'pointer' }}
                      >
                        | See {product?.reviewStats?.total ?? 0} reviews
                      </Typography>
                    ) : (
                      <Link href={`/products/${product.id}/review`}>
                        <Typography
                          as="p"
                          variant="body-sm"
                          style={{ margin: 0, cursor: 'pointer' }}
                        >
                          | Write the first review
                        </Typography>
                      </Link>
                    )}
                  </div> */}
                </div>
                {(priceType === ProductPriceType.WEIGHT_TIER ||
                  priceType === ProductPriceType.PRICE_TIER) && (
                  <RadioButtonGroup
                    aria-label="Weight"
                    value={selectedTier?.id ?? ''}
                    errorMessage={errors.tierId?.message}
                    style={radioButtonGroupStyles}
                  >
                    {tiers.map((x) => (
                      <Button
                        key={x.id}
                        value={x.id}
                        variant="secondary"
                        active={selectedTier?.id === x.id}
                        onClick={() => setSelectedTier(x)}
                      >
                        {priceType === ProductPriceType.PRICE_TIER && (
                          <>
                            {x.purchaseQuantity}x -{' '}
                            {venueCurrency(x.price ?? 0)}
                          </>
                        )}
                        {priceType === ProductPriceType.WEIGHT_TIER &&
                          x.weightFormatted}
                      </Button>
                    ))}
                  </RadioButtonGroup>
                )}
                {priceType === ProductPriceType.REGULAR &&
                  sortedVariants?.length &&
                  sortedVariants?.length > 1 && (
                    <RadioButtonGroup
                      aria-label="Variant"
                      value={selectedVariant?.id ?? ''}
                      errorMessage={errors.variantId?.message}
                      style={radioButtonGroupStyles}
                    >
                      {sortedVariants.map((x) => (
                        <Button
                          id={x.id}
                          key={x.id}
                          value={x.id}
                          variant="secondary"
                          active={selectedVariant?.id === x.id}
                          onClick={() => setSelectedVariant(x)}
                        >
                          {capitalize(x.size ?? x.weightFormatted ?? '')}
                        </Button>
                      ))}
                    </RadioButtonGroup>
                  )}

                <form>
                  <div
                    css={css`
                      display: flex;
                      flex-direction: row;
                      gap: 10px;
                      align-items: center;
                      justify-content: space-between;
                    `}
                  >
                    <div
                      css={css`
                        flex: 0 0 auto;
                      `}
                    >
                      <Typography
                        variant="label"
                        style={{ marginBottom: '5px' }}
                      >
                        Quantity
                      </Typography>
                      <div
                        css={css`
                          display: flex;
                          flex-direction: row;
                          gap: 10px;
                          align-items: center;
                          justify-content: flex-start;
                        `}
                      >
                        <Controller
                          name="quantity"
                          control={control}
                          render={({ field: { value, onChange } }) => {
                            return (
                              <>
                                <Button
                                  round
                                  variant="secondary"
                                  icon="SUBTRACT"
                                  disabled={
                                    productQuantity.soldOut ||
                                    watch('quantity') <= 1
                                  }
                                  onClick={(e) => {
                                    e.preventDefault()

                                    if (value === 1) return

                                    onChange(value - 1)
                                  }}
                                ></Button>
                                <Typography
                                  variant="body"
                                  style={{ padding: '0 10px' }}
                                >
                                  {watch('quantity')}
                                </Typography>
                                <Button
                                  round
                                  variant="secondary"
                                  icon="PLUS"
                                  disabled={
                                    watch('quantity') >=
                                      productQuantity.quantity ||
                                    productQuantity.soldOut
                                  }
                                  onClick={(e) => {
                                    e.preventDefault()

                                    if (value >= productQuantity.quantity)
                                      return

                                    onChange(value + 1)
                                  }}
                                ></Button>
                              </>
                            )
                          }}
                        />
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      icon="CART"
                      loading={m_addToCart.isLoading}
                      disabled={
                        m_addToCart.isLoading || productQuantity.soldOut
                      }
                      css={css`
                        display: none;
                        margin-top: 20px;
                        display: flex !important;

                        @media (min-width: 700px) {
                          display: flex;
                        }
                      `}
                      onClick={(e) => {
                        e.preventDefault()

                        if (!selectedVariant?.id && !selectedTier?.id) return

                        m_addToCart.mutate()
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </form>

                {productQuantity.soldOut ||
                (productQuantity.quantity && productQuantity.quantity <= 10) ? (
                  <Typography
                    variant="body-sm"
                    style={{ color: 'var(--brand-danger)' }}
                  >
                    {productQuantity.soldOut
                      ? 'Sold out'
                      : productQuantity.quantity <= 10
                      ? `Only ${Number(productQuantity.quantity).toFixed()}${
                          priceType === ProductPriceType.WEIGHT_TIER
                            ? ' grams'
                            : ''
                        } left`
                      : null}
                  </Typography>
                ) : null}
                {productQuantity.purchaseMax &&
                productQuantity.purchaseMax > 1 &&
                productQuantity.purchaseMax < 5 ? (
                  <Typography variant="body-sm">
                    You can only purchase {getProductPurchaseMax(product)}
                  </Typography>
                ) : null}
                {!!addProductError && !!product && (
                  <InfoBox
                    type="danger"
                    closeable={true}
                    onClose={() => setAddProductError(null)}
                  >
                    {addProductError.status === CartItemStatus.SOLD_OUT &&
                      'An item in your cart has low stock. The quantity was adjusted.'}
                    {addProductError.status ===
                      CartItemStatus.QUANTITY_NOT_AVAILABLE &&
                      getProductRemainingQuantity(product)}
                    {addProductError.status ===
                      CartItemStatus.QUANTITY_OVER_PURCHASE_MAX &&
                      `You can only purchase ${getProductPurchaseMax(product)}`}
                  </InfoBox>
                )}
                {/* <ProductProductOffers product={product} /> */}
                {description && (
                  <div>
                    <Typography
                      variant="label"
                      style={{ marginBottom: '10px' }}
                    >
                      Details
                    </Typography>
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                    />
                  </div>
                )}
              </ProductInfo>
            </TopWrapperCol>
          </TopWrapper>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: 20px;
              margin-top: 20px;
            `}
          >
            {/* {selectedVariant ? (
              <ProductLabs product={selectedVariant}></ProductLabs>
            ) : null}
            {shouldShowTerpenes && terpeneData ? (
              <TerpeneStrengthChart
                terpenes={terpeneData.terpsForStrengthChart}
              />
            ) : null}
            {product.effects?.length ? (
              <ProductEffectsSection effects={product.effects} />
            ) : null}
            {product.brand?.id ? <ProductBrand brand={product.brand} /> : null}
            {
              <ProductSuggestions
                productId={product.id ?? ''}
                type="suggestions"
              />
            }
            {product.brand?.name && (
              <ProductSuggestions
                productId={product.id ?? ''}
                brand={product.brand.name}
                type="brand-suggestions"
              />
            )} */}
            {/* <ProductReviews product={product} /> */}
          </div>
        </>
      </Container>
    </>
  )
}
