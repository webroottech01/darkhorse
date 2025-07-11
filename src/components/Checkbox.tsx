'use client'

import React from 'react'
import { css } from 'styled-components'

import { getReactHookFormError } from '../utils/formUtils'
import { Simplify } from '@/types/utils'
import Icon from './Icon'
import Typography from './Typography'

export type CheckboxProps = Simplify<
  React.ComponentPropsWithoutRef<'button'> & {
    checked?: boolean
    onCheck?(checked: boolean): void
    children?: React.ReactNode
    size?: 'small'
    errorMessage?: string
  }
>

function Checkbox(
  {
    checked = false,
    onCheck,
    size,
    children,
    errorMessage,
    ...rest
  }: CheckboxProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const hasError = Boolean(getReactHookFormError(errorMessage))

  return (
    <button
      ref={ref}
      role="checkbox"
      aria-checked={checked}
      type="button"
      onClick={() => onCheck?.(!checked)}
      {...rest}
      css={css`
        display: grid;
        grid-template-columns: 24px auto;
        gap: ${size === 'small' ? 5 : 10}px;
        align-items: center;
        justify-content: flex-start;
        background-color: transparent;
        border: 0;
        padding: 0;
        outline: none;

        &:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* Hacky way to select checkbox "box" element. Sry. */
        :focus [aria-hidden] {
          border-color: var(--brand-primary);
        }
      `}
    >
      <div
        aria-hidden
        css={css`
          border: solid 1px
            ${hasError
              ? 'var(--brand-danger)'
              : checked
              ? 'var(--brand-primary)'
              : 'var(--gray-light)'};
          border-radius: 4px;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--cream);
          background-color: ${checked
            ? 'var(--brand-primary)'
            : 'var(--cream)'};
          transition: background-color 0.15s, border 0.15s;
          ${size === 'small'
            ? css`
                height: 20px;
                width: 20px;
                svg {
                  height: 15px;
                  width: 15px;
                }
              `
            : css`
                height: 24px;
                width: 24px;
                svg {
                  height: 18px;
                  width: 18px;
                }
              `}
        `}
      >
        <Icon type="CHECK_MARK" />
      </div>
      <Typography
        css={css`
          text-align: left;
          ${size === 'small' && 'font-size: 0.8125rem;'};
          cursor: pointer;

          * {
            color: ${hasError ? 'var(--brand-danger)' : 'var(--black)'};
          }
        `}
      >
        {children}
      </Typography>
    </button>
  )
}

export default React.forwardRef(Checkbox)
