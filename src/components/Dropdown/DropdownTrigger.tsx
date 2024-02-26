import React from 'react'
import { css } from 'styled-components'

import { DropdownTriggerProps } from './Dropdown'
import Button, { ButtonOptions } from '../Button'
import Typography from '../Typography'
import { SelectIcon } from '../SelectInput'

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

        toggleDropdown()
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
