import React, { HTMLInputTypeAttribute } from 'react'
import { css } from 'styled-components'

import { FieldAria } from 'react-aria'
import { InputSize, InputLabelVariant } from '../BaseInput'
import Typography, { getVariantStyles } from '../Typography'
import { Simplify } from '@/types/utils'

interface _FieldMetadataProps extends Omit<FieldAria, 'fieldProps'> {
  children?: React.ReactNode
  className?: string
  label?: string
  errorMessage?: string
  description?: string
  style?: React.CSSProperties
  size?: InputSize
  type?: HTMLInputTypeAttribute
  labelVariant?: InputLabelVariant
}
export type FieldMetadataProps = Simplify<_FieldMetadataProps>
/**
 * Used to populate accessible label, description, and error messages surrounding a field.
 *
 * @example
 * function FieldInput(props) {
 *  const {fieldProps, ...fieldMetadataProps} = useFieldMetadata(props);
 *  return <FieldMetadata {...fieldMetadataProps}>
 *    <input {...fieldProps} />
 *  </FieldMetadata>
 * }
 */
function FieldMetadata(
  {
    children,
    className,
    labelProps,
    descriptionProps,
    errorMessageProps,
    label,
    description,
    errorMessage,
    style,
    size,
    type,
    labelVariant,
    ...props
  }: FieldMetadataProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      {...props}
      className={className}
      style={style}
      ref={ref}
      css={
        type === 'hidden'
          ? 'display: none;'
          : labelVariant === 'inset'
          ? css`
              position: relative;

              label {
                position: absolute;
                top: 6px;
                left: 15px;
                font-weight: 400;
                ${getVariantStyles('body-xs')}
                z-index: 1;
              }
            `
          : undefined
      }
    >
      {label ? (
        <Typography
          {...labelProps}
          as="label"
          variant={size === 'small' ? 'label-sm' : 'label'}
          css={css`
            display: block;
            margin-bottom: ${size === 'small' ? 4 : 5}px;
          `}
        >
          {label}
        </Typography>
      ) : null}
      {children}
      {errorMessage && errorMessage.trim() ? (
        <Typography
          {...errorMessageProps}
          variant="body-sm"
          css={css`
            color: var(--brand-danger);
            margin-top: ${size === 'small' ? 2 : 4}px;
          `}
        >
          {errorMessage}
        </Typography>
      ) : null}
      {description ? (
        <Typography
          {...descriptionProps}
          variant="body-sm"
          css={css`
            margin-top: ${size === 'small' ? 2 : 4}px;
          `}
        >
          {description}
        </Typography>
      ) : null}
    </div>
  )
}
const _FieldMetadata = React.forwardRef(FieldMetadata)
export { _FieldMetadata as FieldMetadata }
