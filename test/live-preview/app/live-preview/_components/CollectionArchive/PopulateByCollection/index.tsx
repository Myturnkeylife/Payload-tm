'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'

import type { Post } from '../../../../../payload-types.js'
import type { ArchiveBlockProps } from '../../../_blocks/ArchiveBlock/types.js'

import { PAYLOAD_SERVER_URL } from '../../../_api/serverURL.js'
import { Card } from '../../Card/index.js'
import { Gutter } from '../../Gutter/index.js'
import { PageRange } from '../../PageRange/index.js'
import { Pagination } from '../../Pagination/index.js'
import classes from './index.module.scss'

type Result = {
  docs: (Post | string)[]
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number
  page: number
  prevPage: number
  totalDocs: number
  totalPages: number
}

export type Props = Omit<ArchiveBlockProps, 'blockType'> & {
  className?: string
  onResultChange?: (result: Result) => void // eslint-disable-line no-unused-vars
  showPageRange?: boolean
  sort?: string
}

export const CollectionArchiveByCollection: React.FC<Props> = (props) => {
  const {
    categories: catsFromProps,
    className,
    limit = 10,
    onResultChange,
    populatedDocs,
    populatedDocsTotal,
    relationTo,
    showPageRange,
    sort = '-createdAt',
  } = props

  const [results, setResults] = useState<Result>({
    docs: populatedDocs?.map((doc) => doc.value) || [],
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: 1,
    page: 1,
    prevPage: 1,
    totalDocs: typeof populatedDocsTotal === 'number' ? populatedDocsTotal : 0,
    totalPages: 1,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasHydrated = useRef(false)
  const [page, setPage] = useState(1)

  const scrollToRef = useCallback(() => {
    const { current } = scrollRef
    if (current) {
      // current.scrollIntoView({
      //   behavior: 'smooth',
      // })
    }
  }, [])

  useEffect(() => {
    if (!isLoading && typeof results.page !== 'undefined') {
      // scrollToRef()
    }
  }, [isLoading, scrollToRef, results])

  useEffect(() => {
    // hydrate the block with fresh content after first render
    // don't show loader unless the request takes longer than x ms
    // and don't show it during initial hydration
    const timer = setTimeout(() => {
      if (hasHydrated) {
        setIsLoading(true)
      }
    }, 500)

    const params = new URLSearchParams()

    // Add parameters with single values
    params.append('depth', '1')
    params.append('limit', String(limit))
    params.append('page', String(page))
    params.append('sort', sort)

    // Handling the 'where' part which is more complex due to nested structure
    if (catsFromProps && catsFromProps.length > 0) {
      const categories = Array.isArray(catsFromProps)
        ? catsFromProps.map((cat) => (typeof cat === 'object' && cat !== null ? cat.id : cat))
        : [catsFromProps]
      params.append('where[categories][in]', categories.join(','))
    }

    const searchQuery = params.toString()

    const makeRequest = async () => {
      try {
        const req = await fetch(`${PAYLOAD_SERVER_URL}/api/${relationTo}?${searchQuery}`)
        const json = await req.json()
        clearTimeout(timer)
        hasHydrated.current = true

        const { docs } = json as { docs: Post[] }

        if (docs && Array.isArray(docs)) {
          setResults(json)
          setIsLoading(false)
          if (typeof onResultChange === 'function') {
            onResultChange(json)
          }
        }
      } catch (err) {
        console.warn(err) // eslint-disable-line no-console
        setIsLoading(false)
        setError(`Unable to load "${relationTo} archive" data at this time.`)
      }
    }

    void makeRequest()

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [page, catsFromProps, relationTo, onResultChange, sort, limit])

  return (
    <div className={[classes.collectionArchive, className].filter(Boolean).join(' ')}>
      <div className={classes.scrollRef} ref={scrollRef} />
      {!isLoading && error && <Gutter>{error}</Gutter>}
      <Fragment>
        {showPageRange !== false && (
          <Gutter>
            <div className={classes.pageRange}>
              <PageRange
                collection={relationTo}
                currentPage={results.page}
                limit={limit}
                totalDocs={results.totalDocs}
              />
            </div>
          </Gutter>
        )}
        <Gutter>
          <div className={classes.grid}>
            {results.docs?.map((result, index) => {
              if (typeof result === 'string') {
                return null
              }

              return (
                <div className={classes.column} key={index}>
                  <Card doc={result} relationTo="posts" showCategories />
                </div>
              )
            })}
          </div>
          {results.totalPages > 1 && (
            <Pagination
              className={classes.pagination}
              onClick={setPage}
              page={results.page}
              totalPages={results.totalPages}
            />
          )}
        </Gutter>
      </Fragment>
    </div>
  )
}
