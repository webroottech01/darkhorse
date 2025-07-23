'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Nav from './Nav'
import Link from 'next/link'
import CartCounter from '../countCart'

function ComponentName() {
  // header sticky
  const [isSticky, setIsSticky] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleMenuClick = () => {
    const sidebar = document.querySelector('.side-bar.header-two')
    if (sidebar) {
      sidebar.classList.toggle('show')
    }
  }

  const handleSearchOpen = () => {
    const sidebar = document.querySelector('.search-input-area')
    if (sidebar) {
      sidebar.classList.toggle('show')
    }
  }

  return (
      <div
        className="rts-header-nav-area-one menuarea">
        <div className="container">
          <div className="row">
            
            <div className="col-lg-12">
              <div className="nav-and-btn-wrapper">
                <div className="nav-area">
                  <Nav />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ComponentName
