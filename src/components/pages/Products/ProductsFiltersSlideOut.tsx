'use client'

import React from 'react'
import { css } from 'styled-components'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'

import SlideOutPanel, { SlideOutPanelProps } from '@/components/SlideOutPanel'
import Button from '@/components/Button'
import AccordionFilter from '@/components/Filters/AccordionFilter'
import Filters from '@/components/Filters/Filters'
import {
  FilterDef,
  FilterOnAppliedChangeFn,
  FiltersRef,
} from '@/components/Filters/types'
import { MediaQuery } from '@/utils/mediaQueries'
import { addQueryStringParams } from '@/utils/url'

type ProductsFiltersSlideOutProps = {
  filterDefs: FilterDef[]
  onClose: () => void
  onAppliedChange?: FilterOnAppliedChangeFn
} & SlideOutPanelProps

export default function ProductsFiltersSlideOut({
  filterDefs,
  onClose,
  onAppliedChange,
  ...rest
}: ProductsFiltersSlideOutProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const filtersRef = React.useRef<FiltersRef>(null)
  const pathname = usePathname()

  return (
    <SlideOutPanel {...rest} onClose={onClose}>
      <div
        css={css`
          height: calc(100% - 90px);
          overflow-x: auto;
        `}
      >
        <div
          css={css`
            padding: 40px;

            @media (max-width: ${MediaQuery.screenMd}) {
              padding: 20px;
            }
          `}
        >
          <Filters
            ref={filtersRef}
            filterDefs={filterDefs}
            triggerMode="onApply"
            value={searchParams as any}
            onChange={(val) => {
              router.push(
                addQueryStringParams(pathname, {
                  ...searchParams,
                  ...val,
                })
              )
            }}
            onAppliedChange={onAppliedChange}
          >
            {filterDefs.map((def) => (
              <AccordionFilter
                key={`${def.type}-${def.label}`}
                filterDef={def}
              />
            ))}
          </Filters>
        </div>
      </div>
      <div
        css={css`
          padding: 20px 40px;
          display: flex;
          flex-direction: row;
          gap: 20px;
          justify-content: space-between;
          background: var(--cream);
          border-top: 1px solid var(--gray-lightest);

          @media (max-width: ${MediaQuery.screenMd}) {
            padding: 20px;
          }
        `}
      >
        <Button
          style={{ flex: 1 }}
          variant="secondary"
          onClick={(e) => {
            e.preventDefault()

            filtersRef.current?.clear()

            router.replace(pathname)

            onClose()
          }}
        >
          Clear
        </Button>
        <Button
          style={{ flex: 1 }}
          variant="primary"
          onClick={(e) => {
            e.preventDefault()

            filtersRef.current?.apply()

            onClose()
          }}
        >
          Apply
        </Button>
      </div>
    </SlideOutPanel>
  )
}
