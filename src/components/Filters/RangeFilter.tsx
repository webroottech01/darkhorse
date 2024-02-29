'use client'

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { RangeFilterDef } from './types'
import FormInput from '../FormInput'

const RangeContainer = styled.div`
  padding: 5px 20px 10px;
  display: flex;
  gap: 10px;
`

function RangeFilter({
  filterDef,
  onChange,
}: {
  filterDef: RangeFilterDef
  onChange?: () => void
}) {
  const { control } = useFormContext()

  return (
    <RangeContainer>
      <Controller
        name={filterDef.keyMin}
        control={control}
        render={({ field }) => (
          <FormInput
            size="small"
            type="number"
            label="Min"
            value={field.value ?? ''}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name={filterDef.keyMax}
        control={control}
        render={({ field }) => (
          <FormInput
            size="small"
            type="number"
            label="Max"
            value={field.value ?? ''}
            onChange={(e) => {
              field.onChange(e)

              if (onChange) onChange()
            }}
          />
        )}
      />
    </RangeContainer>
  )
}

export default RangeFilter
