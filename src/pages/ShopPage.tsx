import styled from 'styled-components'
import React from 'react'

import ProductCard from 'src/components/ProductCard'
import useProducts from 'src/hooks/useProducts'

const storeId = '7ec840a066d21812'

const Wrapper = styled.div``

export default function ShopPage() {
  const q_products = useProducts({
    params: {
      storeId,
    },
  })

  console.log('PRODUCTS', q_products)

  return (
    <Wrapper>
      {q_products.data?.data.map((p) => {
        return <ProductCard key={p.id} product={p} />
      })}
    </Wrapper>
  )
}
