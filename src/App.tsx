import React from 'react'
import styled from 'styled-components'

import useProducts from './hooks/useProducts'
import ProductCard from './components/ProductCard'

const storeId = '7ec840a066d21812'

const Wrapper = styled.div`
  background-color: red;
`

export default function App() {
  const q_products = useProducts(storeId)

  console.log('PRODUCTS', q_products)
 
  return (
    <Wrapper>
      {q_products.data.map((p) => {
        return <ProductCard key={p.id} product={p} />
      })}
    </Wrapper>
  )
}
