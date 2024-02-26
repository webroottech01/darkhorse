'use client'

import React from 'react'
import styled, { css } from 'styled-components'
import isArray from 'lodash/isArray'
import { useQueryClient } from '@tanstack/react-query'
import { InView } from 'react-intersection-observer'
import Image from 'next/image'

import {
  MediaQuery,
  SelectButton,
  SelectButtonOption,
  Filters as _Filters,
  FilterDef,
  Loading,
  Button,
  EmptyState,
  AccordionFilter,
  fadeIn,
  addQueryStringParams,
  removeNilQueryParams,
} from 'ui-library'
import {
  CannabisType,
  CannabisTypeName,
  ProductBrand,
  ProductCategory,
  ProductCategoryType,
  ProductOffer,
  ProductPriceType,
  ProductSubTypes,
  ProductType,
  ProductTypeName,
  ProductWeight,
} from 'shared'
import Container from '@/components/Container'
import useVenue from '@/hooks/useVenue'
import {
  ProductsSort,
  ProductsSortName,
  productsSortKey,
} from '@/components/pages/Products/constants'
import useProductBrands from '@/hooks/useProductBrands'
import useProductSubTypes from '@/hooks/useProductSubTypes'
import useProductWeights from '@/hooks/useProductWeights'
import useProductEffects from '@/hooks/useProductEffects'
import useProductOffer from '@/hooks/useProductOffer'
import useProductsInfinite from '@/hooks/useProductsInfinite'
import { QueryClientKey } from '@/utils/queryClient'
import StoreClosedAlert from '@/components/StoreClosedAlert'
import { capitalize } from '@/utils/string'
import ProductsFiltersSlideOut from '@/components/pages/Products/ProductsFiltersSlideOut'
import { getProductHref } from '@/utils/product'
import { addProduct } from '@/utils/cart'
import MenuBottomBar from '@/components/MenuBottomBar'
import useMenuPath from '@/hooks/useMenuPath'
import useMenuRouter from '@/hooks/useMenuRouter'
import MenuLink from '@/components/MenuLink'
import MenuBackLink from '../../MenuBackLink'
import useRouteName from '@/hooks/useRouteName'
import { RouteName } from '@/utils/route'
import useSearchParams from '@/hooks/useSearchParams'
import ProductsTitle from './ProductsTitle'
import {
  ProductCard,
  mapProductToProductCardProps,
} from '@/components/ProductCard'

const Wrapper = styled(Container)`
  padding-bottom: 100px;
`

const Filters = styled(_Filters)`
  padding: 0;
  display: 'flex';
  flex-direction: 'column';
  gap: '20px';
  justify-content: 'flex-start';
  align-items: 'flex-start';
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 20px 20px;

  @media (max-width: ${MediaQuery.screenLg}) {
    grid-template-columns: minmax(0, 1fr) 1fr;
    gap: 10px 10px;
  }
`

const LeftNavAnimation = css`
  animation-name: ${fadeIn};
  animation-duration: 500ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`

const LeftNav = styled.div`
  flex: 0 0 auto;
  width: 240px;
  padding-right: 40px;
  ${LeftNavAnimation}

  @media (max-width: ${MediaQuery.screenMd}) {
    display: none;
  }
`

const RightContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: ${MediaQuery.screenMd}) {
    gap: 15px;
  }
`

const FiltersButton = styled(Button)<{ totalAppliedFilters: number }>`
  display: none;

  > div {
    display: ${(props) => (props.totalAppliedFilters > 0 ? 'block' : 'none')};
  }

  svg {
    height: 20px;
    width: 20px;
  }

  @media (max-width: ${MediaQuery.screenMd}) {
    display: flex;
  }
