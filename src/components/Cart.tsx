'use client'

import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

import useVenue from '@/hooks/useVenue'
import useCart from '@/hooks/useCart'
import Button from './Button'
import Icon from './Icon'
import Loading from './Loading'
import Typography from './Typography'
import { formatCurrency } from '@/utils/currency'
import {
  CartItem,
  CartItemStatus,
  CartItemWithProduct,
  CartWithItemProducts,
} from '@/types/cart'
import { hasSoldOutItems as hasSoldOutItemsFn } from '@/utils/cart'
import InfoBox from './InfoBox'
import {
  getProductHref,
  getProductPurchaseMax,
  getProductRemainingQuantity,
} from '@/utils/product'
import Stepper from './Stepper'
import useCartMutation from '@/hooks/useCartMutation'
import DispenseError from '@/api/dispenseError'
import cartService from '@/api/cartService'
import ProductImage from './ProductImage'
import SlideoutHeader from './SlideoutHeader'
import { addQueryStringParams } from '@/utils/url'

// const cartFormSchema = z.object({
//   items: z.array(
//     orderCartItemSchema.extend({
//       product: productSchema,
//     })
//   ),
// })
// type CartFormData = z.infer<typeof cartFormSchema>
type CartFormData = {
  items: CartItemWithProduct[]
}

const Wrapper = styled.div`
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  height: 100%;
`

const CartBody = styled.div`
  height: calc(100% - 75px - 90px);
  padding: 20px 40px 100px;
  overflow-y: auto;
`

const PaddedInfoBox = styled.div`
  margin: 20px 0;
  padding: 0 20px;
`

const PriceRow = styled.div`
  display: flex;
  gap: 10px;
`

const CartList = styled.ul`
  list-style-type: none;
  padding: 20px 0 40px;
  margin: 0;
`

const ProductRow = styled.div`
  display: grid;
  grid-template-columns: 78px auto 40px;
  gap: 15px;
  align-items: center;
  margin-bottom: 20px;
`

const PriceBreakdown = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const EmptyIcon = styled(Icon)`
  height: 3.8rem;
  width: 3.8rem;
  margin-bottom: 20px;

  > rect {
    fill: var(--gray);
  }
`

const EmptyAddItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const CartFooter = styled.div`
  padding: 20px;
  background: var(--bg-color);
  border-top: 1px solid var(--gray-light);
  z-index: 1;
  margin-top: auto;
  height: 90px;
`

function getDefaultValues(items: CartItemWithProduct[]) {
  return {
    items,
  }
}

