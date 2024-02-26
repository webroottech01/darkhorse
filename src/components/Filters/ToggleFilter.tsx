'use client'

import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { ToggleFilterDef } from './types'
import Toggle from '../Toggle'

const ToggleContainer = styled.div`
  padding: 10px 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
`

function ToggleFilter({
  filterDef,
  onChange,
}: {
  filterDef: ToggleFilterDef
  onChange?: () => void
}) {
  const { control } = useFormContext()

  return (
    <ToggleContainer>
      <Controller
        name={filterDef.key}
        control={control}
        render={({ field }) => {
          const value = !field.value || field.value === 'false' ? false : true

          return (
            <Toggle
              toggled={value}
              onChange={(e) => {
                field.onChange(e)

                if (onChange) onChange()
              }}
            />
          )
        }}
      />
    </ToggleContainer>
  )
}

export default ToggleFilter
