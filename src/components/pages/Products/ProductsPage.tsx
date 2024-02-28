'use client'

import React from 'react'
import styled, { css } from 'styled-components'
import { useQueryClient } from '@tanstack/react-query'
import { InView } from 'react-intersection-observer'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

import Container from '@/components/Container'
import useVenue from '@/hooks/useVenue'
import {
  ProductsSort,
  ProductsSortName,
  productsSortKey,
} from '@/components/pages/Products/constants'
import useProductsInfinite from '@/hooks/useProductsInfinite'
import { QueryClientKey } from '@/utils/queryClient'
import { capitalize } from '@/utils/string'
import ProductsFiltersSlideOut from '@/components/pages/Products/ProductsFiltersSlideOut'
import { getProductHref } from '@/utils/product'
import cartService from '@/api/cartService'
import useRouteName from '@/hooks/useRouteName'
import useSearchParams from '@/hooks/useSearchParams'
import _Filters from '@/components/Filters/Filters'
import { MediaQuery } from '@/utils/mediaQueries'
import {
  CannabisEffect,
  CannabisType,
  CannabisTypeName,
  ProductPriceType,
  ProductType,
  ProductTypeName,
} from '@/types/product'
import Button from '@/components/Button'
import AccordionFilter from '@/components/Filters/AccordionFilter'
import { FilterDef } from '@/components/Filters/types'
import Loading from '@/components/Loading'
import { SelectButton, SelectButtonOption } from '@/components/SelectButton'
import { fadeIn } from '@/constants/animations'
import { addQueryStringParams, removeNilQueryParams } from '@/utils/url'
import { isArray } from 'util'
import EmptyState from '@/components/EmptyState'
import ProductCard from '@/components/ProductCard'
import Typography from '@/components/Typography'

const Wrapper = styled(Container)`
  padding: 100px 0;
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

export default function ProductsPage({ category }: { category?: ProductType }) {
  const router = useRouter()
  const pathname = usePathname()
  const routeName = useRouteName()
  const searchParams = useSearchParams<{
    sort?: string
    type?: ProductType[]
    search?: string
  }>()
  const [showFilterSlideout, setShowFilterSlideout] = React.useState(false)
  const q_venue = useVenue()

  const formattedSearchParams = React.useMemo(() => {
    const queryParams: any = {
      ...searchParams,
    }

    if (category) {
      queryParams.type = category
    }

    if (queryParams.weight) {
      queryParams.weightFormatted = queryParams.weight
      delete queryParams.weight
    }

    return {
      ...queryParams,
      sort:
        !!searchParams.sort || searchParams.sort !== 'UNSELECTED'
          ? productsSortKey[searchParams.sort as ProductsSort]
          : null,
    }
  }, [searchParams])

  const filterDefs = React.useMemo(() => {
    return getFilterDefs({})
  }, [pathname])
  const [totalAppliedFilters, setTotalAppliedFilters] =
    React.useState<number>(0)
  const q_products = useProductsInfinite({
    queryKey: [formattedSearchParams],
    params: {
      ...formattedSearchParams,
      limit: 20,
      active: true,
      quantityMin: 1,
      group: true,
      enable: true,
    },
    options: {
      keepPreviousData: true,
      enabled: true,
    },
  })
  const queryClient = useQueryClient()

  const resetList = () => {
    queryClient.setQueryData(QueryClientKey.PRODUCTS, () => [])
  }

  const pageTitle = React.useMemo(() => {
    return category ? ProductTypeName[category] : 'Shop our products'
  }, [category])

  return (
    <>
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
            {/* <div
              css={css`
                margin: 20px 0;
              `}
            >
              <MenuBackLink />
            </div> */}
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
                    @media (max-width: ${MediaQuery.screenMd}) {
                      display: none;
                    }
                  `}
                >
                  <Typography variant="h1" as="h1" style={{ margin: 0 }}>
                    {pageTitle}
                  </Typography>
                </div>
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
            <div
              css={css`
                display: none;

                @media (max-width: ${MediaQuery.screenMd}) {
                  display: block;
                }
              `}
            >
              <Typography variant="h1" as="h1" style={{ margin: 0 }}>
                {pageTitle}
              </Typography>
            </div>
            <ProductsGrid>
              {q_products?.data?.pages
                ?.map((p) => p.data)
                .flat()
                .map((product) => (
                  <Link key={product.id} href={getProductHref(product)}>
                    <ProductCard product={product} />
                  </Link>
                ))}
              {q_products.isLoading
                ? [1, 2, 3, 4, 5, 6].map((n) => {
                    return <ProductCard key={n} variant="loading" />
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

function getFilterDefs({}: {}): FilterDef[] {
  const filters: FilterDef[] = []

  filters.push({
    label: 'Categories',
    key: 'type',
    type: 'select-many',
    options: Object.values(ProductType).map((type) => {
      return {
        label: ProductTypeName[type],
        value: type,
      }
    }),
  })

  filters.push({
    label: 'Types',
    key: 'cannabisType',
    type: 'select-many',
    options: Object.values(CannabisType).map((type) => {
      return {
        label: CannabisTypeName[type],
        value: type,
      }
    }),
  })

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

  // filters.push({
  //   label: 'Brands',
  //   key: 'brand',
  //   type: 'select-many',
  //   options: Object.values(productBrands).map((brand) => {
  //     return {
  //       label: brand.value,
  //       value: brand.value,
  //     }
  //   }),
  // })

  // if (productWeights && productWeights.length) {
  //   filters.push({
  //     label: 'Weights',
  //     key: 'weight',
  //     type: 'select-many',
  //     options: Object.values(productWeights).map((weight) => {
  //       return {
  //         label: weight.value,
  //         value: weight.value,
  //       }
  //     }),
  //   })
  // }

  filters.push({
    label: 'Effects',
    key: 'effects',
    type: 'select-many',
    options: Object.values(CannabisEffect).map((effect) => {
      return {
        label: capitalize(effect),
        value: effect,
      }
    }),
  })

  return filters
}
