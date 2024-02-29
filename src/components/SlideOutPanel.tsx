'use client'

import React from 'react'
import styled from 'styled-components'

import useKeypress, { Keys } from '../hooks/useKeyPress'

export type SlideOutPanelProps = {
  children?: React.ReactNode
  open?: boolean
  level?: number
  width?: string
  onClose?(): void
  side?: 'left' | 'right'
  'aria-labelledby'?: string
}

export const slideOutTransitionDuration = 300

const TransparentBackdrop = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const SlideOutPanelContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['level'].includes(prop),
})<{
  level: number
  open: boolean
  width?: string
  side: 'left' | 'right'
}>`
  position: fixed;
  top: 0;
  z-index: ${({ level }) => 100 + level};
  background-color: #fff;
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  overflow-y: auto;
  transition-duration: 0.2s;
  max-width: ${({ width }) => (width ? width : '900px')};
  height: 100%;
  width: 100%;

  ${(props) =>
    props.side === 'left'
      ? `
  left: ${props.open ? 0 : props.width ? `-${props.width}` : '-900px'};
  `
      : `
  right: ${props.open ? 0 : props.width ? `-${props.width}` : '-900px'};
  `}

  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
    0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
`

const Backdrop = styled.div<{ visible: boolean }>`
  position: fixed;
  z-index: 10;
  background-color: var(--dropdown-backdrop);
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};
  inset: 0;
  transition: opacity ${slideOutTransitionDuration}ms ease;
`
const SlideOutPanel = ({
  children,
  open = false,
  level = 0,
  side = 'right',
  width,
  onClose,
  ['aria-labelledby']: ariaLabelledBy,
}: SlideOutPanelProps) => {
  const [isVisible, setVisible] = React.useState(false)

  const close = () => {
    onClose?.()
  }

  useKeypress(Keys.ESCAPE, (e: KeyboardEvent) => {
    e.preventDefault()

    close()
  })

  React.useEffect(() => {
    if (open) {
      setTimeout(() => setVisible(true))

      document.body.className = 'no-scroll'
    } else {
      setVisible(false)

      document.body.className = ''
    }
  }, [open])

  return (
    <>
      <Backdrop visible={level === 0 && isVisible} />
      {isVisible && <TransparentBackdrop onClick={close} />}
      <SlideOutPanelContainer
        role="dialog"
        aria-modal="true"
        side={side}
        level={level}
        width={width}
        open={isVisible}
        aria-labelledby={ariaLabelledBy}
      >
        {children}
      </SlideOutPanelContainer>
    </>
  )
}

export default SlideOutPanel
