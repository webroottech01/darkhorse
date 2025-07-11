import React from 'react'
import styled, { css } from 'styled-components'

import Icon, { IconType } from './Icon'
import Loading from './Loading'
import Typography from './Typography'

const ButtonText = styled(Typography)<
  ButtonOptions & { buttonVariant: ButtonOptions['variant'] }
>`
  color: var(--black);
  font-weight: bold;

  ${(props) =>
    props.buttonVariant === 'primary' &&
    css`
      color: var(--cream);
    `}

  ${(props) =>
    props.buttonVariant === 'secondary' &&
    css`
      color: var(--cream);
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

const ButtonIcon = styled(Icon)`
  position: relative;
  z-index: 2;

  ${(props) =>
    props.buttonVariant === 'primary' &&
    css`
      path {
        fill: var(--cream);
      }
    `}
`

const LoadingWrapper = styled.div<{
  visible?: boolean
  variant?: ButtonOptions['variant']
}>`
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.2s;
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
    className,
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
      className={active ? `${className} active` : className}
      css={css`
        color: var(--brand-primary);
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        height: 50px;
        margin-bottom: 0;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        transition-duration: 150ms;
        transition-property: background-color, border-color, box-shadow, color,
          transform;
        border-radius: 40px;
        border-width: 2px;
        border-style: solid;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        user-select: none;
        background-image: none;
        padding: 0 30px;
        outline: none;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        &:not(:disabled) {
          &:hover {
            transform: scale(1.02);
          }
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
        
    ${variant === 'primary' && //GREEN
        css`
          background-color: var(--brand-secondary);
          border-color: var(--green-dark);
          border-width: 3px;
          color: var(--cream);

          ${round &&
          css`
            border-width: 1px;
          `}

          &:not(:disabled) {
            &:hover,
            &:active,
            &:focus-visible,
            &:focus-within {
              // * {
              //   color: var(--brand-primary);
              // }

              // path {
              //   fill: var(--brand-primary);
              // }
            }

            &:focus:not(:active),
            &:focus-within:not(:active) {
              border-color: var(--cream);
              box-shadow: 0 0 0 2px var(--brand-secondary);
            }

            ${active === true &&
            css`
              background-color: var(--brand-secondary);
              border-color: var(--green-dark);
            `}
          }
        `}
    
    ${variant === 'secondary' && //BLUE
        css`
          background-color: var(--blue);
          border-color: var(--green);
          color: var(--cream);
          border-width: 3px;

          &:not(:disabled) {
            &:hover,
            &:active,
            &:focus-visible,
            &:focus-within {
              // background-color: transparent;
              // border-color: var(--green);

              // * {
              //   color: var(--cream);
              // }

              path {
                fill: var(--brand-primary);
              }
            }

            &:focus-visible {
              border-color: var(--cream);
              box-shadow: 0 0 0 2px var(--brand-primary);
            }

            ${active === true &&
            css`
              background-color: var(--gray-light);
              border-color: var(--gray-light);
              * {
                color: var(--black);
              }
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
              transform: none;
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
      {justifyIcon === 'left' && (
        <ButtonIcon
          buttonVariant={variant}
          size={size}
          {...iconDimensions}
          type={icon}
        />
      )}
      <ButtonText
        buttonVariant={variant}
        size={size ?? 'default'}
        iconSide={icon ? iconSide ?? 'left' : undefined}
        round={round}
      >
        {children}
      </ButtonText>
      {justifyIcon === 'right' && (
        <ButtonIcon size={size} {...iconDimensions} type={icon} />
      )}
    </button>
  )
}

export default React.forwardRef(Button)
