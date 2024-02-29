import React from 'react'
import styled, { css } from 'styled-components'

export type DropdownItemProps = {
  children?: React.ReactNode
  onClick?: () => void
  as?: React.ComponentProps<typeof DropdownItemContainer>['as']
  className?: string
  onMouseEnter?: () => void
}

const DropdownItemContainer = styled.li`
  display: flex;
  cursor: pointer;
  padding: 10px 0;
  margin: 0;

  &:first-child {
    padding-top: 0;
  }

  * {
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    text-transform: capitalize;
  }

  &:focus-within {
  }
`

const DropdownItem = ({
  className,
  as,
  children,
  onClick,
  onMouseEnter,
}: DropdownItemProps) => {
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
        onMouseEnter
          ? () => onMouseEnter()
          : () => ref.current?.focus({ preventScroll: true })
      }
    >
      {children}
    </DropdownItemContainer>
  )
}

export default DropdownItem
