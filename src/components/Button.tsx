'use client'

import React from 'react'
import styled, { css } from 'styled-components'

import Icon, { IconType } from './Icon'
import Loading from './Loading'
import Typography from './Typography'

const ButtonText = styled(Typography).withConfig({
  shouldForwardProp: (prop) =>
    !['buttonVariant', 'iconSide', 'round', 'variant'].includes(prop),
})<
  Omit<ButtonOptions, 'variant'> & { buttonVariant: ButtonOptions['variant'] }
>`
  color: var(--black);
  font-weight: bold;

  ${(props) =>
    props.buttonVariant === 'primary' &&
    css`
      color: var(--white);
    `}

  ${(props) =>
    props.size === 'medium' &&
    css`
      font-size: 0.875rem;
    `}
  
  ${(props) =>
    props.size === 'small' &&
    css`
      font-size: 0.75rem;
    `}
      
  ${(props) =>
    props.round &&
    css`
      display: none;
    `}

  ${(props) =>
    props.iconSide === 'left' && props.size === 'default'
      ? css`
          margin-left: 8px;
        `
      : props.iconSide === 'left' && props.size === 'medium'
      ? css`
          margin-left: 4px;
        `
      : props.iconSide === 'left' && props.size === 'small'
      ? css`
          margin-left: 2px;
        `
      : null}
  
  ${(props) =>
    props.iconSide === 'right' && props.size === 'default'
      ? css`
          margin-right: 8px;
        `
      : props.iconSide === 'right' && props.size === 'medium'
      ? css`
          margin-right: 4px;
        `
      : props.iconSide === 'right' && props.size === 'small'
      ? css`
          margin-right: 2px;
        `
      : null}
`

const ButtonIcon = styled(Icon)<{
  buttonVariant?: ButtonOptions['variant']
  iconSide?: ButtonOptions['iconSide']
  size?: ButtonOptions['size']
}>`
  position: relative;
  z-index: 2;

  ${(props) =>
    props.buttonVariant === 'primary' &&
    css`
      path {
        fill: white;
      }
    `}
`

