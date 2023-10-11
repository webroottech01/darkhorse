import React from 'react'
import { FocusScope } from 'react-aria'
import styled, { css } from 'styled-components'

export type DropdownTriggerProps = {
  toggleDropdown: (e: React.MouseEvent) => void
  isOpen?: boolean
  position: NonHTMLProps['position']
}

const DropdownContainer = styled.div<Partial<NonHTMLProps>>`
  width: ${(props) => (props.fillParent ? '100%' : 'auto')};
  position: relative;
  display: flex;
  justify-content: ${(props) => (props.position === 'right' ? 'flex-end' : 'flex-start')};
`

const DropdownBackdrop = styled.div<Partial<NonHTMLProps & DropdownTriggerProps>>`
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

const DropdownList = styled.div<
  Pick<NonHTMLProps, 'fillParent' | 'position' | 'inlineOffset' | 'blockOffset'>
>`
  position: absolute;
  top: calc(100% + ${(props) => props.blockOffset}px);
  background-color: var(--white);
  width: ${(props) => (props.fillParent ? '100%' : 'auto')};
  border-radius: 4px;
  padding: 5px;
  border: 2px solid var(--gray-light);
  z-index: 8;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  animation-name: slideUpAndFade;
  ::after {
    content: '';
    position: absolute;
    top: -6px;
    display: block;
    background-color: var(--white);
    height: 9px;
    width: 9px;
    transform: rotate(45deg);
    border-left: solid 2px var(--gray-light);
    border-top: solid 2px var(--gray-light);
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
  children?: React.ReactNode | (({ close }: { close(): void }) => React.ReactNode)
  Trigger: React.FunctionComponent<DropdownTriggerProps>
  position?: 'left' | 'right'
  fillParent?: boolean
  onClose?: (closeDropdownProps?: CloseDropdownProps) => void
  itemClickToClose?: boolean //set to TRUE to have the dropdown close when you click on a dropdown item
  inlineOffset?: number
  blockOffset?: number
}

export type DropdownProps = React.ComponentProps<typeof DropdownList> & NonHTMLProps

export type CloseDropdownProps = { closedBy?: 'click outside' | 'trigger' | 'esc' | 'blur' }

const Dropdown = ({
  children,
  Trigger,
  position = 'left',
  fillParent,
  onClose,
  itemClickToClose,
  inlineOffset = 20,
  blockOffset = 10,
  /**
   * Temporary hack, we are using dropdown for two different ui patterns "Popover" and "Menu"
   * A "Popover" should trap focus, and only exit by clicking a close button or pressing escape
   * A Menu should close when focus is lost via tab
   */
  contain,
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
      e.stopPropagation()
      if (
        !triggerContainerRef.current?.contains(e.target as Node) &&
        (!dropdownListRef.current?.contains(e.target as Node) || itemClickToClose === true)
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
    document.body.addEventListener('keydown', handleKeyDown)
    document.body.addEventListener('click', handleBodyClick)
    dropdownListRef.current?.addEventListener('blur', handleDropdownBlur)
    return () => {
      document.body.removeEventListener('keydown', handleKeyDown)
      document.body.removeEventListener('click', handleBodyClick)
      dropdownListRef.current?.removeEventListener('blur', handleDropdownBlur)
    }
  }, [])

  return (
    <DropdownBackdrop ref={backdropRef} position={position} fillParent={fillParent} isOpen={isOpen}>
      <DropdownContainer fillParent={fillParent} position={position}>
        <TriggerContainer position={position} ref={triggerContainerRef}>
          <Trigger toggleDropdown={toggleDropdown} isOpen={isOpen} position={position} />
        </TriggerContainer>
        {isOpen && (
          <FocusScope autoFocus restoreFocus contain={contain}>
            <DropdownList
              {...rest}
              inlineOffset={inlineOffset}
              blockOffset={blockOffset}
              position={position}
              fillParent={fillParent}
              ref={dropdownListRef}
            >
              {typeof children === 'function' ? children({ close: closeDropdown }) : children}
            </DropdownList>
          </FocusScope>
        )}
      </DropdownContainer>
    </DropdownBackdrop>
  )
}

export default Dropdown
