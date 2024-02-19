'use client'

import { ProductsList } from '@/components/ProductsList'
import Hero from '../Hero'
import { Product } from '@dispense/dispense-js'
import Typography from '../Typography'
import Image from 'next/image'
import Container from '../Container'
import styled, { css } from 'styled-components'

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
  margin-inline: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
  padding-block: 65px;
`

export default function HomePage({ products }: { products: Product[] }) {
  return (
    <main>
      <Hero />
      <Section
        as="section"
        css={css`
          @media (min-width: 780px) {
            width: 780px;
          }

          @media (max-width: 780px) {
            width: 100%;
          }
        `}
      >
        <Typography variant="h2" as="h2">
          Shop by Category
        </Typography>
        <Container
          css={css`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
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
        </Container>
      </Section>
      <Section>
        <Typography variant="h2" as="h2">
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
