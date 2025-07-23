'use client'

import { ProductType, ProductTypeImage, ProductTypeName } from '@/types/product'
import React, { useState, MouseEvent } from 'react'

type MenuItem = {
  icon: string
  label: string
  submenu: string[] | null
}

function CategoryMenu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleMenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }


  return (
    <div>
      <ul className="category-sub-menu" id="category-active-four">
        {Object.values(ProductType).map((type) => (
          <li key={type}>
            <a className="menu-item" href={`/shop/${type.toLowerCase()}`}>
              {/* <img
                src={`/${ProductTypeImage[type]}`}
                alt={`${ProductTypeName[type]} icon`}
              /> */}
              <span>{ProductTypeName[type]}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CategoryMenu
