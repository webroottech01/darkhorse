'use client'

import { mergeProps } from '@react-aria/utils'
import React from 'react'
import styled, { css } from 'styled-components'

import { BaseInputProps, BaseInputOutline, BaseInput } from './BaseInput'
import { FieldProps, useFieldMetadata, FieldMetadata } from './FieldMetadata'
import Icon from './Icon'
import Loading from './Loading'
import { getReactHookFormError } from '@/utils/formUtils'
import useForwardRef from '@/hooks/useForwardRef'

const LeftAdornment = styled.div`
  color: var(--gray);
  display: flex;
  align-items: center;
  padding-left: 8px;
  background-color: var(--cream);
  pointer-events: none;
`
const RightAdornment = styled.div`
  color: var(--gray);
  display: flex;
  align-items: center;
  background-color: var(--cream);
`

const ClearButton = styled.button<{ disabled?: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 15px;
  background: none;
  border: none;
  cursor: pointer;

  path {
    fill: var(--brand-primary);
  }

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}
`

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 15px;
  background: none;
  border: none;
`

export type FormInputProps = Omit<FieldProps, 'disabled'> &
  Omit<BaseInputProps, 'disabled'> & {
    leftAdornment?: React.ReactNode
    rightAdornment?: React.ReactNode
    disabled?: string | boolean
    clearable?: boolean
    handleClear?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    loading?: boolean
  }

//these are common errors from React Hook form where we really just want to highlight the field, but
//not show a weird error message
const reactHookFormErrorsToHide = [
  'Invalid input',
  'Invalid',
  'String must contain at least 1 character(s)',
]

function FormInput(
  {
    className,
    style,
    errorMessage,
    leftAdornment,
    rightAdornment,
    onChange,
    ...props
  }: FormInputProps,
  ref: React.Ref<HTMLInputElement>
) {
  errorMessage =
    errorMessage && reactHookFormErrorsToHide.includes(errorMessage)
      ? ' '
      : errorMessage

  const hasError = Boolean(getReactHookFormError(errorMessage))
  const { fieldProps, ...fieldMetadataProps } = useFieldMetadata({
    ...props,
    errorMessage: getReactHookFormError(errorMessage),
  })
  const inputRef = useForwardRef<HTMLInputElement>(ref)

  return (
    <FieldMetadata
      className={className}
      style={style}
      {...fieldMetadataProps}
      type={props.type}
      labelVariant={props.labelVariant}
      size={props.size}
    >
      <BaseInputOutline ref={ref} type={props.type} hasError={hasError}>
        {Boolean(leftAdornment) && (
          <LeftAdornment>{leftAdornment}</LeftAdornment>
        )}
        <BaseInput
          size={props.size}
          {...mergeProps(props, fieldProps)}
          onChange={onChange}
          ref={inputRef}
          disabled={Boolean(props.disabled) || props.loading}
          hasLeftAdornment={Boolean(leftAdornment)}
          hasRightAdornment={
            (Boolean(rightAdornment) || props.clearable) ?? false
          }
          labelVariant={props.labelVariant}
        />
        {Boolean(rightAdornment) && (
          <RightAdornment>{rightAdornment}</RightAdornment>
        )}
        {props.clearable && (
          <ClearButton
            disabled={Boolean(props.disabled)}
            onClick={(e) => {
              if (typeof props.handleClear === 'function') {
                props.handleClear(e)
              } else {
                e.preventDefault()

                if (props.disabled) return

                if (inputRef && inputRef.current) {
                  inputRef.current.value = ''

                  const ev = new Event('input', { bubbles: true })
                  inputRef.current.dispatchEvent(ev)

                  if (onChange) onChange(ev as any)
                }
              }
            }}
          >
            <Icon type="CLOSE_X" height={20} width={20}></Icon>
          </ClearButton>
        )}
        {props.loading && (
          <LoadingWrapper>
            <Loading
              css={css`
                top: auto;
                left: auto;
              `}
              size="small"
            />
          </LoadingWrapper>
        )}
      </BaseInputOutline>
    </FieldMetadata>
  )
}

export default React.forwardRef(FormInput)
