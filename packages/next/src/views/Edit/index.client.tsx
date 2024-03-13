'use client'

import {
  LoadingOverlay,
  SetViewActions,
  useComponentMap,
  useConfig,
  useDocumentInfo,
  useFormQueryParams,
} from '@payloadcms/ui'
import { useRouter } from 'next/navigation.js'
import { useSearchParams } from 'next/navigation.js'
import React, { Fragment, useEffect } from 'react'
import { useCallback } from 'react'

export const EditViewClient: React.FC = () => {
  const { collectionSlug, getDocPermissions, getVersions, globalSlug, isEditing, setOnSave } =
    useDocumentInfo()

  const {
    routes: { admin: adminRoute },
  } = useConfig()

  const router = useRouter()
  const { dispatchFormQueryParams } = useFormQueryParams()

  const { getComponentMap } = useComponentMap()
  const params = useSearchParams()

  const locale = params.get('locale')

  const { Edit, actionsMap } = getComponentMap({
    collectionSlug,
    globalSlug,
  })

  const onSave = useCallback(
    (json: { doc }) => {
      void getVersions()
      void getDocPermissions()

      if (!isEditing) {
        // Redirect to the same locale if it's been set
        const redirectRoute = `${adminRoute}/collections/${collectionSlug}/${json?.doc?.id}${locale ? `?locale=${locale}` : ''}`
        router.push(redirectRoute)
      } else {
        dispatchFormQueryParams({
          type: 'SET',
          params: {
            uploadEdits: null,
          },
        })
      }
    },
    [
      adminRoute,
      collectionSlug,
      dispatchFormQueryParams,
      getDocPermissions,
      getVersions,
      isEditing,
      router,
      locale,
    ],
  )

  useEffect(() => {
    void setOnSave(() => onSave)
  }, [setOnSave, onSave])

  // Allow the `DocumentInfoProvider` to hydrate
  if (!Edit || (!collectionSlug && !globalSlug)) {
    return <LoadingOverlay />
  }

  return (
    <Fragment>
      <SetViewActions actions={actionsMap?.Edit?.Default} />
      {Edit}
    </Fragment>
  )
}
