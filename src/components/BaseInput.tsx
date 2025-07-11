import React from 'react'
import styled, { css } from 'styled-components'

import { getFont } from './Typography'

export type InputSize = 'medium' | 'small' | 'large'
export type InputLabelVariant = 'inset'

type BaseInputCssProps = {
  hasLeftAdornment?: boolean
  hasRightAdornment?: boolean
  elSize?: InputSize
  labelVariant?: InputLabelVariant
  readOnly?: boolean
}

const inputTimeCss = css`
  &[type='time'] {
    border: none;
    padding: 6px 15px 6px 5px;

    /* Wrapper around the hour, minute, second, and am/pm fields as well as the up and down buttons and the 'X' button */
    &::-webkit-datetime-edit-fields-wrapper {
      display: flex;
    }

    /* The space between the fields - between hour and minute, the minute and second, second and am/pm */
    &::-webkit-datetime-edit-text {
      padding: 19px 4px;
    }

    /* Hour */
    &::-webkit-datetime-edit-hour-field {
      padding: 19px 14px;

      &:focus {
        background-color: var(--gray-light);
      }
    }

    /* Minute */
    &::-webkit-datetime-edit-minute-field {
      padding: 19px 14px;

      &:focus {
        background-color: var(--gray-light);
      }
    }

    /* AM/PM */
    &::-webkit-datetime-edit-ampm-field {
      padding: 19px 14px;

      &:focus {
        background-color: var(--gray-light);
      }
    }

    &::-webkit-calendar-picker-indicator {
      display: none;
    }
  }
`

const inputRangeCss = css`
  &[type='range'] {
    appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 2px;
    background: var(--gray-light);
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      background: var(--brand-primary);
      cursor: pointer;
      border-radius: 50%;
    }

    &::-moz-range-thumb {
      width: 18px;
      height: 18px;
      background: var(--brand-primary);
      cursor: pointer;
      border-radius: 50%;
    }
  }
`

export const baseInputCss = css<BaseInputCssProps>`
  background-color: var(--cream);
  color: var(--black);
  display: block;
  font-family: ${getFont('body')};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  height: 50px;
  line-height: 1.42857143;
  padding-block: 6px;
  padding-inline: 15px;
  width: 100%;
  border: 0;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: var(--gray-lightest);
    cursor: not-allowed;
    color: var(--gray);
  }

  ${(props) =>
    props.hasLeftAdornment &&
    css`
      padding-left: 6px;
    `}

  ${(props) =>
    props.hasRightAdornment &&
    css`
      padding-right: 40px;
    `}

  ${(props) =>
    props.elSize === 'small' &&
    css`
      height: 30px;
      padding-inline: 6px;
    `};

  ${(props) =>
    props.elSize === 'medium' &&
    css`
      height: 40px;
    `}

  ${(props) =>
    props.labelVariant === 'inset' &&
    css`
      padding-top: 20px;
    `}

    ${(props) =>
    props.readOnly &&
    css`
      background-color: var(--gray-lightest);
      color: var(--black);
    `}

  ${inputTimeCss}
  ${inputRangeCss}
`

export type BaseInputProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'size' | 'value'
> & {
  hasLeftAdornment?: boolean
  hasRightAdornment?: boolean
  size?: InputSize
  labelVariant?: InputLabelVariant
  value?: string | number | readonly string[] | undefined | null
}

function BaseInput(
  { size, ...props }: BaseInputProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <input
      {...{
        ...props,
        elSize: size,
      }}
      value={props.value ?? undefined}
      ref={ref}
      css={baseInputCss}
    />
  )
}

const _BaseInput = React.forwardRef(BaseInput)

export { _BaseInput as BaseInput }

export const BaseInputOutline = styled.div.attrs({
  'data-base-input-outline': true,
})<{
  hasError: boolean
  type?: string
}>`
  display: flex;
  border: 1px solid
    var(${({ hasError }) => (hasError ? '--brand-danger' : '--gray-light')});
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  overflow: hidden;
  position: relative;

  &:focus-within {
    border-color: var(
      ${({ hasError }) => (hasError ? '--brand-danger' : '--brand-primary')}
    );
    box-shadow: 0 0 4px 0
      var(
        ${({ hasError }) => (hasError ? '--brand-danger' : '--brand-primary')}
      );
  }

  ${(props) =>
    props.type === 'range' &&
    css`
      overflow: visible;
      border: none;

      &:focus-within {
        border-color: none;
        box-shadow: none;
      }
    `}
`
