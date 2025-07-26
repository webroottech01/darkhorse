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
import OfferAdd from '../common/OfferAdd'
import OffersSlider from '../OffersSlider'

const categories = [
  {
    name: 'Flower',
    image: '/cat-images/flowers.webp',
    type: ProductType.FLOWER,  
  },
  {
    name: 'Vapes',
    image: '/cat-images/vapes.webp',
    type: ProductType.VAPORIZERS,
  },
  {
    name: 'Edibles',
    image: '/cat-images/edibles.webp',
    type: ProductType.EDIBLES,
  },
  {
    name: 'Pre Rolls',
    image: '/cat-images/prerolls.webp',
    type: ProductType.PRE_ROLLS,
  },
  {
    name: 'Concentrates',
    image: '/cat-images/concentrates.webp',
    type: ProductType.CONCENTRATES,
  },
  {
    name: 'Tinctures',
    image: '/cat-images/Tinctures.webp',
    type: ProductType.TINCTURES,
  },
  {
    name: 'Beverages',
    image: '/cat-images/beverages.webp',
    type: ProductType.BEVERAGES,
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
      <Section className='offersouter'
        as="section"
        css={css`
          padding-top: 40px;
          padding-bottom: 40px;
          width: 100%;

          @media (max-width: 780px) {
            width: 100%;
          }
        `}
      >
        {/* <p>Don't Miss out on our</p> */}
        <p className='mb-0'>Don't Miss out our</p>
        <Typography variant="h1" as="h2" style={{ marginTop: 0 , marginBottom : '30px' }}>
        Big Savings! 
        </Typography>
        
      <OffersSlider />
      </Section>
      
      <Section className='bycatsmain'
        as="section"
        css={css`
          padding-top: 60px;
          padding-bottom: 60px;
          width: 100%;

          @media (max-width: 780px) {
            width: 100%;
          }
        `}
      >
        <p className='mb-0'>Find What Fits Your Lifestyle</p>
        <Typography variant="h1" as="h2" style={{ marginTop: 0 , marginBottom : '30px'  }}>
          Shop by Category
        </Typography>
        


        <ContainerFluid className='homecategories container'
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
                css={'width:100%;object-fit: contain;max-width:200px;'}
              />
              <Typography variant="h2" as="h2" css={'margin-top:0;line-height:1;'}>
                {category.name}
              </Typography>
            </Link>
          ))}
        </div>
      </ContainerFluid>


      </Section>
      
      
      <div className='homeproductsmain'>
      <div className='homeproductsinner'>
      <div className='container-large homeproducts'>
        <p className='prefixtxt'>Our Products</p>
        <Typography variant="h1" as="h2" style={{ marginTop: 0}} className='text-center'>
          Shop Most Popular
        </Typography>
        <p>Tried, tested, and loved by our customers! These top-selling products are fan favorites for a reason—shop the most popular picks today.</p>
        <ProductsList products={products} />
      </div>
      </div>
      </div>
      <div className='reviewshome'
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
