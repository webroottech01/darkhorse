'use client'

import React from 'react'
import { css } from 'styled-components'
import { Controller, useFormContext } from 'react-hook-form'

import { SearchFilterDef } from './types'
import { FilterContext, getFilterResultsFromFields } from './utils'
import { debounce } from '@/utils/debounce'
import FormInput from '../FormInput'
import Icon from '../Icon'

export default function SearchFilter({
  filterDef,
}: {
  filterDef: SearchFilterDef
}) {
  const filterContext = React.useContext(FilterContext)
  const { control, getValues } = useFormContext()

  const handleChanged = (callback: () => void) => {
    debounce(callback, 400)()
  }

  return (
    <Controller
      name={filterDef.key}
      control={control}
      render={({ field }) => {
        return (
          <FormInput
            aria-label="search filter"
            leftAdornment={
              <Icon height={'28px'} width={'28px'} type="SEARCH" />
            }
            placeholder="Search..."
            value={field.value ?? ''}
            size="small"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault()

              field.onChange(e)

              handleChanged(() => {
                if (filterContext.onChange) {
                  filterContext.onChange(
                    getFilterResultsFromFields({
                      fields: getValues(),
                      filterDefs: filterContext.filterDefs,
                    })
                  )
                }
              })
            }}
            css={css`
              width: 180px;
              [data-base-input-outline] {
                border-radius: 40px;
              }
              input {
                padding-left: 0;
              }
            `}
          />
        )
      }}
    />
  )
}
