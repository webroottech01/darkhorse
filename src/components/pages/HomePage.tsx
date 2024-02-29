'use client'

import Link from 'next/link'
import styled, { css } from 'styled-components'

import { ProductsList } from '@/components/ProductsList'
import Hero from '../Hero'
import Typography from '../Typography'
import Image from 'next/image'
import Container from '../Container'
import { Product, ProductType } from '@/types/product'
import { MediaQuery } from '@/utils/mediaQueries'

const categories = [
  {
    name: 'Flower',
    image: 'https://assets.dispenseapp.com/highscore-cannabis/hs-flower.svg',
    type: ProductType.FLOWER,
  },
  {
    name: 'Vapes',
    image: 'https://assets.dispenseapp.com/highscore-cannabis/hs-vapes.svg',
    type: ProductType.VAPORIZERS,
  },
  {
    name: 'Edibles',
    image: 'https://assets.dispenseapp.com/highscore-cannabis/hs-edibles.svg',
    type: ProductType.EDIBLES,
  },
  {
    name: 'Pre Rolls',
    image: 'https://assets.dispenseapp.com/highscore-cannabis/hs-pre-rolls.svg',
    type: ProductType.PRE_ROLLS,
  },
  {
    name: 'Topicals',
    image: 'https://assets.dispenseapp.com/highscore-cannabis/hs-topicals.svg',
    type: ProductType.TOPICALS,
  },
]

const Section = styled(Container)`
  text-align: center;
  padding-block: 60px;
`

export default function HomePage({ products }: { products: Product[] }) {
  return (
    <main>
      <Hero />
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
      <Container
        css={css`
          overflow: hidden;
          height: 180px;
          padding: 0;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
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
                min-width: 120px;
              `}
            >
              <Image
                src={category.image}
                height={80}
                width={80}
                alt={category.name}
              />
              <Typography variant="h3" as="h3">
                {category.name}
              </Typography>
            </Link>
          ))}
        </div>
      </Container>
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
          color: var(--white);

          @media (max-width: ${MediaQuery.screenSm}) {
            padding: 60px 0;
          }
        `}
      >
        <Typography variant="h1" as="h3" style={{ color: 'var(--white)' }}>
          Legends grow here.
          <br />
          Leaf by leaf.
        </Typography>
      </div>
    </main>
  )
}
