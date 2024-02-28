'use client'
import type { PaginatedDocs, TypeWithVersion } from 'payload/database'
import type { TypeWithTimestamps } from 'payload/types'
import type { DocumentPermissions, DocumentPreferences, TypeWithID, Where } from 'payload/types'

import qs from 'qs'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import type { DocumentInfo, DocumentInfoContext, DocumentInfoProps } from './types'

import { useAuth } from '../Auth'
import { useConfig } from '../Config'
import { useLocale } from '../Locale'
import { usePreferences } from '../Preferences'
import { useTranslation } from '../Translation'

const Context = createContext({} as DocumentInfoContext)

export const useDocumentInfo = (): DocumentInfoContext => useContext(Context)

/**
 * To initialize documentInfo from the server
 * use the <SetDocumentInfo /> within a RSC component
 * to hydrate the documentInfo on the first render.
 *
 * Otherwise pass props to initialize the documentInfo.
 **/
export const DocumentInfoProvider: React.FC<
  DocumentInfoProps & {
    children: React.ReactNode
  }
> = ({ children, ...rest }) => {
  const [documentInfo, setDocumentInfo] = useState<DocumentInfo>({
    ...rest,
  })

  const { id, collectionSlug, globalSlug } = documentInfo

  const {
    collections,
    globals,
    routes: { api },
    serverURL,
  } = useConfig()

  const collectionConfig = collections.find((c) => c.slug === collectionSlug)
  const globalConfig = globals.find((g) => g.slug === globalSlug)
  const docConfig = collectionConfig || globalConfig
  const versionsConfig = docConfig?.versions

  const { getPreference, setPreference } = usePreferences()
  const { i18n } = useTranslation()
  const { permissions } = useAuth()
  const { code } = useLocale()
  const [publishedDoc, setPublishedDoc] = useState<TypeWithID & TypeWithTimestamps>(null)
  const [versions, setVersions] = useState<PaginatedDocs<TypeWithVersion<any>>>(null)

  const [unpublishedVersions, setUnpublishedVersions] =
    useState<PaginatedDocs<TypeWithVersion<any>>>(null)

  const [title, setTitle] = useState<string>('')

  const setDocumentTitle = useCallback<DocumentInfoContext['setDocumentTitle']>(
    (title) => {
      setTitle(title || id?.toString() || '[untitled]')
    },
    [id],
  )

  const baseURL = `${serverURL}${api}`
  let slug: string
  let pluralType: 'collections' | 'globals'
  let preferencesKey: string

  if (globalSlug) {
    slug = globalSlug
    pluralType = 'globals'
    preferencesKey = `global-${slug}`
  }

  if (collectionSlug) {
    slug = collectionSlug
    pluralType = 'collections'

    if (id) {
      preferencesKey = `collection-${slug}-${id}`
    }
  }

  const [docPermissions, setDocPermissions] = useState<DocumentPermissions>(
    permissions[pluralType][slug],
  )

  const getVersions = useCallback(async () => {
    let versionFetchURL
    let publishedFetchURL
    const shouldFetchVersions = Boolean(versionsConfig)
    let unpublishedVersionJSON = null
    let versionJSON = null
    let shouldFetch = true

    const versionParams = {
      depth: 0,
      where: {
        and: [],
      },
    }

    const publishedVersionParams: { depth: number; locale: string; where: Where } = {
      depth: 0,
      locale: code || undefined,
      where: {
        and: [
          {
            or: [
              {
                _status: {
                  equals: 'published',
                },
              },
              {
                _status: {
                  exists: false,
                },
              },
            ],
          },
        ],
      },
    }

    if (globalSlug) {
      versionFetchURL = `${baseURL}/globals/${globalSlug}/versions`
      publishedFetchURL = `${baseURL}/globals/${globalSlug}?${qs.stringify(publishedVersionParams)}`
    }

    if (collectionSlug) {
      versionFetchURL = `${baseURL}/${collectionSlug}/versions`

      publishedVersionParams.where.and.push({
        id: {
          equals: id,
        },
      })

      publishedFetchURL = `${baseURL}/${collectionSlug}?${qs.stringify(publishedVersionParams)}`

      if (!id) {
        shouldFetch = false
      }

      versionParams.where.and.push({
        parent: {
          equals: id,
        },
      })
    }

    if (shouldFetch) {
      let publishedJSON

      if (versionsConfig?.drafts) {
        publishedJSON = await fetch(publishedFetchURL, {
          credentials: 'include',
          headers: {
            'Accept-Language': i18n.language,
          },
        }).then((res) => res.json())

        if (collectionSlug) {
          publishedJSON = publishedJSON?.docs?.[0]
        }
      }

      if (shouldFetchVersions) {
        versionJSON = await fetch(`${versionFetchURL}?${qs.stringify(versionParams)}`, {
          credentials: 'include',
          headers: {
            'Accept-Language': i18n.language,
          },
        }).then((res) => res.json())

        if (publishedJSON?.updatedAt) {
          const newerVersionParams = {
            ...versionParams,
            where: {
              ...versionParams.where,
              and: [
                ...versionParams.where.and,
                {
                  updatedAt: {
                    greater_than: publishedJSON?.updatedAt,
                  },
                },
              ],
            },
          }

          // Get any newer versions available
          const newerVersionRes = await fetch(
            `${versionFetchURL}?${qs.stringify(newerVersionParams)}`,
            {
              credentials: 'include',
              headers: {
                'Accept-Language': i18n.language,
              },
            },
          )

          if (newerVersionRes.status === 200) {
            unpublishedVersionJSON = await newerVersionRes.json()
          }
        }
      }

      setPublishedDoc(publishedJSON)
      setVersions(versionJSON)
      setUnpublishedVersions(unpublishedVersionJSON)
    }
  }, [i18n, globalSlug, collectionSlug, id, baseURL, code, versionsConfig])

  const getDocPermissions = React.useCallback(async () => {
    let docAccessURL: string
    const params = {
      locale: code || undefined,
    }
    if (pluralType === 'globals') {
      docAccessURL = `/globals/${slug}/access`
    } else if (pluralType === 'collections' && id) {
      docAccessURL = `/${slug}/access/${id}`
    }

    if (docAccessURL) {
      const res = await fetch(`${serverURL}${api}${docAccessURL}?${qs.stringify(params)}`, {
        credentials: 'include',
        headers: {
          'Accept-Language': i18n.language,
        },
      })
      const json = await res.json()
      setDocPermissions(json)
    } else {
      // fallback to permissions from the entity type
      // (i.e. create has no id)
      setDocPermissions(permissions?.[pluralType]?.[slug])
    }
  }, [serverURL, api, pluralType, slug, id, permissions, i18n.language, code])

  const getDocPreferences = useCallback(async () => {
    return getPreference<DocumentPreferences>(preferencesKey)
  }, [getPreference, preferencesKey])

  const setDocFieldPreferences = useCallback<DocumentInfoContext['setDocFieldPreferences']>(
    async (path, fieldPreferences) => {
      const allPreferences = await getDocPreferences()

      if (preferencesKey) {
        try {
          await setPreference(preferencesKey, {
            ...allPreferences,
            fields: {
              ...(allPreferences?.fields || {}),
              [path]: {
                ...allPreferences?.fields?.[path],
                ...fieldPreferences,
              },
            },
          })
        } catch (e) {
          console.error(e)
        }
      }
    },
    [setPreference, preferencesKey, getDocPreferences],
  )

  useEffect(() => {
    void getVersions()
  }, [getVersions])

  useEffect(() => {
    const loadDocPermissions = async () => {
      const docPermissions: DocumentPermissions = rest.docPermissions
      if (!docPermissions) await getDocPermissions()
      else setDocPermissions(docPermissions)
    }
    void loadDocPermissions()
  }, [getDocPermissions, rest.docPermissions, setDocPermissions])

  useEffect(() => {
    const loadDocPreferences = async () => {
      let docPreferences: DocumentPreferences = rest.docPreferences
      if (!docPreferences) docPreferences = await getDocPreferences()
      void setPreference(preferencesKey, docPreferences)
    }
    void loadDocPreferences()
  }, [getDocPreferences, preferencesKey, rest.docPreferences, setPreference])

  const value: DocumentInfoContext = {
    ...documentInfo,
    docConfig,
    docPermissions,
    getDocPermissions,
    getDocPreferences,
    getVersions,
    publishedDoc,
    setDocFieldPreferences,
    setDocumentInfo,
    setDocumentTitle,
    title,
    unpublishedVersions,
    versions,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}
