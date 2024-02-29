import { AriaFieldProps, useField } from 'react-aria'

export interface UseFieldMetadataProps extends Omit<AriaFieldProps, 'validationState'> {
  label?: string
  description?: string
  errorMessage?: string
  labelVariant?: 'inset'
}

export function useFieldMetadata(props: UseFieldMetadataProps) {
  const fieldMetadata = useField({
    ...props,
    validationState: props.errorMessage || props.errorMessage === '' ? 'invalid' : 'valid',
  })
  return {
    ...fieldMetadata,
    label: props.label,
    description: props.description,
    errorMessage: props.errorMessage,
    labelVariant: props.labelVariant,
  }
}
export type FieldProps = UseFieldMetadataProps
