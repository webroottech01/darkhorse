import React from 'react'
import styled, { css } from 'styled-components'

export type DropdownItemProps = {
  children?: React.ReactNode
  onClick?: () => void
  as?: React.ComponentProps<typeof DropdownItemContainer>['as']
  className?: string
  onMouseEnter?: () => void
}

const DropdownItemContainer = styled.button`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  border-bottom: var(--gray-lightest);
  border-radius: 4px;
  border: 1px solid transparent;

  * {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &:focus-within {
    background-color: var(--gray-lightest);
  }
`

const DropdownItem = ({ className, as, children, onClick, onMouseEnter }: DropdownItemProps) => {
  const ref = React.useRef<HTMLButtonElement>(null)
  return (
    <DropdownItemContainer
      className={className}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (onClick) onClick()
      }}
      as={as}
      ref={ref}
      onMouseEnter={
        onMouseEnter ? () => onMouseEnter() : () => ref.current?.focus({ preventScroll: true })
      }
    >
      {children}
    </DropdownItemContainer>
  )
}

export default DropdownItem
