import React, { forwardRef } from 'react'
import styled from 'styled-components'

import Button from './Button'
import { BaseInput } from './BaseInput'

export type StepperProps = {
  onChange: (value: number) => void
  value?: number
  disabled?: boolean
  minValue?: number
  maxValue?: number
}

const NumberInput = styled(BaseInput)`
  flex-grow: 0;
  flex-shrink: 1;
  width: 40px;
  padding: 0;
  text-align: center;
  background: transparent;
  height: 30px;

  &[type='number'] {
    -webkit-appearance: textfield;
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

export default forwardRef<HTMLInputElement, StepperProps>(
  ({ value, onChange, disabled, minValue, maxValue }: StepperProps, ref) => {
    minValue = minValue ?? 0
    maxValue = maxValue ?? Infinity

    return (
      <Container>
        <Button
          aria-label="Subtract"
          disabled={disabled || (!!value && value <= minValue)}
          icon="SUBTRACT"
          round
          size="small"
          onClick={(e) => {
            e.preventDefault()

            onChange((value ?? 0) - 1)
          }}
        />
        <NumberInput
          aria-label="Quantity"
          hasLeftAdornment={false}
          value={value}
          ref={ref}
          size="small"
          type="number"
          onChange={(e) => {
            onChange(Number(e.target.value) || 1)
          }}
        />
        <Button
          aria-label="Add"
          disabled={disabled || (!!value && value >= maxValue)}
          icon="PLUS"
          round
          size="small"
          onClick={(e) => {
            e.preventDefault()

            onChange((value ?? 0) + 1)
          }}
        />
      </Container>
    )
  }
)
