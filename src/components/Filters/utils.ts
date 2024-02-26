'use client'

import React from 'react'
import { FilterResults } from './Filters'
import { FilterContextType, FilterDef } from './types'

export const getAppliedFilterCount = ({
  filterDef,
  activeFilterValues,
}: {
  filterDef: FilterDef
  activeFilterValues: string[]
}) => {
  if (filterDef.type === 'range') {
    return activeFilterValues.filter((x) => x).length //range filters store null values (ex. [null, 100] ==> quantityMin = 0, quantityMax = 100)
  }

  return activeFilterValues.length
}

export const getActiveValuesByFilterDef = ({
  filterDef,
  activeFilters,
}: {
  filterDef: FilterDef
  activeFilters: FilterResults
}): string[] => {
  const results = mapActiveValues({
    filterDef,
    activeFilters,
  })

  let value

  if (filterDef.type === 'range') {
    value = [activeFilters[filterDef.keyMin] ?? null, activeFilters[filterDef.keyMax] ?? null]
  } else if (filterDef.type === 'select-many') {
    value = results[filterDef.key] ?? []
  } else if (filterDef.type === 'toggle') {
    value = activeFilters[filterDef.key] ?? []
  }

  return ((value ?? []) as string[]).filter(Boolean)
}

function mapActiveValues({
  filterDef,
  activeFilters,
}: {
  filterDef: FilterDef
  activeFilters: FilterResults
}) {
  const results: Record<string, any> = {}

  Object.keys(activeFilters).forEach((key) => {
    const value = activeFilters[key]

    results[key] = Array.isArray(value) ? value : [value]
  })

  return results
}

export const FilterContext = React.createContext<FilterContextType>({
  activeValues: {},
  pendingValues: {},
  filterDefs: [],
  resetField: () => {
    return {}
  },
  undoChanges: () => {},
})

// export const getTotalApplied = ({
//   fields,
//   filterDefs,
// }: {
//   fields: FilterResults
//   filterDefs: FilterDef[]
// }) => {
//   return filterDefs
//     .map((filterDef) => {
//       return getAppliedFilterCount({
//         filterDef,
//         activeFilterValues: getActiveValuesByFilterDef({
//           filterDef,
//           activeFilters: fields,
//         }),
//       })
//     })
//     .reduce((prev, next) => prev + next)
// }

export const getFilterResultsFromFields = ({
  fields,
  filterDefs,
}: {
  fields: FilterResults
  filterDefs: FilterDef[]
}): FilterResults => {
  let keys = Object.keys(fields)

  const newValues: {
    [x: string]: string[] | string
  } = {}

  filterDefs.forEach((filterDef) => {
    keys.forEach((key) => {
      const fieldValue = fields[key] as string

      if (filterDef.type === 'select-many') {
        if (key.split('-')[0] === filterDef.key && fieldValue) {
          newValues[filterDef.key] = (newValues[filterDef.key] ?? []) as string[]
          ;(newValues[filterDef.key] as string[]).push(fieldValue)
        }
      } else if (filterDef.type === 'range') {
        if (key === filterDef.keyMin) {
          newValues[filterDef.keyMin] = fields[filterDef.keyMin] as string
        }
        if (key === filterDef.keyMax) {
          newValues[filterDef.keyMax] = fields[filterDef.keyMax] as string
        }
      } else {
        if (key === filterDef.key) {
          newValues[filterDef.key] = fieldValue
        }
      }
    })
  })

  Object.keys(newValues).forEach((key) => {
    if (newValues[key] === null || newValues[key] === undefined) {
      delete newValues[key]
    }
  })

  return newValues
}
