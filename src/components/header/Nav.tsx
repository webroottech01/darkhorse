"use client"
import Link from 'next/link';
import React from 'react';
import CategoryMenu from './CategoryMenu';
// import CartCounter from '../countCart';
// import CartCount from '../countCart';
function NavItem() {
    return (
        <div>
            <nav>
                <ul className="parent-nav">
                    <li className="parent has-dropdown">
                        <Link className="nav-link" href="/">
                            Home
                        </Link>
                        
                    </li>
                    <li className="parent">
                        <Link href="/shop">Shop All</Link>
                    </li>
                    <li className="parent">
                    <div className="category-btn category-hover-header">
                    <Link href="/shop">Categories</Link>
                    <div className='headersubmenu'>
                        <CategoryMenu />
                        </div>
                    </div>
                                        
                    </li>

                    <li className="parent">
                        <Link href="/pages/about">About</Link>
                    </li>
                    
                </ul>
            </nav>
            {/* <CartCounter /> */}
           {/* sas <CartCount />  */}
        </div>
    );
}

export default NavItem;