`

const FilterRightCol = ({
  searchParams,
  totalAppliedFilters,
  onChange,
  onShowFilters,
}: {
  searchParams: {
    sort?: string
    search?: string
  }
  totalAppliedFilters: number
  onChange: (val: string) => void
  onShowFilters: () => void
}) => (
  <div
    css={css`
      gap: 10px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      flex: 1;
    `}
  >
    <FiltersButton
      size="medium"
      variant="secondary"
      icon="FILTERS"
      iconSide="right"
      onClick={(e) => {
        e.preventDefault()

        onShowFilters()
      }}
      totalAppliedFilters={totalAppliedFilters}
    >
      {totalAppliedFilters > 0 ? totalAppliedFilters : ''}
    </FiltersButton>
    <SelectButton
      size="medium"
      value={searchParams.sort}
      onChange={onChange}
      css={css`
        width: 200px;

        @media (max-width: ${MediaQuery.screenMd}) {
          width: 100px;
        }
      `}
    >
      <SelectButtonOption label={'Sort'} value={'UNSELECTED'} />
      {Object.values(ProductsSort).map((sort) => {
        return (
          <SelectButtonOption
            key={sort}
            label={ProductsSortName[sort]}
            value={sort}
          />
        )
      })}
    </SelectButton>
  </div>
)

export default function ProductsPage({
  productCategory,
  productCategoryId,
  subCategoryId,
  brandId,
  cannabisTypeId,
  terpeneTypeId,
  effectId,
  productOffer,
  productOfferId,
}: {
  productCategory?: ProductCategory
  productCategoryId?: string
  subCategoryId?: string
  brandId?: string
  cannabisTypeId?: string
  terpeneTypeId?: string
  effectId?: string
  productOffer?: ProductOffer
  productOfferId?: string
}) {
  const router = useMenuRouter()
  const pathname = useMenuPath()
  const routeName = useRouteName()
  const searchParams = useSearchParams<{
    sort?: string
    type?: ProductType[]
    search?: string
  }>()

  const isAllProductsRoute =
    routeName === RouteName.MENU_APP_PRODUCT_LIST && productCategoryId === 'all'
  const isCategoryRoute = routeName === RouteName.MENU_APP_PRODUCT_CATEGORY
  const isSubCategoryRoute =
    routeName === RouteName.MENU_APP_PRODUCT_SUBCATEGORY
  const isBrandRoute = routeName === RouteName.MENU_APP_PRODUCT_BRAND
  const isCannabisTypeRoute =
    routeName === RouteName.MENU_APP_PRODUCT_CANNABIS_TYPE
  const isTerpeneTypeRoute = routeName === RouteName.MENU_APP_PRODUCT_TERPENE
  const isEffectRoute = routeName === RouteName.MENU_APP_PRODUCT_EFFECT
  const isOfferRoute = routeName === RouteName.MENU_APP_PRODUCT_OFFER
  const [showFilterSlideout, setShowFilterSlideout] = React.useState(false)
  const currentVenue = useVenue()

  const formattedSearchParams = React.useMemo(() => {
    const queryParams: any = {
      ...searchParams,
    }

    if (queryParams.weight) {
      queryParams.weightFormatted = queryParams.weight
      delete queryParams.weight
    }

    if (brandId) {
      queryParams.brand = brandId
    }

    if (cannabisTypeId) {
      queryParams.cannabisType = cannabisTypeId
    }

    if (terpeneTypeId) {
      queryParams.terpeneType = terpeneTypeId.toLocaleLowerCase()
    }

    if (effectId) {
      queryParams.effects = effectId
    }

    if (subCategoryId) {
      queryParams.subType = encodeURIComponent(subCategoryId)
    }

    return {
      ...queryParams,
      sort:
        !!searchParams.sort || searchParams.sort !== 'UNSELECTED'
          ? productsSortKey[searchParams.sort as ProductsSort]
          : null,
    }
  }, [searchParams, productCategory])

  const loadData = React.useMemo(() => {
    if (isCategoryRoute || isSubCategoryRoute) {
      return !!productCategory
    }

    return true
  }, [productCategory, isCategoryRoute, isSubCategoryRoute])
  const q_productBrands = useProductBrands({
    queryKey: [
      formattedSearchParams.type,
      productCategory?.filterTypes,
      productCategory?.filterBrands,
    ],
    params: {
      type: formattedSearchParams.type ?? productCategory?.filterTypes,
      productId: productCategory?.filterProducts?.map((fp) => fp.product),
      brand: productCategory?.filterBrands ?? undefined,
    },
    options: {
      enabled: loadData && !isBrandRoute,
    },
  })
  const q_productSubTypes = useProductSubTypes({
    queryKey: [formattedSearchParams.type, productCategory?.filterTypes],
    params: {
      type: formattedSearchParams.type ?? productCategory?.filterTypes,
    },
    options: {
      enabled: !!productCategory,
    },
  })
  const q_productWeights = useProductWeights({
    queryKey: [formattedSearchParams.type, productCategory?.filterTypes],
    params: {
      type: formattedSearchParams.type ?? productCategory?.filterTypes,
      productId: productCategory?.filterProducts?.map((fp) => fp.product),
      brand: productCategory?.filterBrands ?? undefined,
      cannabisType: productCategory?.filterCannabisTypes ?? undefined,
      discounted: productCategory?.filterDiscounted ?? undefined,
      featured: productCategory?.filterFeatured ?? undefined,
      new: productCategory?.filterNew ?? undefined,
    },
    options: {
      enabled: loadData,
    },
  })
  const q_productEffects = useProductEffects({
    queryKey: [formattedSearchParams.type, productCategory?.filterTypes],
    params: {
      type: formattedSearchParams.type ?? productCategory?.filterTypes,
    },
    options: {
      enabled: loadData,
    },
  })
  const filterDefs = React.useMemo(() => {
    return getFilterDefs({
      isAllProductsRoute,
      isCategoryRoute,
      isSubCategoryRoute,
      isBrandRoute,
      isCannabisTypeRoute,
      isEffectRoute,
      //
      productCategory: productCategory,
      productBrands: q_productBrands?.data?.data,
      productWeights: q_productWeights?.data?.data,
      productEffects: q_productEffects?.data?.data,
      productSubTypes: q_productSubTypes?.data?.data,
    })
  }, [
    pathname,
    q_productBrands?.data,
    q_productWeights?.data,
    q_productEffects?.data,
    q_productSubTypes?.data,
    productCategory,
  ])
  const productSubCategory = decodeURIComponent(subCategoryId ?? '')
  const [totalAppliedFilters, setTotalAppliedFilters] =
    React.useState<number>(0)
  const q_products = useProductsInfinite({
    queryKey: !!productCategory
      ? [
          formattedSearchParams,
          productCategory?.id,
          productOfferId,
          pathname,
          brandId,
        ]
      : [formattedSearchParams, productOfferId, pathname, brandId],
    params: {
      ...formattedSearchParams,
      limit: 20,
      active: true,
      quantityMin: 1,
      group: true,
      enable: true,
      productCategoryId: productCategory?.id,
      brand: isBrandRoute
        ? brandId
        : formattedSearchParams.brand && isArray(formattedSearchParams.brand)
        ? formattedSearchParams.brand
        : formattedSearchParams.brand,
      subType: subCategoryId
        ? productSubCategory
        : formattedSearchParams.subType,
      productOfferId: productOfferId,
    },
    options: {
      keepPreviousData: true,
      enabled:
        (productCategoryId && !!productCategory) ||
        !productCategoryId ||
        productCategoryId === 'all',
    },
  })
  const productBrand = React.useMemo(() => {
    return isBrandRoute
      ? q_products?.data?.pages?.[0].data?.find((p) => !!p?.brand?.name)?.brand
      : null
  }, [isBrandRoute, q_products?.data])
  const queryClient = useQueryClient()

  const resetList = () => {
    queryClient.setQueryData(QueryClientKey.PRODUCTS, () => [])
  }
  const productsTitleProps = React.useMemo(() => {
    return {
      isCategoryRoute: isCategoryRoute,
      isSubCategoryRoute: isSubCategoryRoute,
      isBrandRoute: isBrandRoute,
      isCannabisTypeRoute: isCannabisTypeRoute,
      isTerpeneTypeRoute: isTerpeneTypeRoute,
      isEffectRoute: isEffectRoute,
      isOfferRoute: isOfferRoute,
      isAllProductsRoute: isAllProductsRoute,
      productCategory: productCategory,
      productSubCategory: productSubCategory,
      productBrand: productBrand,
      cannabisTypeId: cannabisTypeId,
      terpeneTypeId: terpeneTypeId,
      effectId: effectId,
      productOffer: productOffer ?? undefined,
    }
  }, [
    isCategoryRoute,
    isSubCategoryRoute,
    isBrandRoute,
    isCannabisTypeRoute,
    isTerpeneTypeRoute,
    isEffectRoute,
    isOfferRoute,
    isAllProductsRoute,
    productCategory,
    productSubCategory,
    productBrand,
    cannabisTypeId,
    terpeneTypeId,
    effectId,
    productOffer,
  ])

  return (
    <>
      {productCategory?.headerImage ? (
        <div
          css={css`
            position: relative;
            height: 450px;
            width: 100vw;

            @media (max-width: ${MediaQuery.screenMd}) {
              height: 225px;
            }
          `}
        >
          <Image
            alt={productCategory.name}
            src={productCategory.headerImage}
            fill
            quality={100}
            loading="eager"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : null}
      <StoreClosedAlert />
      <Wrapper>
        <div
          css={css`
            display: flex;
            flex-direction: row;

            @media (max-width: ${MediaQuery.screenMd}) {
              display: block;
            }
          `}
        >
          <LeftNav>
            <div
              css={css`
                margin: 20px 0;
              `}
            >
              <MenuBackLink />
            </div>
            <Filters
              value={searchParams}
              filterDefs={filterDefs}
              onChange={(val) => {
                resetList()

                router.push(
                  addQueryStringParams(pathname, {
                    ...removeNilQueryParams(searchParams),
                    ...val,
                  }),
                  {
                    scroll: false,
                  }
                )
              }}
            >
              {filterDefs.map((def) => (
                <AccordionFilter
                  key={`${def.type}-${def.label}`}
                  filterDef={def}
                />
              ))}
            </Filters>
          </LeftNav>
          <RightContent>
            <div
              css={css`
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-start;
                width: 100%;
                flex-flow: nowrap;
                gap: 20px;
              `}
            >
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 40px;
                `}
              >
                <div
                  css={css`
                    display: none;
                    padding-top: 10px;

                    @media (max-width: ${MediaQuery.screenMd}) {
                      display: block;
                    }
                  `}
                >
                  <MenuBackLink />
                </div>
                <ProductsTitle
                  _css={css`
                    @media (max-width: ${MediaQuery.screenMd}) {
                      display: none;
                    }
                  `}
                  {...productsTitleProps}
                />
              </div>
              <FilterRightCol
                searchParams={searchParams}
                totalAppliedFilters={totalAppliedFilters}
                onChange={(val: string) => {
                  resetList()

                  router.push(
                    addQueryStringParams(pathname, {
                      ...searchParams,
                      sort: val,
                    }),
                    {
                      scroll: false,
                    }
                  )
                }}
                onShowFilters={() => setShowFilterSlideout(true)}
              />
            </div>
            <ProductsTitle
              _css={css`
                display: none;

                @media (max-width: ${MediaQuery.screenMd}) {
                  display: block;
                }
              `}
              {...productsTitleProps}
            />
            <ProductsGrid>
              {q_products?.data?.pages
                ?.map((p) => p.data)
                .flat()
                .map((product) => (
                  <MenuLink key={product.id} href={getProductHref(product)}>
                    <ProductCard
                      style={{ padding: 0, height: '100%' }}
                      {...mapProductToProductCardProps(product)}
                      {...{
                        onChange: (productId, purchaseWeight) =>
                          addProduct({
                            venueId: currentVenue.id,
                            productId,
                            quantity: 1,
                            purchaseWeight,
                            priceTierData:
                              product.priceType === ProductPriceType.PRICE_TIER
                                ? {
                                    priceType: product.priceType,
                                    type: product.type,
                                    weight: product.weight ?? undefined,
                                  }
                                : undefined,
                          }),
                      }}
                    />
                  </MenuLink>
                ))}
              {q_products.isLoading
                ? [1, 2, 3, 4, 5, 6].map((n) => {
                    return (
                      <ProductCard
                        style={{ padding: 0 }}
                        key={n}
                        variant="loading"
                      />
                    )
                  })
                : null}
            </ProductsGrid>
            {q_products.isSuccess &&
            !q_products.isLoading &&
            (!q_products?.data?.pages?.[0]?.pageCount ||
              q_products?.data?.pages?.[0]?.pageCount === 0) ? (
              <div
                css={css`
                  text-align: center;
                  padding: 40px 0;
                `}
              >
                <EmptyState />
              </div>
            ) : null}
            {q_products.isFetchingNextPage && (
              <div
                css={css`
                  text-align: center;
                  padding: 40px 0;
                `}
              >
                <Loading />
              </div>
            )}
            <InView
              root={null}
              threshold={0}
              onChange={(inView) => {
                if (
                  inView &&
                  q_products?.hasNextPage &&
                  !q_products.isFetchingNextPage
                ) {
                  q_products.fetchNextPage()
                }
              }}
              as="div"
            />
          </RightContent>
        </div>
      </Wrapper>
      <MenuBottomBar />
      <ProductsFiltersSlideOut
        open={showFilterSlideout}
        onClose={() => setShowFilterSlideout(false)}
        onAppliedChange={(totalApplied) => {
          setTotalAppliedFilters(totalApplied ?? 0)
        }}
        filterDefs={filterDefs}
      />
    </>
  )
}

