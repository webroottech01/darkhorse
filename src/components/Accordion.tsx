'use client'

import React from 'react'
import styled, { CSSProp } from 'styled-components'

import Button from './Button'
import { fadeIn } from '@/constants/animations'

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
  css,
}: AccordionProps) {
  const [isOpen, setOpen] = React.useState(false)

  console.log('css', css)

  return (
    <div style={style} css={css}>
      <AccordionTrigger
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()

          setOpen(!isOpen)
        }}
      >
        {trigger}
        <Button
          size="small"
          round
          icon={isOpen ? 'SUBTRACT' : 'PLUS'}
          iconSide="right"
        />
      </AccordionTrigger>
      {isOpen && <AccordionBody>{children}</AccordionBody>}
    </div>
  )
}
