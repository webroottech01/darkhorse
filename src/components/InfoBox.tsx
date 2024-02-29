import React from 'react'
import styled, { css } from 'styled-components'

import Icon from './Icon'
import Typography from './Typography'

const InfoBoxDefault = styled.div<InfoBoxArgs & { backgroundColor?: string }>`
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  ${(props) => css`
    background-color: ${props.backgroundColor};
  `}
`

const InfoBoxIcon = styled(Icon)`
  margin-right: 10px;
  position: relative;
  top: -2px;
  text-align: center;

  ${(props) => css`
    & path {
      fill: ${props.iconColor};
    }
  `}
`

const InfoBoxText = styled(Typography)`
  flex: 1;
  word-break: break-word;

  & *:first-child {
    margin-top: 0;
  }
`

const CloseButton = styled(Icon)`
  margin-left: 15px;
  cursor: pointer;

  ${(props) => css`
    & path {
      fill: ${props.iconColor};
    }
  `}
`

type InfoBoxArgs = {
  type: 'success' | 'info' | 'warning' | 'danger' | 'primary'
  closeable?: boolean
  icon?: boolean
  onClose?: () => void
}

export type InfoBoxProps = InfoBoxArgs &
  React.ComponentProps<typeof InfoBoxDefault>

const typeToColor = (type: InfoBoxArgs['type']) => {
  switch (type) {
    case 'success':
      return `var(--brand-success)`
    case 'info':
      return `var(--brand-info)`
    case 'warning':
      return `var(--brand-warning)`
    case 'danger':
      return `var(--brand-danger)`
    case 'primary':
      return `var(--brand-primary)`
  }
}

const typeToBackgroundColor = (type: InfoBoxArgs['type']) => {
  switch (type) {
    case 'success':
      return `var(--brand-success-lightest)`
    case 'info':
      return `var(--brand-info-lightest)`
    case 'warning':
      return `var(--brand-warning-lightest)`
    case 'danger':
      return `var(--brand-danger-lightest)`
    case 'primary':
      return `var(--brand-primary)`
  }
}

const InfoBox = (props: InfoBoxProps) => {
  const icon = props.icon ?? true

  const closeable =
    typeof props.closeable === 'boolean' ? props.closeable : true

  let iconType

  switch (props.type) {
    case 'success':
      iconType = 'CHECK_MARK_CIRCLED_SUCCESS'
      break
    case 'info':
      iconType = 'ALERT_CIRCLED_INFO'
      break
    case 'warning':
      iconType = 'ALERT_CIRCLED_WARNING'
      break
    case 'danger':
      iconType = 'ALERT_CIRCLED_DANGER'
      break
  }

  const iconColor = typeToColor(props.type)
  const backgroundColor = typeToBackgroundColor(props.type)

  return (
    <InfoBoxDefault {...props} backgroundColor={backgroundColor}>
      {icon && (
        <InfoBoxIcon
          iconColor={iconColor}
          type={iconType}
          infoType={props.type}
          height={30}
          width={30}
        />
      )}
      <InfoBoxText>{props.children}</InfoBoxText>
      {closeable ? (
        <CloseButton
          iconColor={iconColor}
          type="CLOSE_X"
          infoType={props.type}
          height={16}
          width={16}
          onClick={props.onClose}
        />
      ) : null}
    </InfoBoxDefault>
  )
}

export default InfoBox