export default function Cart({ onClose }: { onClose: () => void }) {
  const [cartLoading, setCartLoading] = React.useState(true)
  const router = useRouter()
  const q_venue = useVenue()
  const [cartNavigating, setCartNavigating] = React.useState(false)
  const { getValues, watch, reset, setValue, control } = useForm<CartFormData>({
    //   resolver: zodResolver(cartFormSchema),
    //   defaultValues: getDefaultValues([]),
    defaultValues: { items: [] },
  })
  const q_cart = useCart()
  const cartItems = watch('items')

  React.useEffect(() => {
    if (q_cart?.data) {
      setCartLoading(false)
    }

    if (!q_cart?.data?.items) return

    reset(getDefaultValues(q_cart?.data?.items ?? []))
  }, [q_cart.data])

  const m_cart = useCartMutation({
    onSuccess: (data) => {
      reset(getDefaultValues(data?.items ?? []))
    },
    onError: (error: DispenseError) => {
      //   topBarNotificationUtils.show({
      //     text: error.message,
      //   })

      console.log('CART ERROR', error)

      if (error.statusCode === 404) {
        cartService.clearCart()
        router.push('/')
      }
    },
  })

  const hasSoldOutItems = React.useMemo(() => {
    return hasSoldOutItemsFn(cartItems)
  }, [cartItems])

  const hasQuantityNotAvailableOutItems = React.useMemo(() => {
    return !!cartItems.find(
      (item) => item.status === CartItemStatus.QUANTITY_NOT_AVAILABLE
    )
  }, [cartItems])

  const totalItemCount = React.useMemo(() => {
    return cartService.getTotalItemCount()
  }, [cartItems])

  React.useEffect(() => {
    q_cart.refetch()
  }, [])

  return (
    <>
      <Wrapper>
        <SlideoutHeader
          onClose={onClose}
          CenterText={
            <Typography variant="h2" style={{ fontSize: '1.4rem' }}>
              Your Cart ({totalItemCount})
            </Typography>
          }
        />
        {/* <StoreClosedAlert /> */}
        <CartBody>
          {q_cart.fetchStatus === 'fetching' || cartLoading ? (
            <div
              css={css`
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                padding-top: 100px;
              `}
            >
              <Loading />
            </div>
          ) : (
            <>
              {hasSoldOutItems && (
                <PaddedInfoBox>
                  <InfoBox type="danger" closeable={false}>
                    An item in your cart is sold out. Please remove it to
                    continue.
                  </InfoBox>
                </PaddedInfoBox>
              )}
              {hasQuantityNotAvailableOutItems && (
                <PaddedInfoBox>
                  <InfoBox type="danger" closeable={false}>
                    An item in your cart has low stock. The quantity was
                    adjusted.
                  </InfoBox>
                </PaddedInfoBox>
              )}
              {cartItems.length ? (
                <>
                  <CartList>
                    {cartItems.map((item, index) => {
                      return (
                        <ProductRow key={item.product.id}>
                          <div
                            onClick={(e) => {
                              e.preventDefault()

                              router.push(getProductHref(item.product))
                            }}
                            style={{
                              cursor: 'pointer',
                            }}
                          >
                            <ProductImage product={item.product} />
                          </div>
                          <div>
                            <Typography variant="body-xs">
                              {item.product?.brand?.name}
                            </Typography>
                            <Typography
                              style={{
                                cursor: 'pointer',
                              }}
                              variant="body"
                              onClick={(e) => {
                                e.preventDefault()

                                router.push(getProductHref(item.product))
                              }}
                            >
                              {item.name}
                              {item.weightFormatted
                                ? ` - ${item.weightFormatted}`
                                : item.size
                                ? ` - ${item.size}`
                                : ''}
                            </Typography>
                            <PriceRow>
                              <Typography
                                variant="number"
                                style={{
                                  textDecoration:
                                    item.discountTotal && item.discountTotal > 0
                                      ? 'line-through'
                                      : 'none',
                                  color:
                                    item.discountTotal && item.discountTotal > 0
                                      ? 'var(--gray)'
                                      : 'var(--black)',
                                }}
                              >
                                {formatCurrency(item.price * item.quantity)}
                              </Typography>
                              {item.discountTotal && item.discountTotal > 0 ? (
                                <Typography variant="number">
                                  {formatCurrency(item.priceWithDiscounts ?? 0)}
                                </Typography>
                              ) : null}
                            </PriceRow>
                            {item.quantity > 0 ? (
                              <Controller
                                name={`items.${index}.quantity`}
                                control={control}
                                render={({ field: { value } }) => {
                                  return (
                                    <Stepper
                                      disabled={m_cart.status === 'loading'}
                                      minValue={1}
                                      maxValue={item.product.quantityTotal ?? 1}
                                      value={value}
                                      onChange={(value) => {
                                        if (!cartItems.length) return

                                        const newCartItems = cartItems.map(
                                          (x) => {
                                            return x.id === item.id
                                              ? { ...x, quantity: value }
                                              : { ...x }
                                          }
                                        )

                                        setValue('items', newCartItems, {
                                          shouldDirty: true,
                                        })

                                        return m_cart.mutate({
                                          venueId: q_venue?.data?.id!,
                                          items: getValues('items').map((x) => {
                                            return {
                                              productId: x.product.id,
                                              quantity: x.quantity,
                                              purchaseWeight:
                                                x.purchaseWeight ?? undefined,
                                            }
                                          }),
                                        })
                                      }}
                                    />
                                  )
                                }}
                              />
                            ) : (
                              <Typography
                                variant="body-sm"
                                css="color: var(--brand-danger); margin-top: 10px"
                              >
                                Sold Out
                              </Typography>
                            )}
                            {item.status ===
                            CartItemStatus.QUANTITY_NOT_AVAILABLE ? (
                              <Typography
                                variant="body-sm"
                                css="color: var(--brand-danger); margin-top: 10px"
                              >
                                Only {getProductRemainingQuantity(item.product)}{' '}
                                left
                              </Typography>
                            ) : null}
                            {item.status ===
                            CartItemStatus.QUANTITY_OVER_PURCHASE_MAX ? (
                              <Typography
                                variant="body-sm"
                                css="margin-top: 10px"
                              >
                                You can only purchase{' '}
                                {getProductPurchaseMax(item.product)}{' '}
                              </Typography>
                            ) : null}
                          </div>
                          <div
                            css={css`
                              display: flex;
                              flex-direction: row;
                              justify-content: center;
                            `}
                          >
                            <Button
                              round
                              icon="DELETE"
                              size="small"
                              variant="primary"
                              disabled={m_cart.status === 'loading'}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()

                                if (!cartItems || !cartItems?.length) {
                                  cartService.clearCart()

                                  return
                                }

                                const newCartItems = cartItems.filter((i) => {
                                  return i.id !== item.id
                                })

                                setValue('items', newCartItems, {
                                  shouldDirty: true,
                                })

                                return m_cart.mutate({
                                  venueId: q_venue?.data?.id!,
                                  items: getValues('items').map((x) => {
                                    return {
                                      productId: x.product.id,
                                      quantity: x.quantity,
                                      purchaseWeight:
                                        x.purchaseWeight ?? undefined,
                                    }
                                  }),
                                })
                              }}
                            />
                          </div>
                        </ProductRow>
                      )
                    })}
                    <div
                      css={css`
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        padding: 40px 0;
                      `}
                    >
                      <Link href="/shop">
                        <Button
                          variant="link"
                          icon="PLUS"
                          size="medium"
                          onClick={() => onClose()}
                        >
                          Add more items
                        </Button>
                      </Link>
                    </div>
                  </CartList>
                  <PriceBreakdown>
                    <Typography variant="h3">Subtotal</Typography>
                    <Typography
                      variant="number-secondary"
                      css={{
                        fontWeight: 'bold',
                      }}
                    >
                      {formatCurrency(
                        q_cart?.data?.subtotalWithoutDiscounts ?? 0,
                        q_venue?.data?.currencyCode,
                        q_venue?.data?.languageCode
                      )}
                    </Typography>
                  </PriceBreakdown>
                  {q_cart?.data?.discounts?.map((discount) => (
                    <PriceBreakdown
                      key={`${discount.name}-${discount.productOffer}`}
                      css={{
                        marginTop: '5px',
                      }}
                    >
                      <div>
                        <Typography variant="body">{discount.name}</Typography>
                      </div>
                      <Typography
                        variant="number-secondary"
                        css={{
                          color: 'var(--green)',
                        }}
                      >
                        {formatCurrency(
                          (discount.amount ?? 0) * -1,
                          q_venue?.data?.currencyCode,
                          q_venue?.data?.languageCode
                        )}
                      </Typography>
                    </PriceBreakdown>
                  ))}
                  <div
                    css={css`
                      margin-top: 20px;
                      display: flex;
                      flex-direction: row;
                      justify-content: flex-end;
                    `}
                  >
                    {/* {q_cart?.data ? (
                      <PromoCodeForm cart={q_cart?.data}></PromoCodeForm>
                    ) : null} */}
                  </div>
                </>
              ) : (
                <div css={{ padding: '0 20px' }}>
                  <div css={{ textAlign: 'center', padding: '50px 0' }}>
                    <EmptyIcon
                      type="CART"
                      style={{ color: 'var(--text-color)' }}
                    />
                    <Typography variant="body-sm">
                      Your cart is empty
                    </Typography>
                  </div>
                  <EmptyAddItems>
                    <Button onClick={() => onClose()}>Start Shopping</Button>
                  </EmptyAddItems>
                </div>
              )}
            </>
          )}
        </CartBody>
        {q_cart.fetchStatus === 'fetching' ||
        cartLoading ||
        totalItemCount < 1 ? null : (
          <CartFooter>
            <Button
              variant="primary"
              style={{ display: 'block', width: '100%' }}
              onClick={(e) => {
                e.preventDefault()

                // window.location.href = addQueryStringParams(
                //   q_cart?.data?.checkoutUrl!,
                //   {
                //     back: window.location.href,
                //   }
                // )
                window.location.href = addQueryStringParams(
                  `https://menus.dispenseapp.com/${q_venue?.data?.id}/menu/${q_cart?.data?.id}/checkout`,
                  {
                    back: window.location.href,
                  }
                )
              }}
            >
              Checkout
            </Button>
          </CartFooter>
        )}
      </Wrapper>
    </>
  )
}
