'use client'

import React from 'react'
import styled, { CSSProp, css } from 'styled-components'

import Button from './Button'
import { fadeIn } from '@/constants/animations'
import Icon from './Icon'

export type AccordionProps = {
  trigger: React.ReactNode
  children: React.ReactNode
  style?: React.CSSProperties
  css?: CSSProp
}

const AccordionTrigger = styled.div`
  padding: 0 0 10px 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const AccordionBody = styled.div`
  animation-name: ${fadeIn};
  animation-duration: 500ms;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
`

export default function Accordion({
  trigger,
  children,
  style,
  css: cssProp,
}: AccordionProps) {
  const [isOpen, setOpen] = React.useState(false)

  return (
    <div style={style} css={cssProp}>
      <AccordionTrigger
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()

          setOpen(!isOpen)
        }}
      >
        {trigger}
        <button
          css={css`
            all: unset;
          `}
        >
          <Icon
            height={20}
            width={20}
            type={isOpen ? 'CHEVRON_UP' : 'CHEVRON_DOWN'}
          />
        </button>
      </AccordionTrigger>
      {isOpen && <AccordionBody>{children}</AccordionBody>}
    </div>
  )
}
