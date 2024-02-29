'use client'

import styled, { css } from 'styled-components'

import Icon from './Icon'
import Typography from './Typography'

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 1px solid var(--border-color);
  padding: 10px 0;
  height: 75px;
`

export default function SlideoutHeader({
  onClose,
  CenterText,
}: {
  onClose: () => void
  CenterText: React.ReactNode
}) {
  return (
    <Header>
      <div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 20px;
        `}
        onClick={() => onClose()}
      >
        <Icon
          type="CLOSE_X"
          height={30}
          width={30}
          css={css`
            cursor: pointer;
          `}
        />
      </div>
      {CenterText}
    </Header>
  )
}
