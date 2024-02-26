import { FieldNamesMarkedBoolean, FormState } from 'react-hook-form'

export function unwrapFormStateProxy<T extends object>(formState: FormState<T>) {
  //https://github.com/react-hook-form/react-hook-form/issues/3402
  //need to unwrap Proxy object
  formState.dirtyFields?.['foo' as keyof typeof formState.dirtyFields]
  formState.isDirty === true
}

/**
 * Removes all pristine form fields from `all`, leaving only the dirty fields.
 *
 * ## Warning
 * This utility is naive to complex form structures.
 * If you have a nested form with objects or arrays as values, you're SOL.
 *
 * Great for updates 😁
 */
export function dropPristineFields<TFormData extends Record<string, any>>(
  dirty: FieldNamesMarkedBoolean<any>,
  all: TFormData
) {
  return Object.fromEntries(Object.entries(all).filter(([k]) => k in dirty && dirty[k])) as Partial<
    typeof all
  >
}

export const hasDirtyFields = (dirtyFields: FieldNamesMarkedBoolean<any>) =>
  Object.keys(dirtyFields).length > 0

export const getReactHookFormError = (errorMessage?: string | null) => {
  if (!errorMessage) return undefined

  //react hook form will give us an empty string sometimes, which is an error message
  if (
    errorMessage.trim() === '' ||
    errorMessage === 'Invalid input' ||
    errorMessage === 'Required' ||
    errorMessage === 'Invalid'
  )
    return ' '

  return errorMessage
}
