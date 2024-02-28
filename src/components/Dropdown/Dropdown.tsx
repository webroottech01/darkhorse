'use client'

import React from 'react'
import styled, { css } from 'styled-components'

const _window = typeof window !== 'undefined' ? window : null

export type DropdownTriggerProps = {
  toggleDropdown: () => void
  isOpen?: boolean
  position: NonHTMLProps['position']
}

const DropdownContainer = styled.div<Partial<NonHTMLProps>>`
  width: ${(props) => (props.fillParent ? '100%' : 'auto')};
  position: relative;
  display: flex;
  justify-content: ${(props) =>
    props.position === 'right' ? 'flex-end' : 'flex-start'};
`

const DropdownBackdrop = styled.div<
  Partial<NonHTMLProps & DropdownTriggerProps>
>`
  display: flex;
  align-items: flex-start;
  transition: background-color 100ms;
  ${(props) =>
    props.fillParent &&
    css`
      padding: 15px;
      position: absolute;
      background-color: transparent;
      left: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `}
  ${(props) =>
    props.isOpen &&
    props.fillParent &&
    css`
      background-color: var(--dropdown-backdrop);
    `}
`

const DropdownList = styled.ul<
  Pick<
    NonHTMLProps,
    'fillParent' | 'position' | 'inlineOffset' | 'blockOffset'
  > & {
    isOpen?: boolean
  }
>`
  position: absolute;
  top: calc(100% + ${(props) => props.blockOffset}px);
  background-color: var(--bg-color);
  border: 3px solid var(--blue-dark);
  width: ${(props) => (props.fillParent ? '100%' : 'auto')};
  border-radius: 4px;
  padding: 20px 30px;
  z-index: 8;
  box-shadow: 0 0 15px rgba(71, 101, 80, 0.15);
  transition: transform 0.25s, opacity 0.25s, -webkit-transform 0.25s;
  will-change: transform, opacity;
  animation-name: slideUpAndFade;
  transform: translateY(50px);
  opacity: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  list-style: none;
  color: var(--brand-primary);

  ${(props) =>
    props.isOpen &&
    `
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
  `}

  /* ARROW */
  ::after {
    content: '';
    position: absolute;
    top: -8px;
    display: block;
    background-color: var(--bg-color);
    height: 9px;
    width: 9px;
    transform: rotate(45deg);
    border-left: solid 3px var(--blue-dark);
    border-top: solid 3px var(--blue-dark);
    ${(props) =>
      props.position === 'left'
        ? css`
            left: ${props.inlineOffset}px;
          `
        : css`
            right: ${props.inlineOffset}px;
          `}
  }
`

const TriggerContainer = styled.div<Partial<DropdownProps>>`
  position: relative;
  z-index: 1;
`

export type NonHTMLProps = {
  children?:
    | React.ReactNode
    | (({ close }: { close(): void }) => React.ReactNode)
  Trigger: React.FunctionComponent<DropdownTriggerProps>
  position?: 'left' | 'right'
  fillParent?: boolean
  onClose?: (closeDropdownProps?: CloseDropdownProps) => void
  itemClickToClose?: boolean //set to TRUE to have the dropdown close when you click on a dropdown item
  inlineOffset?: number
  blockOffset?: number
}

export type DropdownProps = React.ComponentProps<typeof DropdownList> &
  NonHTMLProps

export type CloseDropdownProps = {
  closedBy?: 'click outside' | 'trigger' | 'esc' | 'blur'
}

const Dropdown = ({
  children,
  Trigger,
  position = 'left',
  fillParent,
  onClose,
  itemClickToClose,
  inlineOffset = 20,
  blockOffset = 10,
  css: _css,
  ...rest
}: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const backdropRef = React.useRef<HTMLDivElement>(null)
  const triggerContainerRef = React.useRef<HTMLDivElement>(null)
  const dropdownListRef = React.useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen((o) => {
      if (o) closeDropdown({ closedBy: 'trigger' })
      return !o
    })
  }

  const closeDropdown = (props?: CloseDropdownProps) => {
    setIsOpen((o) => {
      if (o) onClose?.(props)
      return false
    })
  }

  React.useEffect(() => {
    function handleBodyClick(e: MouseEvent) {
      if (
        !triggerContainerRef.current?.contains(e.target as Node) &&
        (!dropdownListRef.current?.contains(e.target as Node) ||
          itemClickToClose === true)
      ) {
        closeDropdown({ closedBy: 'click outside' })
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeDropdown({ closedBy: 'esc' })
        e.stopPropagation()
      }
    }
    function handleDropdownBlur(e: Event) {
      if (!dropdownListRef.current?.contains(e.target as Node)) {
        closeDropdown({ closedBy: 'blur' })
      }
    }
    _window?.document.body.addEventListener('keydown', handleKeyDown)
    _window?.document.body.addEventListener('click', handleBodyClick)
    dropdownListRef.current?.addEventListener('blur', handleDropdownBlur)

    return () => {
      _window?.document.body.removeEventListener('keydown', handleKeyDown)
      _window?.document.body.removeEventListener('click', handleBodyClick)
      dropdownListRef.current?.removeEventListener('blur', handleDropdownBlur)
    }
  }, [])

  return (
    <DropdownBackdrop
      css={_css}
      className="dispense-dropdown-backdrop"
      ref={backdropRef}
      position={position}
      fillParent={fillParent}
      isOpen={isOpen}
    >
      <DropdownContainer
        className="dispense-dropdown-container"
        fillParent={fillParent}
        position={position}
      >
        <TriggerContainer
          className="dispense-dropdown-trigger"
          position={position}
          ref={triggerContainerRef}
        >
          <Trigger
            toggleDropdown={toggleDropdown}
            isOpen={isOpen}
            position={position}
          />
        </TriggerContainer>
        <DropdownList
          {...rest}
          className="dispense-dropdown-menu"
          isOpen={isOpen}
          inlineOffset={inlineOffset}
          blockOffset={blockOffset}
          position={position}
          fillParent={fillParent}
          ref={dropdownListRef}
        >
          {typeof children === 'function'
            ? children({ close: closeDropdown })
            : children}
        </DropdownList>
      </DropdownContainer>
    </DropdownBackdrop>
  )
}

export default Dropdown
