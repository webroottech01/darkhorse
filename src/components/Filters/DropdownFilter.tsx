'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import RangeFilter from './RangeFilter'
import SelectManyFilter from './SelectManyFilter'
import ToggleFilter from './ToggleFilter'
import {
  getAppliedFilterCount,
  getActiveValuesByFilterDef,
  FilterContext,
  getFilterResultsFromFields,
} from './utils'
import { FilterDef } from './types'
import Dropdown, {
  CloseDropdownProps,
  DropdownTriggerProps,
} from '../Dropdown/Dropdown'
import Link from 'next/link'
import Button from '../Button'
import Typography from '../Typography'

const FilterDropdown = styled(Dropdown).attrs({ left: true, contain: true })`
  min-width: 300px;
  max-width: 350px;
`

const FilterDropdownTrigger = ({
  label,
  appliedCount,
  toggleDropdown,
  isOpen,
}: DropdownTriggerProps & { label?: string; appliedCount: number }) => {
  return (
    <Button
      type="button"
      size="small"
      icon={isOpen ? 'CHEVRON_UP' : 'CHEVRON_DOWN'}
      iconSide="right"
      onClick={toggleDropdown}
    >
      {label}
      {appliedCount && appliedCount > 0 ? (
        <Typography style={{ display: 'inline' }} variant="body-sm">
          {' '}
          ({appliedCount})
        </Typography>
      ) : null}
    </Button>
  )
}

const FilterDropdownFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 20px 0;
  align-items: center;
`

export default function DropdownFilter({
  filterDef,
  searchable,
  searchOptions,
  searchOptionsLoading,
  onSearch,
}: {
  filterDef: FilterDef
  searchable?: boolean
  searchOptions?: {
    label: string
    value: string
  }[]
  searchOptionsLoading?: boolean
  onSearch?: (val: string) => void
}) {
  const filterContext = React.useContext(FilterContext)
  const { getValues } = useFormContext()
  const [appliedCount, setAppliedCount] = React.useState<number>(0)

  React.useEffect(() => {
    const activeFilterValues = getActiveValuesByFilterDef({
      filterDef,
      activeFilters: filterContext.activeValues,
    })

    setAppliedCount(
      getAppliedFilterCount({
        filterDef,
        activeFilterValues,
      })
    )
  }, [filterDef, filterContext.activeValues])

  return (
    <FilterDropdown
      Trigger={(props: DropdownTriggerProps) => (
        <FilterDropdownTrigger
          label={filterDef.label}
          appliedCount={appliedCount}
          {...props}
        />
      )}
      //@ts-ignore - wtf??
      position={filterDef.dropdownPosition}
      style={{ padding: '10px 0' }}
      onClose={(closeDropdownProps?: CloseDropdownProps) => {
        if (closeDropdownProps?.closedBy !== 'trigger') {
          filterContext.undoChanges()
        }
      }}
    >
      {({
        close,
      }: {
        close: (closeDropdownProps?: CloseDropdownProps) => void
      }) => (
        <section>
          <Typography
            as="h3"
            variant="label"
            css="padding: 0 20px 5px; margin: 0;"
          >
            {filterDef.label}
          </Typography>
          <div css="max-height: 300px; overflow: auto;">
            {filterDef.type === 'select-many' && (
              <SelectManyFilter
                filterDef={filterDef}
                searchable={searchable}
                searchOptions={searchOptions}
                searchOptionsLoading={searchOptionsLoading}
                onSearch={onSearch}
              />
            )}
            {filterDef.type === 'range' && (
              <RangeFilter filterDef={filterDef} />
            )}
            {filterDef.type === 'toggle' && (
              <ToggleFilter filterDef={filterDef} />
            )}
          </div>
          <FilterDropdownFooter>
            <button
              style={{ background: 'none', padding: 0, border: 'none' }}
              css="font-size: 0.8125rem;"
              onClick={() => {
                close({
                  closedBy: 'trigger',
                })

                if (filterContext.onChange) {
                  filterContext.onChange(
                    getFilterResultsFromFields({
                      fields: filterContext?.resetField({
                        filterDef,
                        fields: getValues(),
                      }),
                      filterDefs: filterContext.filterDefs,
                    })
                  )
                }
              }}
            >
              Clear
            </button>
            <Button
              size="small"
              onClick={() => {
                close({
                  closedBy: 'trigger',
                })

                if (filterContext.onChange) {
                  filterContext.onChange(
                    getFilterResultsFromFields({
                      fields: getValues(),
                      filterDefs: filterContext.filterDefs,
                    })
                  )
                }
              }}
            >
              Apply
            </Button>
          </FilterDropdownFooter>
        </section>
      )}
    </FilterDropdown>
  )
}
