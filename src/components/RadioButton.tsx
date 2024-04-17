import { useObjectRef } from '@react-aria/utils'
import React from 'react'
import {
  useRadioGroup,
  useRadio,
  VisuallyHidden,
  useFocusRing,
  mergeProps,
  AriaRadioGroupProps,
  AriaRadioProps,
} from 'react-aria'
import { useRadioGroupState } from 'react-stately'
import { Interpolation, css } from 'styled-components'

import Button, { ButtonProps } from './Button'
import { FieldProps } from './FieldMetadata'

const RadioContext = React.createContext<null | ReturnType<
  typeof useRadioGroupState
>>(null)

type RadioButtonGroupProps = AriaRadioGroupProps & {
  children: React.ReactNode
  style?: Interpolation<React.CSSProperties>
}

function RadioButtonGroup(
  {
    children,
    errorMessage,
    style,
    ...props
  }: RadioButtonGroupProps & {
    errorMessage?: FieldProps['errorMessage']
  },
  ref: React.Ref<HTMLDivElement>
) {
  const state = useRadioGroupState(props)
  const { radioGroupProps, labelProps: _unimplementedLabelProps } =
    useRadioGroup(props, state)
  return (
    <div
      ref={ref}
      css={css`
        display: flex;
        flex-direction: row;

        ${!!style
          ? style
          : `
                  > button {
          border-radius: 0;
          border-left-width: 1px;
          border-right-width: 1px;

          &:first-child {
            border-top-left-radius: 40px;
            border-bottom-left-radius: 40px;
            border-right-width: 1px;
            border-left-width: 2px;
          }

          &:last-child {
            border-top-right-radius: 40px;
            border-bottom-right-radius: 40px;
            border-left-width: 1px;
            border-right-width: 2px;
          }
        }
        `}
      `}
      {...radioGroupProps}
    >
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
    </div>
  )
}

type RadioButtonProps = AriaRadioProps &
  ButtonProps & {
    children?: React.ReactNode
  }

function RadioButton(
  props: RadioButtonProps,
  _ref: React.Ref<HTMLInputElement>
) {
  const state = React.useContext(RadioContext) as ReturnType<
    typeof useRadioGroupState
  >
  if (state === null)
    throw new Error(
      'RadioButton must be rendered as a child of RadioButtonGroup'
    )
  const ref = useObjectRef(_ref)
  const { inputProps } = useRadio(props, state, ref)
  const { focusProps } = useFocusRing()
  const isSelected = state?.selectedValue === props.value
  const descriptionId = React.useId()
  const labelId = React.useId()

  return (
    <Button
      {...{ ...props, ref: null }}
      active={isSelected}
      variant="secondary"
      onClick={() => {
        ref.current?.click()
      }}
    >
      <VisuallyHidden>
        <input
          {...mergeProps(inputProps, focusProps)}
          ref={ref}
          aria-labelledby={labelId}
          aria-describedby={descriptionId}
        />
      </VisuallyHidden>
      {props.children}
    </Button>
  )
}
const _RadioButton = React.forwardRef(RadioButton)
const _RadioButtonGroup = React.forwardRef(RadioButtonGroup)
export { _RadioButton as RadioButton, _RadioButtonGroup as RadioButtonGroup }
