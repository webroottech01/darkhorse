'use client'

import React from 'react'
import styled, { css } from 'styled-components'
import Image from 'next/image'

import Typography from './Typography'
import Tag from './Tag'
import Skeleton from './Skeleton'
import { MediaQuery } from '@/utils/mediaQueries'

import Button from './Button'

import { Controller, useForm } from 'react-hook-form'

import { useMutation } from '@tanstack/react-query'

import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js'

import useVenue from '@/hooks/useVenue'
import {
  getQuantity,
  getPurchaseMax,
  getProductTerpenes,
  showTerpenes,
  getSortedVariants,
} from '@/utils/product'
import useEffectOnce from '@/hooks/useEffectOnce'
import {
  CannabisType,
  Product,
  ProductPriceType,
  ProductTier,
  ProductType,
} from '@/types/product'
import { CartItemStatus } from '@/types/cart'
import cartService from '@/api/cartService'
import { z } from 'zod'
const Card = styled.div`
border: 2px solid #52583fa1;
    border-radius: 15px;
  background: var(--cream);
  border-radius: 20px;
  box-shadow: #52583f 4px 4px 10px -6px;
  cursor: pointer;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  height: 100%;
`

const CardTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  flex: 1;
  min-height: 300px;

  @media (max-width: ${MediaQuery.screenSm}) {
    min-height: 200px;
  }
`

const CardBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  justify-content: left;
  text-align: left;
  border-top: 1px solid var(--border-color);
  padding: 20px;
`
const productFormSchema = z.object({
  quantity: z.number().min(1),
  tierId: z.string(),
  variantId: z.string(),
})

type ProductForm = z.infer<typeof productFormSchema>

export default function ProductCard({
  product,
  variant,
  style,
}: {
  product?: Product
  variant?: 'default' | 'loading'
  style?: React.CSSProperties
}) {
  const currentVenue = useVenue()
  const [selectedTier, setSelectedTier] = React.useState<ProductTier | null>(
    null
  )
  const [selectedVariant, setSelectedVariant] = React.useState<Product | null>(
    null
  )

  const defaultValues = React.useMemo(() => {
    return {
      quantity: 1,
    }
  }, [product])
  const {
    getValues,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm<ProductForm>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })

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

  const priceType = React.useMemo(() => {
    return product?.priceType ?? null
  }, [product])
  const productType = React.useMemo(() => {
    return product?.type
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

    return product?.price ?? 0
  }, [selectedTier, selectedVariant])

  const discountTypeFinal = React.useMemo(() => {
    return (
      selectedTier?.discountTypeFinal ??
      selectedVariant?.discountTypeFinal ??
      null
    )
  }, [selectedVariant, selectedTier])

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

    if (data?.priceType !== ProductPriceType.REGULAR && data?.tiers?.length) {
      setValue('tierId', data?.tiers[0].id)
      setSelectedTier(data?.tiers[0])
    }

    if (data?.variants?.length) {
      const variants = getSortedVariants(data?.variants)
      setValue('variantId', variants[0].id)
      setSelectedVariant(variants[0])
    }
  })

  return (
    <>
    
    <Card style={style} className='productcard'>
      {variant === 'loading' || !product ? (
        <>
          <CardTop>
            <Skeleton as="span" style={{ height: '200px', width: '80%' }} />
          </CardTop>
          <CardBottom>
            <Skeleton as="span" style={{ height: '26px', width: '60px' }} />
            <Skeleton as="span" style={{ height: '24px', width: '64px' }} />
            <Skeleton as="span" style={{ height: '25px', width: '85px' }} />
          </CardBottom>
        </>
      ) : (
        <>
          <CardTop>
          
            {product.image ? (
              <Image
                src={product.image}
                height={300}
                width={300}
                alt={product.name}
                css={css`
                  height: auto;
                  max-height: 300px;
                  max-width: 100%;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  padding: 20px 0 0;
                  margin: 0 auto;

                  @media (max-width: ${MediaQuery.screenSm}) {
                    height: auto;
                    max-height: 200px;
                  }
                `}
              />
            ) : null}
          </CardTop>
          <CardBottom>
            {!!product.cannabisType &&
              product.cannabisType !== CannabisType.NA && (
                <Tag variant="cannabisType" type={product.cannabisType}></Tag>
              )}
            {!!product.brand?.name && (
              <Typography variant="body-sm">{product.brand.name}</Typography>
            )}
            <Typography as="span" variant="body" className='cardtitle'>
              {product.name}
            </Typography>
            
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
                    flex: 0 0 auto; display:none;
                  `}
                >
                  <Typography variant="label" style={{ marginBottom: '5px' }}>
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
                                watch('quantity') >= productQuantity.quantity ||
                                productQuantity.soldOut
                              }
                              onClick={(e) => {
                                e.preventDefault()

                                if (value >= productQuantity.quantity) return

                                onChange(value + 1)
                              }}
                            ></Button>
                          </>
                        )
                      }}
                    />
                  </div>
                </div>
                <Button className='cardaddtocart'
                  variant="primary"
                  icon="CART"
                  loading={m_addToCart.isLoading}
                  disabled={m_addToCart.isLoading || productQuantity.soldOut}
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
          </CardBottom>
        </>
      )}
    </Card>
    </>
  )
}
