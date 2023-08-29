import { useParams } from '@tanstack/react-router'
import React from 'react'
import Container from 'src/components/Container'

import useProduct from 'src/hooks/useProduct'
import { css } from 'styled-components'

export default function ProductPage() {
  const params = useParams()

  const q_product = useProduct({
    params: {
      productId: params.productId!,
    },
  })

  return (
    <Container>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          gap: 60px;
        `}
      >
        <div
          css={css`
            border-radius: 60px;
            height: 600px;

            img {
              border-radius: 60px;
              border: 1px solid var(--gray-light);
              height: 600px;
            }
          `}
        >
          {q_product.data?.image ? <img src={q_product.data?.image} /> : null}
        </div>
        <div css={css``}>
          <h1>{q_product.data?.name}</h1>
          <h2>{q_product.data?.brand?.name}</h2>
          <h3
            dangerouslySetInnerHTML={{
              __html: q_product.data?.description ?? '',
            }}
          ></h3>
        </div>
      </div>
    </Container>
  )
}