const LoadingWrapper = styled.div<{
  visible?: boolean
  variant?: ButtonOptions['variant']
}>`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s;
  background-color: ${({ variant }) =>
    variant === 'primary' ? 'var(--brand-primary)' : 'var(--white)'};
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ButtonLoading = styled(Loading)`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`
export const SizeToIconDimensions: {
  [key: string]: {
    height: number
    width: number
  }
} = {
  default: {
    height: 20,
    width: 20,
  },
  medium: {
    height: 17,
    width: 17,
  },
  small: {
    height: 13,
    width: 13,
  },
}
export interface ButtonOptions {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link'
  icon?: IconType
  iconSide?: 'left' | 'right'
  round?: boolean
  active?: boolean
  size?: 'default' | 'medium' | 'small'
  loading?: boolean
}

export type ButtonProps = React.ComponentProps<'button'> & ButtonOptions & {}

function Button(
  {
    iconSide,
    variant = 'secondary',
    children,
    size,
    round,
    icon,
    loading,
    disabled,
    active,
    ...rest
  }: ButtonProps,
  ref: React.Ref<HTMLButtonElement>
) {
  const iconDimensions = SizeToIconDimensions[size ?? 'default']
  const justifyIcon = icon ? iconSide ?? 'left' : undefined

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      {...rest}
      css={css`
        color: var(--brand-primary);
        position: relative;
        cursor: pointer;
        user-select: none;
        padding: 10px 10px;
        position: relative;
        height: 50px;
        width: auto;
        z-index: 2;
        border: none;
        box-sizing: border-box;

        &:active {
          top: 2px;
        }

        &:before {
          content: '';
          display: block;
          position: absolute;
          top: 10px;
          bottom: 10px;
          left: -10px;
          right: -10px;
          z-index: -1;
        }

        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 4px;
          bottom: 4px;
          left: -6px;
          right: -6px;
          z-index: -1;
        }

        /* ---------------- */

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        ${((icon && !iconSide) || iconSide === 'left') &&
        css`
          padding: 0 26px 0 22px;
        `}

        ${iconSide === 'right' &&
        css`
          padding: 0 22px 0 26px;
        `}
  
    ${size === 'medium' &&
        css`
          height: 40px;
          padding: 0 18px;
        `}
  
    ${size === 'small' &&
        css`
          height: 30px;
          padding: 0 15px;
        `}
        
    ${round &&
        css`
          max-width: 50px;
          width: 50px;
          padding: 0;
        `}
  
    ${round &&
        size === 'medium' &&
        css`
          height: 40px;
          width: 40px;
          padding: 0;
        `}
  
    ${round &&
        size === 'small' &&
        css`
          height: 30px;
          width: 30px;
          padding: 0;
        `}
        
    ${variant === 'primary' &&
        css`
          background-color: var(--brand-primary);

          &:before,
          &:after {
            background-color: var(--brand-primary);
          }

          color: var(--white);

          &:not(:disabled) {
            &:hover,
            &:active,
            &:focus-visible,
            &:focus-within {
              background-color: var(--brand-primary);
              border-color: var(--brand-primary);
            }

            &:focus:not(:active),
            &:focus-within:not(:active) {
              border-color: var(--white);
              box-shadow: 0 0 0 2px var(--brand-primary);
            }

            ${active === true &&
            css`
              background-color: var(--brand-primary);
              border-color: var(--brand-primary);
            `}
          }
        `}
    
    ${variant === 'secondary' &&
        css`
          color: var(--black);
          border-color: var(--gray-light);
          background: var(--white);

          &:not(:disabled) {
            &:hover,
            &:active,
            &:focus-visible,
            &:focus-within {
              background-color: var(--gray-lightest);
              border-color: var(--gray-light);
            }

            &:focus-visible {
              border-color: var(--white);
              box-shadow: 0 0 0 2px var(--brand-primary);
            }

            ${active === true &&
            css`
              background-color: var(--gray-light);
              border-color: var(--gray-light);
            `}
          }
        `}

    ${variant === 'tertiary' &&
        css`
          color: var(--white);
          border-color: var(--white);
          background: var(--brown);

          .button-text {
            color: var(--white);
          }

          &:not(:disabled) {
            &:hover,
            &:active,
            &:focus-visible,
            &:focus-within {
              background-color: var(--brown);
              border-color: var(--white);
            }

            &:focus-visible {
              border-color: var(--brown);
              box-shadow: 0 0 0 2px var(--brown);
            }

            ${active === true &&
            css`
              background-color: var(--brown);
              border-color: var(--white);
            `}
          }
        `}

    ${variant === 'link' &&
        css`
          background: none;
          border: none;
          color: var(--black);
          padding: 0;
          height: auto;

          &:not(:disabled) {
            &:hover,
            &:active,
            &:focus-visible,
            &:focus-within {
              color: var(--brand-primary);
            }

            ${active === true &&
            css`
              color: var(--brand-primary);
            `}
          }
        `}
      `}
    >
      <LoadingWrapper visible={loading} variant={variant}>
        <ButtonLoading size={size === 'small' ? 'xsmall' : 'small'} />
      </LoadingWrapper>
      {justifyIcon === 'left' && icon && (
        <ButtonIcon
          className="button-icon"
          buttonVariant={variant}
          size={size}
          {...iconDimensions}
          type={icon}
        />
      )}
      <ButtonText
        className="button-text"
        buttonVariant={variant}
        size={size ?? 'default'}
        iconSide={icon ? iconSide ?? 'left' : undefined}
        round={round}
      >
        {children}
      </ButtonText>
      {justifyIcon === 'right' && icon && (
        <ButtonIcon
          className="button-icon"
          size={size}
          {...iconDimensions}
          type={icon}
        />
      )}
    </button>
  )
}

export default React.forwardRef(Button)
