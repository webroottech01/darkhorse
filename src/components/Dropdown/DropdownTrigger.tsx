import React from 'react'
import styled, { css } from 'styled-components'

import Button from '../Button'
import Typography from '../Typography'
import { DropdownTriggerProps } from './Dropdown'
import { ButtonOptions } from '../Button'
import Icon from '../Icon'

export const SelectIcon = styled(Icon)`
  pointer-events: none;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translate(0, -50%);
  margin-left: 5px;
  height: 14px;
  width: 14px;
`

export default function DropdownTrigger({
  toggleDropdown,
  children,
  ...rest
}: DropdownTriggerProps &
  ButtonOptions & {
    children: React.ReactNode
  }) {
  return (
    <Button
      {...rest}
      onClick={(e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        toggleDropdown(e)
      }}
      css={css`
        border-radius: 4px;
        border-width: 1px;
        padding: 0 36px 0 16px;

        svg {
          height: 14px;
          width: 14px;
        }
      `}
    >
      <Typography variant="body">{children}</Typography>
      <SelectIcon type="CHEVRON_DOWN"></SelectIcon>
    </Button>
  )
}
