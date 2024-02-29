'use client'

import { DropdownProps } from '../Dropdown/Dropdown'
import { FilterResults } from './Filters'

export type FiltersRef = {
  apply: () => void
  clear: () => void
}

export type RangeFilterDef = {
  label: string
  keyMin: string
  keyMax: string
  type: 'range'
}

export type FilterOption = {
  label: string
  value: string | boolean
}

export type SelectManyFilterDef = {
  label: string
  type: 'select-many'
  key: string
  options: FilterOption[]
}

export type SearchFilterDef = {
  key: string
  type: 'search'
}

export type ToggleFilterDef = {
  key: string
  type: 'toggle'
}

export type FilterDef = (
  | RangeFilterDef
  | SelectManyFilterDef
  | ToggleFilterDef
  | SearchFilterDef
) & {
  label?: string
  dropdownPosition?: DropdownProps['position']
}

export type FilterTriggerMode = 'onChange' | 'onApply'

export type FilterOnChangeFn = (filters: FilterResults) => void
export type FilterOnAppliedChangeFn = (n: number) => void

export type FilterContextType = {
  activeValues: FilterResults
  pendingValues: FilterResults
  onChange?: FilterOnChangeFn
  resetField: ({
    filterDef,
    fields,
  }: {
    filterDef: FilterDef
    fields: FilterResults
  }) => FilterResults
  undoChanges: () => void
  triggerMode?: FilterTriggerMode
  filterDefs: FilterDef[]
}
