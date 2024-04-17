import { CannabisType, ProductType, TerpeneType, CannabisTypeName, TerpeneName, ProductTypeName } from '@/types/product'
import React from 'react'
import styled, { css } from 'styled-components'
import Icon, { IconType } from './Icon'
import Typography, { TypographyProps } from './Typography'
import { cannabisTypeToIconType, terpeneTypeToIconType, productTypeToIconType } from '@/utils/icon'


const TagDefault = styled.span<Partial<TagProps>>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  outline: none;
  transition: background-color 0.3s ease;
  background-color: var(--white);
  white-space: nowrap;
  height: 36px;

  ${(props) =>
    props.clickable &&
    css`
      cursor: pointer;
    `}

  ${(props) =>
    !props.inline &&
    css`
      border-radius: 4px;
      border: 1px solid var(--gray-light);
      padding: 8px 15px;
    `}

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.6;
    `}

  ${(props) =>
    props.size === 'medium' &&
    css`
      padding: 5px 7px;
      height: 30px;

      * {
        font-size: 0.85rem;
      }
    `}
    
    ${(props) =>
    props.size === 'small' &&
    css`
      padding: 3px 5px;
      height: 24px;

      * {
        font-size: 0.65rem;
      }
    `}

  ${(props) =>
    props.variant === 'gray' &&
    css`
      background: var(--gray-light);

      * {
        color: var(--black);
      }
    `}

  ${(props) =>
    props.variant === 'green' &&
    css`
      border-color: var(--green);
      color: var(--green);
    `}

  ${(props) =>
    props.variant === 'red' &&
    css`
      border-color: var(--brand-danger);
      color: var(--brand-danger);
    `}

  ${(props) =>
    props.variant === 'tag-primary' &&
    css`
      border-color: var(--gray-light);
      background-color: var(--brand-primary-lightest);

      &:hover {
        background: var(--brand-primary-lighter);
      }

      * {
        color: var(--black);
      }
    `}
`

const TagIcon = styled(Icon)`
  color: var(--black);
`

const TagWithIcon = styled(TagDefault)`
  ${(props) =>
    !props.inline &&
    css`
      padding: 0 14px 0 10px;
    `}
`

const TagText = styled(Typography)`
  color: var(--black);
`

const TagTextWithIcon = styled(TagText)`
  margin-left: 5px;
`

export type TagProps = {
  text?: string
  children?: React.ReactNode
  icon?: IconType
  inline?: boolean
  clickable?: boolean
  labelTextVariant?: TypographyProps['variant']
  role?: string
  disabled?: boolean
  size?: 'small' | 'medium'
} & (
  | {
      variant?: 'default'
    }
  | {
      variant: 'cannabisType'
      type: CannabisType
    }
  | {
      variant: 'productType'
      type: ProductType
    }
  | {
      variant: 'terpeneType'
      type: TerpeneType
    }
  | {
      variant: 'gray'
    }
  | {
      variant: 'green'
    }
  | {
      variant: 'red'
    }
  | {
      variant: 'tag-primary'
    }
)

const Tag = ({
  labelTextVariant = 'body-sm',
  ...props
}: TagProps & React.ComponentPropsWithoutRef<'span'>) => {
  switch (props.variant) {
    case 'cannabisType':
      return (
        <TagWithIcon {...props}>
          <TagIcon height={20} width={20} type={cannabisTypeToIconType[props.type]}></TagIcon>
          <TagTextWithIcon variant={labelTextVariant}>
            {CannabisTypeName[props.type]}
          </TagTextWithIcon>
        </TagWithIcon>
      )
    case 'terpeneType':
      return (
        <TagWithIcon {...props}>
          <TagIcon height={20} width={20} type={terpeneTypeToIconType[props.type]}></TagIcon>
          <TagTextWithIcon variant={labelTextVariant}>{TerpeneName[props.type]}</TagTextWithIcon>
        </TagWithIcon>
      )
    case 'productType':
      return (
        <TagWithIcon {...props}>
          <TagIcon height={20} width={20} type={productTypeToIconType[props.type]}></TagIcon>
          <TagTextWithIcon variant={labelTextVariant}>
            {props.text ? props.text : ProductTypeName[props.type]}
          </TagTextWithIcon>
        </TagWithIcon>
      )
    case 'default':
    default:
      return props.icon ? (
        <TagDefault {...props}>
          <TagIcon height={20} width={20} type={props.icon}></TagIcon>
          <TagTextWithIcon variant={labelTextVariant}>{props.children}</TagTextWithIcon>
        </TagDefault>
      ) : (
        <TagDefault {...props}>
          <TagText variant={labelTextVariant}>{props.children}</TagText>
        </TagDefault>
      )
  }
}

export default Tag
