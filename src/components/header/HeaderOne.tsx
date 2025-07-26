'use client'
import React, { useState, useEffect, useRef } from 'react'
import HeaderNav from './HeaderNav'
import CategoryMenu from './CategoryMenu'
// import Cart from './Cart';
// import WishList from './WishList';
import Sidebar from './Sidebar'
import BackToTop from '@/components/common/BackToTop'
import { useCompare } from '@/components/header/CompareContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CartCounter from '../countCart'
import WishList from './WishList'
import SearchBar from './searchbar'
import NavBar from './Navbar'
import Loader from '../Loader'

function HeaderOne() {
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
    <>
      <div
        className={`rts-header-nav-area-one header--sticky  ${
          isSticky ? 'sticky' : ''
        }`}
      >
        {/* top bar */}
        <div className="header-top-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="bwtween-area-header-top">
                  <div className="discount-area">
                    <p className="disc"><i className="fa fa-map-marker"></i> 15 Centre St, Albany, NY Zip - 12207</p>
                    
                  </div>
                  <div className="contact-number-area">
                  <div className="social-and-payment-area-wrapper">
                                <div className="social-one-wrapper">
                                    <span>Follow Us:</span>
                                    <ul>
                                        <li>
                                            <a href="https://www.facebook.com/people/Dark-Horse-Dispensary/61570633007256/" target='blank'>
                                                <i className="fa-brands fa-facebook-f" />
                                            </a>
                                        </li>
                                        
                                        <li>
                                            <a href="https://www.instagram.com/darkhorsedispensary?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='blank'>
                                                <i className="fa-brands fa-instagram" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                
                            </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
{/* <Loader /> */}
        <div className="search-header-area-main">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="logo-search-category-wrapper">
                  <Link href="/" className="logo-area">
                    <img
                      src="/images/darkhorsenewlogolight.svg"
                      alt="logo-main"
                      className="logo"
                    />
                  </Link>
                  {/* <HeaderNav /> */}
                  <NavBar />
                  <div className="accont-wishlist-cart-area-header">
                    <div className="actions-area">
                      <div
                        className="search-btn"
                        id="search"
                        onClick={handleSearchOpen}
                      >
                        <svg
                          width={17}
                          height={16}
                          viewBox="0 0 17 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.75 14.7188L11.5625 10.5312C12.4688 9.4375 12.9688 8.03125 12.9688 6.5C12.9688 2.9375 10.0312 0 6.46875 0C2.875 0 0 2.9375 0 6.5C0 10.0938 2.90625 13 6.46875 13C7.96875 13 9.375 12.5 10.5 11.5938L14.6875 15.7812C14.8438 15.9375 15.0312 16 15.25 16C15.4375 16 15.625 15.9375 15.75 15.7812C16.0625 15.5 16.0625 15.0312 15.75 14.7188ZM1.5 6.5C1.5 3.75 3.71875 1.5 6.5 1.5C9.25 1.5 11.5 3.75 11.5 6.5C11.5 9.28125 9.25 11.5 6.5 11.5C3.71875 11.5 1.5 9.28125 1.5 6.5Z"
                            fill="#1F1F25"
                          />
                        </svg>
                      </div>
                      <div
                        className="menu-btn after-md-device-header"
                        onClick={handleMenuClick}
                      >
                        <svg
                          width={20}
                          height={16}
                          viewBox="0 0 20 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect y={14} width={20} height={2} fill="#1F1F25" />
                          <rect y={7} width={20} height={2} fill="#1F1F25" />
                          <rect width={20} height={2} fill="#1F1F25" />
                        </svg>
                      </div>
                    </div>
                    <CartCounter />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* main nav */}
      </div>
      <Sidebar />
      <BackToTop />
    </>
  )
}

export default HeaderOne
