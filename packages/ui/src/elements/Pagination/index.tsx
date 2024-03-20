'use client'
import { usePathname, useRouter } from 'next/navigation.js'
import queryString from 'qs'
import React from 'react'

import { useSearchParams } from '../../providers/SearchParams/index.js'
import { ClickableArrow } from './ClickableArrow/index.js'
import { Page } from './Page/index.js'
import { Separator } from './Separator/index.js'
import './index.scss'

const nodeTypes = {
  ClickableArrow,
  Page,
  Separator,
}

const baseClass = 'paginator'

export type PaginationProps = {
  disableHistoryChange?: boolean
  hasNextPage?: boolean
  hasPrevPage?: boolean
  limit?: number
  nextPage?: number
  numberOfNeighbors?: number
  onChange?: (page: number) => void
  page?: number
  prevPage?: number
  totalPages?: number
}

export type Node =
  | {
      props?: {
        direction?: 'left' | 'right'
        isDisabled?: boolean
        isFirstPage?: boolean
        isLastPage?: boolean
        page?: number
        updatePage: (page?: number) => void
      }
      type: 'ClickableArrow' | 'Page' | 'Separator'
    }
  | number

export const Pagination: React.FC<PaginationProps> = (props) => {
  const router = useRouter()
  const { searchParams } = useSearchParams()
  const pathname = usePathname()

  const {
    disableHistoryChange = false,
    hasNextPage = false,
    hasPrevPage = false,
    nextPage = null,
    numberOfNeighbors = 1,
    onChange,
    page: currentPage,
    prevPage = null,
    totalPages = null,
  } = props

  if (!totalPages || totalPages <= 1) return null

  const updatePage = (page) => {
    if (!disableHistoryChange) {
      const newParams = {
        ...searchParams,
      }

      newParams.page = page
      router.push(pathname + queryString.stringify(newParams, { addQueryPrefix: true }))
    }

    if (typeof onChange === 'function') onChange(page)
  }

  // Create array of integers for each page
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  // Assign indices for start and end of the range of pages that should be shown in paginator
  let rangeStartIndex = currentPage - 1 - numberOfNeighbors

  // Sanitize rangeStartIndex in case it is less than zero for safe split
  if (rangeStartIndex <= 0) rangeStartIndex = 0

  const rangeEndIndex = currentPage - 1 + numberOfNeighbors + 1

  // Slice out the range of pages that we want to render
  const nodes: Node[] = pages.slice(rangeStartIndex, rangeEndIndex)

  // Add prev separator if necessary
  if (currentPage - numberOfNeighbors - 1 >= 2) nodes.unshift({ type: 'Separator' })
  // Add first page if necessary
  if (currentPage > numberOfNeighbors + 1) {
    nodes.unshift({
      type: 'Page',
      props: {
        isFirstPage: true,
        page: 1,
        updatePage,
      },
    })
  }

  // Add next separator if necessary
  if (currentPage + numberOfNeighbors + 1 < totalPages) nodes.push({ type: 'Separator' })
  // Add last page if necessary
  if (rangeEndIndex < totalPages) {
    nodes.push({
      type: 'Page',
      props: {
        isLastPage: true,
        page: totalPages,
        updatePage,
      },
    })
  }

  // Add prev and next arrows based on necessity
  nodes.unshift({
    type: 'ClickableArrow',
    props: {
      direction: 'right',
      isDisabled: !hasNextPage,
      updatePage: () => updatePage(nextPage),
    },
  })

  nodes.unshift({
    type: 'ClickableArrow',
    props: {
      direction: 'left',
      isDisabled: !hasPrevPage,
      updatePage: () => updatePage(prevPage),
    },
  })

  return (
    <div className={baseClass}>
      {nodes.map((node, i) => {
        if (typeof node === 'number') {
          return (
            <Page isCurrent={currentPage === node} key={i} page={node} updatePage={updatePage} />
          )
        }

        const NodeType = nodeTypes[node.type]

        return <NodeType key={i} {...node.props} />
      })}
    </div>
  )
}
