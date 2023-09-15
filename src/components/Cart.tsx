import React from 'react'
import styled, { css } from 'styled-components'

import Typography from './Typography'
import useCart from 'src/hooks/useCart'
import { imageUrl } from 'src/sdk'
import Icon from './Icon'
import Button from './Button'

const Wrapper = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const CartHeader = styled.div`
  border-bottom: 1px solid var(--gray-light);
  padding-bottom: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const CartItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

const ProductImage = styled.img`
  height: 80px;
  width: 80px;
  border: 1px solid var(--gray-light);
`

export default function Cart({ onClose }: { onClose: () => void }) {
  const q_cart = useCart()

  return (
    <Wrapper>
      <CartHeader>
        <Typography variant="h2" as="h2" style={{ margin: 0 }}>
          Your Cart
        </Typography>
        {/* <div
          css={css`
            cursor: pointer;

            svg {
              path {
                fill: var(--gray);
              }
            }
          `}
          onClick={() => onClose()}
        >
          <Icon height={30} width={30} type="CLOSE_X" />
        </div> */}
        <Button onClick={(e) => {
          e.preventDefault()
          onClose()
        }}>Close</Button>
      </CartHeader>
      <CartItems>
        {q_cart.data?.items?.map((item) => {
          return (
            <CartItem key={item.id}>
              <ProductImage
                src={imageUrl(item.image ?? '', {
                  height: 80,
                  width: 80,
                })}
                alt={item.name}
                height={80}
                width={80}
              />
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  gap: 5px;
                  justify-content: center;
                `}
              >
                <Typography variant="body-sm">{item.brand}</Typography>
                <Typography variant="body">{item.name}</Typography>
              </div>
            </CartItem>
          )
        })}
      </CartItems>
    </Wrapper>
  )
}
