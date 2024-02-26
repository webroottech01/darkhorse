'use client'

import React from 'react'
import { Control, Controller, useFormContext } from 'react-hook-form'
import { css } from 'styled-components'

import { SelectManyFilterDef } from './types'
import { debounce } from '@/utils/debounce'
import DropdownItem from '../Dropdown/DropdownItem'
import FormInput from '../FormInput'
import Icon from '../Icon'
import Loading from '../Loading'
import Checkbox from '../Checkbox'

function SelectManyFilter({
  filterDef,
  onChange,
  searchable,
  searchOptions,
  searchOptionsLoading,
  onSearch,
}: {
  filterDef: SelectManyFilterDef
  onChange?: () => void
  searchable?: boolean
  searchOptions?: {
    label: string
    value: string
  }[]
  searchOptionsLoading?: boolean
  onSearch?: (val: string) => void
}) {
  const { control } = useFormContext()

  const handleChanged = (callback: () => void) => {
    debounce(callback, 400)()
  }

  return (
    <div css="padding-inline: 5px;">
      {!!searchable && (
        <div
          css={css`
            padding: 5px 15px;
          `}
        >
          <FormInput
            aria-label="search filter"
            leftAdornment={
              <Icon height={'28px'} width={'28px'} type="SEARCH" />
            }
            placeholder="Search..."
            size="small"
            rightAdornment={
              searchOptionsLoading ? (
                <Loading
                  style={{ top: 'auto', left: '-5px', paddingRight: '10px' }}
                  size="xsmall"
                />
              ) : null
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault()

              handleChanged(() => {
                onSearch?.(e.target.value)
              })
            }}
          />
        </div>
      )}
      {searchOptionsLoading && (
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px 0;
          `}
        >
          <Loading size="xsmall" />
        </div>
      )}
      {(searchOptions ?? filterDef.options).map((option, i) => {
        return (
          <Controller
            key={`${filterDef.key}-${option.value}`}
            name={`${filterDef.key}-${i}`}
            control={control}
            render={({ field }) => {
              return (
                <DropdownItem as="div" className="select-many-dropdown-item">
                  <Checkbox
                    style={{ width: '100%' }}
                    checked={!!field.value}
                    onCheck={(checked) => {
                      field.onChange(checked ? option.value : null)

                      if (onChange) onChange()
                    }}
                  >
                    {option.label}
                  </Checkbox>
                </DropdownItem>
              )
            }}
          />
        )
      })}
    </div>
  )
}

export default SelectManyFilter
