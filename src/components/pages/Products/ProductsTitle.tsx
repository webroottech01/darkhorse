'use client'

import React from 'react'
import styled, { css, CSSProp } from 'styled-components'

import {
  CannabisTypeName,
  TerpeneType,
  TerpeneName,
  CannabisType,
  ProductCategory,
  ProductOffer,
} from 'shared'
import { MediaQuery, Typography, imgixImageUrl, Icon } from 'ui-library'
import useVenue from '@/hooks/useVenue'
import { capitalize } from '@/utils/string'
import ProductBrandEl from '@/components/ProductBrand'
import { getProductCategoryName } from './utils'

const PageTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  flex: auto;

  @media (max-width: ${MediaQuery.screenMd}) {
    display: block;

    h1 {
      font-size: 2rem;
    }

    svg {
      height: 60px;
      width: 60px;

      @media (max-width: ${MediaQuery.screenSm}) {
        height: 90px;
        width: 90px;
      }
    }
  }
`

export default function ProductsTitle({
  _css,
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
  productBrandId,
  cannabisTypeId,
  terpeneTypeId,
  effectId,
  productOffer,
}: {
  _css?: CSSProp
  isCategoryRoute: boolean
  isSubCategoryRoute: boolean
  isBrandRoute: boolean
  isCannabisTypeRoute: boolean
  isTerpeneTypeRoute: boolean
  isEffectRoute: boolean
  isOfferRoute: boolean
  isAllProductsRoute: boolean
  productCategory?: ProductCategory
  productSubCategory?: string
  productBrand?: {
    logo?: string | null
    name?: string | null
  } | null
  productBrandId?: string
  cannabisTypeId?: string
  terpeneTypeId?: string
  effectId?: string
  productOffer?: ProductOffer
}) {
  const currentVenue = useVenue()

  return (
    <PageTitle css={_css}>
      {/* ----- PRODUCT CATEGORY ---- */}
      {(isCategoryRoute || isSubCategoryRoute) && productCategory ? (
        <>
          <Typography variant="h1" as="h1" style={{ margin: 0 }}>
            {getProductCategoryName({
              productCategory: productCategory,
              productSubCategory,
              venue: currentVenue,
            })}
            {productSubCategory ? ` - ${capitalize(productSubCategory)}` : ''}
          </Typography>
        </>
      ) : null}
      {/* ----- BRAND w/data ---- */}
      {isBrandRoute && productBrand ? (
        <ProductBrandEl
          brand={{
            logo: productBrand.logo,
            name: productBrand.name,
          }}
        />
      ) : null}
      {/* ----- BRAND no data ---- */}
      {isBrandRoute && !productBrand ? (
        <Typography variant="h1" as="h1" style={{ margin: 0 }}>
          {productBrandId}
        </Typography>
      ) : null}
      {/* ----- CANNABIS TYPE ---- */}
      {isCannabisTypeRoute ? (
        <div>
          <Typography variant="h1" as="h1" style={{ margin: 0 }}>
            {CannabisTypeName[cannabisTypeId as CannabisType]}
          </Typography>
        </div>
      ) : null}
      {/* ----- TERPENE TYPE ---- */}
      {isTerpeneTypeRoute ? (
        <div>
          <Typography variant="h1" as="h1" style={{ margin: 0 }}>
            {TerpeneName[terpeneTypeId as TerpeneType]}
          </Typography>
        </div>
      ) : null}
      {/* ----- EFFECT ---- */}
      {isEffectRoute ? (
        <Typography variant="h1" as="h1" style={{ margin: 0 }}>
          {capitalize(effectId ?? '')}
        </Typography>
      ) : null}
      {/* ----- OFFER ---- */}
      {isOfferRoute && productOffer ? (
        <div
          css={css`
            width: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            background-image: ${productOffer.image
              ? `url(${imgixImageUrl(productOffer.image, {
                  height: 200,
                  width: 760,
                })})`
              : ''};
          `}
        >
          <div
            css={css`
              padding: ${productOffer.image ? '20px' : '20px 20px 20px 0'};
              display: flex;
              flex-direction: row;
              align-items: center;
              flex: 1;
              gap: 10px;
              width: 100%;
              border-radius: 4px;
              background: ${productOffer.image
                ? 'linear-gradient(270deg, rgba(24, 24, 24, 0.2) 0%, rgba(24, 24, 24, 0.8) 100%)'
                : 'none'};

              svg {
                path {
                  fill: var(--brand-primary);
                }
              }
            `}
          >
            <Icon type="DEAL" />
            <div>
              <Typography
                variant="h1"
                as="h1"
                css={css`
                  margin: 0;
                  color: ${productOffer.image
                    ? 'var(--white)'
                    : 'var(--black)'};
                `}
              >
                {productOffer.name}
              </Typography>
              {productOffer.description && (
                <Typography
                  variant="body-sm"
                  css={css`
                    margin: 0;
                    color: ${productOffer.image
                      ? 'var(--white)'
                      : 'var(--black)'};
                  `}
                >
                  {productOffer.description}
                </Typography>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {/* ----- ALL PRODUCTS ---- */}
      {isAllProductsRoute ? (
        <>
          <Typography variant="h1" as="h1" style={{ margin: 0 }}>
            All Products
          </Typography>
        </>
      ) : null}
    </PageTitle>
  )
}
