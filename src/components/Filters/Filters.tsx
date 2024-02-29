'use client'

import React from 'react'
import styled from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'

import {
  FilterDef,
  FilterOnAppliedChangeFn,
  FilterOnChangeFn,
  FilterTriggerMode,
  FiltersRef,
} from './types'
import { FilterContext, getFilterResultsFromFields } from './utils'

export type FilterResults = {
  [x: string]: string | (string | null | undefined)[] | null | undefined
}
export type FilterType = 'accordion' | 'dropdown'

const FilterContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 12px;
  padding-block: 15px;
  align-items: center;
`

const getDefaultValues = ({
  filterValues,
  filterDefs,
}: {
  filterValues: FilterResults
  filterDefs: FilterDef[]
}) => {
  const defaultValues: FilterResults = {}

  filterDefs.forEach((filterDef) => {
    if (filterDef.type === 'select-many') {
      const values = (
        filterValues[filterDef.key]
          ? Array.isArray(filterValues[filterDef.key])
            ? filterValues[filterDef.key]
            : [filterValues[filterDef.key]]
          : []
      ) as string[]

      values.forEach((value) => {
        const optionMatch = filterDef.options.find((o) => o.value === value)

        if (optionMatch) {
          defaultValues[`${filterDef.key}-${filterDef.options.indexOf(optionMatch)}`] = value
        }
      })
    } else if (filterDef.type === 'range') {
      const minValue = filterValues[filterDef.keyMin] as string
      const maxValue = filterValues[filterDef.keyMax] as string

      defaultValues[filterDef.keyMin] = minValue
      defaultValues[filterDef.keyMax] = maxValue
    } else {
      const value = filterValues[filterDef.key] as string

      defaultValues[filterDef.key] = value
    }
  })

  return defaultValues
}

function Filters(
  {
    triggerMode,
    onChange,
    onAppliedChange,
    style,
    value,
    filterDefs,
    children,
  }: {
    triggerMode?: FilterTriggerMode
    onChange?: FilterOnChangeFn
    onAppliedChange?: FilterOnAppliedChangeFn
    style?: React.CSSProperties
    value: FilterResults
    filterDefs: FilterDef[]
    children: React.ReactNode[]
  },
  ref: React.Ref<FiltersRef>
) {
  const formMethods = useForm<FilterResults>({
    defaultValues: {},
  })
  React.useEffect(() => {
    const defaultValues = getDefaultValues({
      filterValues: value,
      filterDefs,
    })

    formMethods.reset(defaultValues, {
      keepValues: true,
      keepTouched: true,
      keepIsSubmitted: true,
    })
  }, [filterDefs, value])

  const resetField = ({
    filterDef,
    fields,
  }: {
    filterDef: FilterDef
    fields: FilterResults
  }): FilterResults => {
    Object.keys(fields).forEach((key) => {
      if (filterDef.type === 'select-many') {
        //TODO: similar logic to get_Default_Values() - might be able to pull out some common code
        if (key.split('-')[0] === filterDef.key) {
          formMethods.setValue(key, undefined, {
            shouldDirty: true,
          })
        }
      } else if (filterDef.type === 'range') {
        if (key === filterDef.keyMin) {
          formMethods.setValue(filterDef.keyMin, undefined, {
            shouldDirty: true,
          })
        }
        if (key === filterDef.keyMax) {
          formMethods.setValue(filterDef.keyMax, undefined, {
            shouldDirty: true,
          })
        }
      } else {
        if (key === filterDef.key) {
          formMethods.setValue(filterDef.key, undefined, {
            shouldDirty: true,
          })
        }
      }
    })

    return formMethods.getValues()
  }

  const undoChanges = React.useCallback(() => {
    const defaultValues = getDefaultValues({
      filterValues: value,
      filterDefs,
    })

    formMethods.reset(defaultValues)
  }, [value, filterDefs])

  React.useEffect(() => {
    if (!onAppliedChange) return

    const defaultValues = getDefaultValues({
      filterDefs: filterDefs,
      filterValues: value,
    })

    const results = getFilterResultsFromFields({
      fields: defaultValues,
      filterDefs,
    })

    let total = 0

    Object.keys(results).forEach((key) => {
      const value = results[key]

      if (Array.isArray(value)) {
        total += value.length
      } else {
        total += 1
      }
    })

    onAppliedChange(total)
  }, [value, onAppliedChange])

  const activeFilters = formMethods.watch()

  React.useImperativeHandle(
    ref,
    () => {
      return {
        apply() {
          if (onChange) {
            onChange(
              getFilterResultsFromFields({
                fields: formMethods.getValues(),
                filterDefs,
              })
            )
          }
        },
        /**
         * @desc resets the filter form back to completely empty
         */
        clear() {
          formMethods.reset({})

          if (onChange) {
            onChange(
              getFilterResultsFromFields({
                fields: formMethods.getValues(),
                filterDefs,
              })
            )
          }
        },
      }
    },
    [activeFilters]
  )

  return (
    <FilterContext.Provider
      value={{
        onChange,
        triggerMode,
        filterDefs,
        resetField,
        undoChanges,
        activeValues: value,
        pendingValues: activeFilters,
      }}
    >
      <FormProvider {...formMethods}>
        <FilterContainer role="group" style={style}>
          {children}
        </FilterContainer>
      </FormProvider>
    </FilterContext.Provider>
  )
}

export default React.forwardRef(Filters)
