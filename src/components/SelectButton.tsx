'use client'

import React from 'react'
import styled, { css } from 'styled-components'

import { ButtonOptions, SizeToIconDimensions } from './Button'
import Icon, { IconType } from './Icon'
import { getFont, getVariantStyles } from './Typography'

const SelectIcon = styled(Icon)`
  pointer-events: none;
  position: absolute;
  color: var(--brand-primary);
  right: 15px;
  top: 50%;
  transform: translate(0, -50%);
`

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
`

const Select = styled.select<Omit<SelectButtonArgs, 'onChange'>>`
  --select-arrow-padding: 10px;
  font-family: ${getFont('body')};
  ${getVariantStyles('body')}
  font-display: swap;
  color: var(--black);
  font-weight: bold;
  appearance: none;
  height: 50px;
  transition: background-color 0.3s ease;
  border-radius: 40px;
  border-width: 2px;
  border-color: var(--gray-light);
  background: var(--white);
  padding: 0 calc(30px + var(--select-arrow-padding)) 0 30px;
  outline: none;
  font-size: ${({ size }) =>
    size === 'medium' ? '14px' : size === 'small' ? '12px' : ''};
  cursor: pointer;
  width: 100%;

  ${({ size }) =>
    size === 'medium' &&
    css`
      height: 40px;
      padding: 0 calc(18px + var(--select-arrow-padding)) 0 18px;
    `}

  ${(props) =>
    props.size === 'small' &&
    css`
      height: 30px;
      padding: 0 calc(15px + var(--select-arrow-padding)) 0 15px;
    `}

  width: ${({ size, hideText }) =>
    !hideText
      ? ''
      : size === 'small'
      ? '30px;'
      : size === 'medium'
      ? '40px'
      : '50px'};

  ${({ hideText }) =>
    hideText &&
    css`
      color: transparent;
      padding: 0;
    `}

  &:not(:disabled) {
    &:hover,
    &:active,
    &:focus,
    &:focus-within {
      background-color: var(--gray-light);
      border-color: var(--gray-light);
    }

    &:active,
    &:focus,
    &:focus-within {
      box-shadow: 0 0 2pt 1pt var(--brand-primary);
    }
  }
`

const StyledOption = styled.option`
  color: ${({ selected }) => (selected ? 'lightgrey' : 'black')};
`

type SelectButtonArgs = {
  size?: ButtonOptions['size']
  icon?: IconType
  hideText?: boolean
  onChange?: (val: string) => void
  label?: string
}

type SelectButtonProps = Omit<
  React.ComponentPropsWithRef<typeof Select> & SelectButtonArgs,
  'onClick'
>

export function SelectButton({
  size = 'default',
  hideText,
  onChange,
  icon = 'CHEVRON_DOWN',
  label,
  ...rest
}: SelectButtonProps) {
  const iconSize = size ? SizeToIconDimensions[size] : {}

  return (
    <SelectContainer>
      <Select
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation()
          e.preventDefault()
        }}
        aria-label={label}
        {...rest}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          e.stopPropagation()
          e.preventDefault()

          onChange(e.target.value)
        }}
        size={size}
        hideText={hideText}
      />
      <SelectIcon type={icon} {...iconSize} />
    </SelectContainer>
  )
}

type SelectButtonOptionArgs = {
  label: string
  value: string
}

export function SelectButtonOption({ label, ...rest }: SelectButtonOptionArgs) {
  return <StyledOption {...rest}>{label}</StyledOption>
}