function getProductCategoryProductType(productCategory: ProductCategory) {
  return productCategory.type === ProductCategoryType.SYSTEM &&
    productCategory.filterTypes &&
    productCategory.filterTypes.length &&
    productCategory.filterTypes[0]
    ? (productCategory.filterTypes[0] as ProductType)
    : null
}

function getFilterDefs({
  isAllProductsRoute,
  isCategoryRoute,
  isSubCategoryRoute,
  isBrandRoute,
  //
  productCategory,
  productBrands,
  isCannabisTypeRoute,
  isEffectRoute,
  productWeights,
  productEffects,
  productSubTypes,
}: {
  isAllProductsRoute?: boolean
  isCategoryRoute?: boolean
  isSubCategoryRoute?: boolean
  isBrandRoute?: boolean
  isCannabisTypeRoute?: boolean
  isEffectRoute?: boolean
  isOfferRoute?: boolean
  //
  productCategory?: ProductCategory | null
  productBrands?: ProductBrand[] | null
  productWeights?: ProductWeight[] | null
  productEffects?: string[] | null
  productSubTypes?: ProductSubTypes | null
}): FilterDef[] {
  const filters: FilterDef[] = []
  const productCategoryType = productCategory
    ? getProductCategoryProductType(productCategory)
    : null

  if (
    !isSubCategoryRoute &&
    (!productCategory || productCategory.type !== ProductCategoryType.SYSTEM)
  ) {
    filters.push({
      label: 'Categories',
      key: 'type',
      type: 'select-many',
      options: (productCategory && productCategory.filterTypes?.length
        ? Object.values(ProductType).filter((t) =>
            productCategory.filterTypes?.includes(t)
          )
        : Object.values(ProductType)
      ).map((type) => {
        return {
          label: ProductTypeName[type],
          value: type,
        }
      }),
    })
  }

  if (!isSubCategoryRoute) {
    if (
      productSubTypes &&
      Object.keys(productSubTypes).length &&
      productCategoryType
    ) {
      filters.push({
        label: 'Sub Categories',
        key: 'subType',
        type: 'select-many',
        options: (productSubTypes[productCategoryType] ?? [])
          .sort()
          .map((subType) => {
            return {
              label: capitalize(subType),
              value: subType,
            }
          }),
      })
    }
  }

  if (
    (!productCategoryType ||
      ![ProductType.ACCESSORIES, ProductType.MERCHANDISE].includes(
        productCategoryType
      ) ||
      isAllProductsRoute ||
      !productCategory) &&
    !isCannabisTypeRoute
  ) {
    filters.push({
      label: 'Types',
      key: 'cannabisType',
      type: 'select-many',
      options: (productCategory && productCategory.filterCannabisTypes?.length
        ? Object.values(CannabisType).filter((t) =>
            productCategory.filterCannabisTypes?.includes(t)
          )
        : Object.values(CannabisType)
      ).map((type) => {
        return {
          label: CannabisTypeName[type],
          value: type,
        }
      }),
    })
  }

  if (!productCategory || !productCategory.filterDiscounted) {
    filters.push({
      label: 'Discounted',
      key: 'discounted',
      type: 'select-many',
      options: [
        {
          label: 'On sale',
          value: 'true',
        },
      ],
    })
  }

  if (productBrands && productBrands.length && !isBrandRoute) {
    filters.push({
      label: 'Brands',
      key: 'brand',
      type: 'select-many',
      options: (productCategory && productCategory.filterBrands?.length
        ? Object.values(productBrands).filter((t) =>
            productCategory.filterBrands?.includes(t.value)
          )
        : Object.values(productBrands)
      ).map((brand) => {
        return {
          label: brand.value,
          value: brand.value,
        }
      }),
    })
  }

  if (productWeights && productWeights.length) {
    filters.push({
      label: 'Weights',
      key: 'weight',
      type: 'select-many',
      options: Object.values(productWeights).map((weight) => {
        return {
          label: weight.value,
          value: weight.value,
        }
      }),
    })
  }

  if (productEffects && productEffects.length && !isEffectRoute) {
    filters.push({
      label: 'Effects',
      key: 'effects',
      type: 'select-many',
      options: productEffects.map((effect) => {
        return {
          label: capitalize(effect),
          value: effect,
        }
      }),
    })
  }

  return filters
}
