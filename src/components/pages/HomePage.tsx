'use client'

import { ProductsList } from '@/components/ProductsList'
import Hero from '../Hero'
import Typography from '../Typography'
import Image from 'next/image'
import Container from '../Container'
import styled, { css } from 'styled-components'
import { Product } from '@/types/product'

const categories = [
  {
    name: 'Flower',
    image: 'https://assets.dispenseapp.com/highscore-cannabis/hs-flower.svg',
  },
  {
    name: 'Vapes',
    image: 'https://assets.dispenseapp.com/highscore-cannabis/hs-vapes.svg',
  },
  {
    name: 'Edibles',
    image: 'https://assets.dispenseapp.com/highscore-cannabis/hs-edibles.svg',
  },
  {
    name: 'Pre Rolls',
    image: 'https://assets.dispenseapp.com/highscore-cannabis/hs-pre-rolls.svg',
  },
  {
    name: 'Topicals',
    image: 'https://assets.dispenseapp.com/highscore-cannabis/hs-topicals.svg',
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
        <Typography variant="h2" as="h2" style={{ marginTop: 0 }}>
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
            <div
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
            </div>
          ))}
        </div>
      </Container>
      <Section>
        <Typography variant="h2" as="h2" style={{ marginTop: 0 }}>
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
        `}
      >
        <Typography variant="h1" as="h3" style={{ color: 'var(--white)' }}>
          Legends grow here.
          <br />
          Leaf by leaf.
        </Typography>
      </div>
      <div
        css={css`
          background: var(--blue);
          padding: 40px 0;
          text-align: center;
          color: var(--white);
        `}
      ></div>
    </main>
  )
}
