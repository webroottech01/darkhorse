'use client'

import Link from 'next/link'
import styled, { css } from 'styled-components'

import { ProductsList } from '@/components/ProductsList'
import Hero from '../Hero'

import Typography from '../Typography'
import Image from 'next/image'
import Container from '../Container'
import ContainerFluid from '../Containerfluid'
import { Product, ProductType } from '@/types/product'
import { MediaQuery } from '@/utils/mediaQueries'
import Reviews from '../Reviews'

const categories = [
  {
    name: 'Flower',
    image: '/cat-images/hs-flower.png',
    type: ProductType.FLOWER,  
  },
  {
    name: 'Vapes',
    image: '/cat-images/hs-vapes.png',
    type: ProductType.VAPORIZERS,
  },
  {
    name: 'Edibles',
    image: '/cat-images/hs-edibles.png',
    type: ProductType.EDIBLES,
  },
  {
    name: 'Pre Rolls',
    image: '/cat-images/hs-pre-rolls.png',
    type: ProductType.PRE_ROLLS,
  },
  {
    name: 'Concentrates',
    image: '/cat-images/hs-concentrates.png',
    type: ProductType.CONCENTRATES,
  },
  {
    name: 'Tinctures',
    image: '/cat-images/hs-tinctures.png',
    type: ProductType.TINCTURES,
  }
  
]

const Section = styled(Container)`
  text-align: center;
  padding-block: 60px;
`

export default function HomePage({ products }: { products: Product[] }) {
  return (
    <main>
      <Hero />
      {/* <HomeBanner /> */}
      <Section
        as="section"
        css={css`
          padding-top: 60px;
          padding-bottom: 0;

          @media (min-width: 780px) {
            width: 780px;
          }

          @media (max-width: 780px) {
            width: 100%;
          }
        `}
      >
        <Typography variant="h1" as="h2" style={{ marginTop: 0 }}>
          Shop by Category
        </Typography>
      </Section>
      <ContainerFluid
        css={css`
          overflow: hidden;
          padding: 0;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            width: 100%;

            padding: 20px 0 20px;
            overflow-y: hidden;
            overflow-x: auto;
            width: 100%;
            box-sizing: content-box;
          `}
        >
          {categories.map((category) => (
            <Link
              href={`/shop/${category.type.toLowerCase()}`}
              key={category.name}
              css={css`
                display: flex;
                flex-direction: column;
                gap: 20px;
                align-items: center;
                min-width: 200px;
              `}
            >
              <Image
                src={category.image}
                height={200}
                width={200}
                alt={category.name}
                css={'width:100%;object-fit: contain;'}
              />
              <Typography variant="h2" as="h2" css={'margin-top:0;line-height:1;'}>
                {category.name}
              </Typography>
            </Link>
          ))}
        </div>
      </ContainerFluid>
      <Section>
        <Typography variant="h1" as="h2" style={{ marginTop: 0 }}>
          Shop Most Popular
        </Typography>
        <ProductsList products={products} />
      </Section>
      
      <div
        css={css`
          background: var(--green);
          padding: 160px 0;
          text-align: center;
          color: var(--cream);

          @media (max-width: ${MediaQuery.screenSm}) {
            padding: 60px 0;
          }
        `}
      >
        <Typography variant="h1" as="h3" style={{ color: 'var(--cream)' }}>
        Testimonials & Reviews
        </Typography>
        <Reviews />
      </div>
    </main>
  )
}
