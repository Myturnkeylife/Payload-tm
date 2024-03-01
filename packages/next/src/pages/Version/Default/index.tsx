'use client'
import type { Option } from '@payloadcms/ui'

import {
  Gutter,
  SetViewActions,
  formatDate,
  useComponentMap,
  useConfig,
  usePayloadAPI,
  useTranslation,
} from '@payloadcms/ui'
import React, { useState } from 'react'

import type { CompareOption, DefaultVersionsViewProps } from './types'

import RenderFieldsToDiff from '../RenderFieldsToDiff'
import diffComponents from '../RenderFieldsToDiff/fields'
import Restore from '../Restore'
import { SelectComparison } from '../SelectComparison'
import { SelectLocales } from '../SelectLocales'
import { mostRecentVersionOption } from '../shared'
import { SetStepNav } from './SetStepNav'
import './index.scss'

const baseClass = 'view-version'

export const DefaultVersionView: React.FC<DefaultVersionsViewProps> = ({
  id,
  collectionSlug,
  doc,
  docPermissions,
  globalSlug,
  initialComparisonDoc,
  localeOptions,
  mostRecentDoc,
  publishedDoc,
  versionID,
}) => {
  const config = useConfig()

  const { i18n } = useTranslation()

  const { getComponentMap, getFieldMap } = useComponentMap()

  const componentMap = getComponentMap({ collectionSlug, globalSlug })

  const [fieldMap] = useState(() => getFieldMap({ collectionSlug, globalSlug }))

  const [collectionConfig] = useState(() =>
    config.collections.find((collection) => collection.slug === collectionSlug),
  )

  const [globalConfig] = useState(() => config.globals.find((global) => global.slug === globalSlug))

  const [locales, setLocales] = useState<Option[]>(localeOptions)
  const [compareValue, setCompareValue] = useState<CompareOption>(mostRecentVersionOption)

  const {
    admin: { dateFormat },
    localization,
    routes: { api: apiRoute },
    serverURL,
  } = config

  const formattedCreatedAt = doc?.createdAt
    ? formatDate(doc.createdAt, dateFormat, i18n.language)
    : ''

  const originalDocFetchURL = `${serverURL}${apiRoute}${globalSlug ? 'globals/' : ''}/${
    collectionSlug || globalSlug
  }${collectionSlug ? `/${id}` : ''}`

  const compareBaseURL = `${serverURL}${apiRoute}/${globalSlug ? 'globals/' : ''}${
    collectionSlug || globalSlug
  }/versions`

  const compareFetchURL =
    compareValue?.value === 'mostRecent' || compareValue?.value === 'published'
      ? originalDocFetchURL
      : `${compareBaseURL}/${compareValue.value}`

  const [{ data: currentComparisonDoc }] = usePayloadAPI(compareFetchURL, {
    initialData: initialComparisonDoc,
    initialParams: { depth: 1, draft: 'true', locale: '*' },
  })

  const comparison =
    compareValue?.value === 'mostRecent'
      ? mostRecentDoc
      : compareValue?.value === 'published'
        ? publishedDoc
        : currentComparisonDoc?.version // the `version` key is only present on `versions` documents

  const canUpdate = docPermissions?.update?.permission

  return (
    <main className={baseClass}>
      <SetViewActions actions={componentMap?.actionMap?.Edit?.Version} />
      <SetStepNav
        collectionConfig={collectionConfig}
        collectionSlug={collectionSlug}
        doc={doc}
        fieldMap={fieldMap}
        globalSlug={globalSlug}
        id={id}
        mostRecentDoc={mostRecentDoc}
      />
      <Gutter className={`${baseClass}__wrap`}>
        <div className={`${baseClass}__header-wrap`}>
          <p className={`${baseClass}__created-at`}>
            {i18n.t('version:versionCreatedOn', {
              version: i18n.t(doc?.autosave ? 'version:autosavedVersion' : 'version:version'),
            })}
          </p>
          <header className={`${baseClass}__header`}>
            <h2>{formattedCreatedAt}</h2>
            {canUpdate && (
              <Restore
                className={`${baseClass}__restore`}
                collectionSlug={collectionSlug}
                globalSlug={globalSlug}
                label={collectionConfig?.labels.singular || globalConfig?.label}
                originalDocID={id}
                versionDate={formattedCreatedAt}
                versionID={versionID}
              />
            )}
          </header>
        </div>
        <div className={`${baseClass}__controls`}>
          <SelectComparison
            baseURL={compareBaseURL}
            onChange={setCompareValue}
            parentID={id}
            publishedDoc={publishedDoc}
            value={compareValue}
            versionID={versionID}
          />
          {localization && (
            <SelectLocales onChange={setLocales} options={localeOptions} value={locales} />
          )}
        </div>
        {doc?.version && (
          <RenderFieldsToDiff
            comparison={comparison}
            diffComponents={diffComponents}
            fieldMap={fieldMap}
            fieldPermissions={docPermissions?.fields}
            i18n={i18n}
            locales={
              locales
                ? locales.map(({ label }) => (typeof label === 'string' ? label : undefined))
                : []
            }
            version={doc?.version}
          />
        )}
      </Gutter>
    </main>
  )
}
