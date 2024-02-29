'use client'

import React from 'react'
import styled, { css } from 'styled-components'

import Icon from './Icon'
import Typography from './Typography'

const ToggleContainer = styled.div<ToggleProps>`
  --unknown-gray: #a2a8b3;
  border-radius: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60px;
  height: 30px;
  position: relative;
  transition: background-color 150ms ease;
  background-color: ${({ toggled }) =>
    toggled ? 'var(--brand-primary)' : 'var(--unknown-gray)'};
  cursor: pointer;
`

const Handle = styled.button<ToggleProps>`
  outline: none;
  background-color: var(--white);
  height: 30px;
  width: 30px;
  border-radius: 50%;
  position: absolute;
  transition: left 150ms ease, border-color 150ms ease, box-shadow 150ms ease;

  &:focus-visible {
    border-color: var(--brand-primary);
    box-shadow: 0 0 0 1pt var(--white);
  }
  border: 2px solid
    ${(props) =>
      props.toggled ? 'var(--brand-primary)' : 'var(--unknown-gray)'};
  ${(props) => (props.toggled ? 'left: 30px;' : 'left: 0;')}
`

const OffIcon = styled(Icon)`
  color: var(--white);
  margin-right: 12px;
`

const OnIcon = styled(Icon)`
  color: var(--white);
  margin-left: 12px;
`

export type ToggleProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  toggled?: boolean
  defaultToggled?: boolean
  onChange?(toggled: boolean): void
  label?: string
  errorMessage?: string
}

const Toggle = ({
  toggled,
  onChange,
  defaultToggled,
  label,
  errorMessage,
  ...rest
}: ToggleProps) => {
  const checkboxId = React.useId()
  const [uncontrolledToggled, setUnControlledToggled] = React.useState(
    !!defaultToggled
  )
  const on = toggled ?? uncontrolledToggled

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    const newState = !on

    if (defaultToggled !== undefined) {
      setUnControlledToggled(newState)
    }

    onChange?.(newState)
  }

  return (
    <div
      css={`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
      `}
    >
      <ToggleContainer
        id={checkboxId}
        role="switch"
        aria-checked={on}
        toggled={on}
        onClick={toggle}
      >
        <input
          {...rest}
          tabIndex={-1}
          type="hidden"
          value={on ? 'on' : 'off'}
        />
        <OnIcon type="CHECK_MARK" height={16} width={16} />
        <OffIcon type="CLOSE_X" height={16} width={16} />
        <Handle toggled={on} onClick={toggle} type="button" />
      </ToggleContainer>
      {label ? (
        <Typography
          as="label"
          htmlFor={checkboxId}
          variant="label"
          css={css`
            margin: 0;
            ${!!errorMessage
              ? css`
                  color: var(--brand-danger);
                `
              : null}
          `}
        >
          {label}
        </Typography>
      ) : null}
    </div>
  )
}

export default Toggle
