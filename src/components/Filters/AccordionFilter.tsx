'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import Accordion from '../Accordion'
import Typography from '../Typography'
import {
  FilterContext,
  getActiveValuesByFilterDef,
  getAppliedFilterCount,
  getFilterResultsFromFields,
} from './utils'
import RangeFilter from './RangeFilter'
import SelectManyFilter from './SelectManyFilter'
import ToggleFilter from './ToggleFilter'
import { FilterDef } from './types'

const AccordionBody = styled.div`
  .select-many-dropdown-item {
    padding-left: 0;
    padding-right: 0;
  }
`

export default function AccordionFilter({
  filterDef,
}: {
  filterDef: FilterDef
}) {
  const filterContext = React.useContext(FilterContext)
  const { getValues, reset } = useFormContext()
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

  const onChange = React.useCallback(() => {
    if (filterContext.onChange && filterContext.triggerMode !== 'onApply') {
      const results = getFilterResultsFromFields({
        fields: getValues(),
        filterDefs: filterContext.filterDefs,
      })

      filterContext.onChange(results)

      reset(getValues())
    }
  }, [filterContext, filterDef])

  return (
    <Accordion
      style={{
        width: '100%',
        borderBottom: '1px solid var(--gray-light)',
      }}
      trigger={
        <Typography variant="label">
          {filterDef.label}
          {appliedCount && appliedCount > 0 ? (
            <Typography style={{ display: 'inline' }} variant="body-sm">
              {' '}
              ({appliedCount})
            </Typography>
          ) : null}
        </Typography>
      }
    >
      <AccordionBody>
        {filterDef.type === 'select-many' && (
          <SelectManyFilter filterDef={filterDef} onChange={onChange} />
        )}
        {filterDef.type === 'range' && (
          <RangeFilter filterDef={filterDef} onChange={onChange} />
        )}
        {filterDef.type === 'toggle' && (
          <ToggleFilter filterDef={filterDef} onChange={onChange} />
        )}
      </AccordionBody>
    </Accordion>
  )
}
