'use client'

import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import SlideOutPanel from './SlideOutPanel'
import useCart from '@/hooks/useCart'
import Badge from './Badge'
import cartService from '@/api/cartService'
import Cart from './Cart'
import { MediaQuery } from '@/utils/mediaQueries'
import { ProductType, ProductTypeName } from '@/types/product'
import { addQueryStringParams } from '@/utils/url'
import Dropdown from './Dropdown/Dropdown'
import DropdownTrigger from './Dropdown/DropdownTrigger'
import Typography from './Typography'
import DropdownItem from './Dropdown/DropdownItem'
import useSearchParams from '@/hooks/useSearchParams'
import useRouteName from '@/hooks/useRouteName'
import { RouteName } from '@/utils/route'




export default function CartCounter() {

  const pathname = usePathname()
  const routeName = useRouteName()
  const searchParams = useSearchParams()

  const q_cart = useCart()
  const [cartSlideOutOpen, setCartSlideOutOpen] = React.useState(false)


  useEffect(() => {
    setCartSlideOutOpen(false)
  }, [pathname])

  useEffect(() => {
    if (searchParams.cart) {
      setCartSlideOutOpen(true)
    }
  }, [searchParams])

  return (
    <>
      <div
        style={{ display: routeName === RouteName.CHECKOUT ? 'none' : 'flex'}}
      >
        <div className="btn-border-only cart category-hover-header" 
        onClick={(e) => {
          e.preventDefault()

          setCartSlideOutOpen(true)
        }}>
          <i className="fa-sharp fa-regular fa-cart-shopping"></i>
          {/* <span className="text">Cart</span> */}
          {q_cart?.data?.items && q_cart?.data?.items.length ? (
          <span className="number">
          {cartService.getTotalItemCount()}
            
          </span>
          ) : null}
          </div>
        
       
       
      </div>
      
      <SlideOutPanel
        width="600px"
        open={cartSlideOutOpen}
        onClose={() => setCartSlideOutOpen(false)}
      >
        <Cart
          onClose={() => {
            setCartSlideOutOpen(false)
          }}
        />
      </SlideOutPanel>
    </>
  )
}
