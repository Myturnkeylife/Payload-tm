'use client'
import type { ClientCollectionConfig, ClientGlobalConfig, SanitizedCollectionConfig } from 'payload'

import {
  type Column,
  LoadingOverlayToggle,
  Pagination,
  PerPage,
  SetViewActions,
  Table,
  useConfig,
  useDocumentInfo,
  useListQuery,
  useTranslation,
} from '@payloadcms/ui'
import { useSearchParams } from 'next/navigation.js'
import React from 'react'

export const VersionsViewClient: React.FC<{
  readonly baseClass: string
  readonly columns: Column[]
  readonly fetchURL: string
  readonly paginationLimits?: SanitizedCollectionConfig['admin']['pagination']['limits']
}> = (props) => {
  const { baseClass, columns, paginationLimits } = props

  const { collectionSlug, globalSlug } = useDocumentInfo()
  const { data, handlePageChange, handlePerPageChange } = useListQuery()

  const { getEntityConfig } = useConfig()

  const collectionConfig = getEntityConfig({ collectionSlug }) as ClientCollectionConfig
  const globalConfig = getEntityConfig({ globalSlug }) as ClientGlobalConfig

  const searchParams = useSearchParams()
  const limit = searchParams.get('limit')

  const { i18n } = useTranslation()

  const versionCount = data?.totalDocs || 0

  return (
    <React.Fragment>
      <SetViewActions
        actions={
          (collectionConfig || globalConfig)?.admin?.components?.views?.edit?.versions?.actions
        }
      />
      <LoadingOverlayToggle name="versions" show={!data} />
      {versionCount === 0 && (
        <div className={`${baseClass}__no-versions`}>
          {i18n.t('version:noFurtherVersionsFound')}
        </div>
      )}
      {versionCount > 0 && (
        <React.Fragment>
          <Table
            columns={columns}
            data={data?.docs}
            fields={(collectionConfig || globalConfig)?.fields}
          />
          <div className={`${baseClass}__page-controls`}>
            <Pagination
              hasNextPage={data.hasNextPage}
              hasPrevPage={data.hasPrevPage}
              limit={data.limit}
              nextPage={data.nextPage}
              numberOfNeighbors={1}
              onChange={handlePageChange}
              page={data.page}
              prevPage={data.prevPage}
              totalPages={data.totalPages}
            />
            {data?.totalDocs > 0 && (
              <React.Fragment>
                <div className={`${baseClass}__page-info`}>
                  {data.page * data.limit - (data.limit - 1)}-
                  {data.totalPages > 1 && data.totalPages !== data.page
                    ? data.limit * data.page
                    : data.totalDocs}{' '}
                  {i18n.t('general:of')} {data.totalDocs}
                </div>
                <PerPage
                  handleChange={handlePerPageChange}
                  limit={limit ? Number(limit) : 10}
                  limits={paginationLimits}
                />
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}