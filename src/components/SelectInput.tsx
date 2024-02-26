'use client'

import React from 'react'
import styled from 'styled-components'

import { BaseInputOutline, baseInputCss } from './BaseInput'
import { SizeToIconDimensions } from './Button'
import Icon, { IconType } from './Icon'
import Loading from './Loading'
import { getReactHookFormError } from '@/utils/formUtils'
import { FieldProps, FieldMetadata, useFieldMetadata } from './FieldMetadata'

const SelectOutline = styled(BaseInputOutline)`
  position: relative;
`

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

const SelectLoading = styled(Loading)`
  pointer-events: none;
  position: absolute;
  color: var(--brand-primary);
  right: 15px;
  top: 50%;
  left: auto;
  transform: translate(0, -50%);
`

export type SelectInputProps = FieldProps &
  React.ComponentPropsWithoutRef<'select'> & {
    icon?: IconType
    loading?: boolean
    hasLeftAdornment?: boolean
  }

function SelectInput(
  {
    icon = 'CHEVRON_DOWN',
    className,
    loading,
    style,
    children,
    disabled,
    value,
    defaultValue,
    hasLeftAdornment,
    errorMessage,
    ...props
  }: SelectInputProps,
  ref: React.Ref<HTMLSelectElement>
) {
  const { fieldProps, ...fieldMetadataProps } = useFieldMetadata(props)
  const hasError = Boolean(getReactHookFormError(errorMessage))

  return (
    <FieldMetadata {...fieldMetadataProps} className={className} style={style}>
      <SelectOutline hasError={hasError}>
        {loading ? (
          <SelectLoading size="small" />
        ) : (
          <SelectIcon type={icon} {...SizeToIconDimensions['default']} />
        )}
        <select
          {...fieldProps}
          {...props}
          ref={ref}
          css={`
            appearance: none;
            &:disabled {
              opacity: 1;
            }
            ${baseInputCss}
            ${hasLeftAdornment && 'padding-left: 6px;'}
          `}
          disabled={disabled || loading}
          value={defaultValue === undefined && loading ? 'LOADING' : value}
          defaultValue={defaultValue}
        >
          {loading ? (
            <option disabled value="LOADING">
              Loading...
            </option>
          ) : (
            children
          )}
        </select>
      </SelectOutline>
    </FieldMetadata>
  )
}
const _SelectInput = React.forwardRef(SelectInput)
export default _SelectInput
