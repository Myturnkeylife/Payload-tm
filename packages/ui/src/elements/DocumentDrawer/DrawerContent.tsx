'use client'

import type { FormState, TypeWithID } from 'payload/types'

import * as facelessUIImport from '@faceless-ui/modal'
import queryString from 'qs'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import type { DocumentDrawerProps } from './types.js'

import { FieldPathProvider, useFieldPath } from '../../forms/FieldPathProvider/index.js'
import { useRelatedCollections } from '../../forms/fields/Relationship/AddNew/useRelatedCollections.js'
import usePayloadAPI from '../../hooks/usePayloadAPI.js'
import { X } from '../../icons/X/index.js'
import { formatDocTitle, useAuth } from '../../index.js'
import { useComponentMap } from '../../providers/ComponentMapProvider/index.js'
import { useConfig } from '../../providers/Config/index.js'
import { DocumentInfoProvider } from '../../providers/DocumentInfo/index.js'
import { useFormQueryParams } from '../../providers/FormQueryParams/index.js'
import { useLocale } from '../../providers/Locale/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { getFormState } from '../../utilities/getFormState.js'
import { Gutter } from '../Gutter/index.js'
import IDLabel from '../IDLabel/index.js'
import { LoadingOverlay } from '../Loading/index.js'
import { RenderTitle } from '../RenderTitle/index.js'
import { baseClass } from './index.js'

const Content: React.FC<DocumentDrawerProps> = ({
  id,
  Header,
  collectionSlug,
  drawerSlug,
  initialData,
  onSave,
}) => {
  const { useModal } = facelessUIImport

  const config = useConfig()

  const {
    routes: { api: apiRoute },
    serverURL,
  } = config

  const { closeModal, modalState, toggleModal } = useModal()
  const locale = useLocale()
  const [initialState, setInitialState] = useState<FormState>()
  const { i18n, t } = useTranslation()
  const hasInitializedState = useRef(false)
  const [isOpen, setIsOpen] = useState(false)
  const [collectionConfig] = useRelatedCollections(collectionSlug)
  const { formQueryParams } = useFormQueryParams()
  const formattedQueryParams = queryString.stringify(formQueryParams)

  const { permissions } = useAuth()

  const { schemaPath } = useFieldPath()

  const { componentMap } = useComponentMap()

  const { Edit } = componentMap[`${collectionSlug ? 'collections' : 'globals'}`][collectionSlug]

  // no need to an additional requests when creating new documents
  const initialID = useRef(id)

  const [{ data, isError, isLoading: isLoadingDocument }] = usePayloadAPI(
    initialID.current ? `${serverURL}${apiRoute}/${collectionSlug}/${initialID.current}` : null,
    { initialData, initialParams: { depth: 0, draft: 'true', 'fallback-locale': 'null' } },
  )

  useEffect(() => {
    setIsOpen(Boolean(modalState[drawerSlug]?.isOpen))
  }, [modalState, drawerSlug])

  useEffect(() => {
    if (isOpen && !isLoadingDocument && isError) {
      closeModal(drawerSlug)
      toast.error(data.errors?.[0].message || t('error:unspecific'))
    }
  }, [isError, t, isOpen, data, drawerSlug, closeModal, isLoadingDocument])

  const isEditing = Boolean(id)

  const apiURL = id ? `${serverURL}${apiRoute}/${collectionSlug}/${id}?locale=${locale.code}` : null

  const action = `${serverURL}${apiRoute}/${collectionSlug}${
    isEditing ? `/${id}` : ''
  }?${formattedQueryParams}`

  // const hasSavePermission =
  //   (isEditing && docPermissions?.update?.permission) ||
  //   (!isEditing && (docPermissions as CollectionPermission)?.create?.permission)

  useEffect(() => {
    if (!hasInitializedState.current && (!initialID.current || (initialID.current && data))) {
      const getInitialState = async () => {
        const result = await getFormState({
          apiRoute,
          body: {
            id,
            collectionSlug,
            data: data || {},
            operation: isEditing ? 'update' : 'create',
            schemaPath,
          },
          serverURL,
        })

        setInitialState(result)
        hasInitializedState.current = true
      }

      void getInitialState()
    }
  }, [apiRoute, data, isEditing, schemaPath, serverURL, collectionSlug, id])

  if (isError) return null

  if (!initialState || isLoadingDocument) {
    return <LoadingOverlay />
  }

  const docPermissions = permissions?.collections[collectionSlug]

  const title = formatDocTitle({
    collectionConfig,
    data,
    dateFormat: config.admin.dateFormat,
    i18n,
  })

  return (
    <DocumentInfoProvider
      BeforeDocument={
        <Gutter className={`${baseClass}__header`}>
          <div className={`${baseClass}__header-content`}>
            <h2 className={`${baseClass}__header-text`}>
              {Header || <RenderTitle element="span" />}
            </h2>
            {/* TODO: the `button` HTML element breaks CSS transitions on the drawer for some reason...
            i.e. changing to a `div` element will fix the animation issue but will break accessibility
          */}
            <button
              aria-label={t('general:close')}
              className={`${baseClass}__header-close`}
              onClick={() => toggleModal(drawerSlug)}
              type="button"
            >
              <X />
            </button>
          </div>
          {id && id !== title ? <IDLabel id={id.toString()} /> : null}
        </Gutter>
      }
      action={action}
      apiURL={apiURL}
      collectionSlug={collectionConfig.slug}
      disableActions
      disableLeaveWithoutSaving
      docPermissions={docPermissions}
      hasSavePermission={docPermissions?.update?.permission}
      // isLoading,
      id={id}
      initialData={data}
      initialState={initialState}
      isEditing={isEditing}
      onSave={onSave}
      title={title}
    >
      {Edit}
    </DocumentInfoProvider>
  )
}

// First provide the document context using `DocumentInfoProvider`
// this is so we can utilize the `useDocumentInfo` hook in the `Content` component
// this drawer is used for both creating and editing documents
// this means that the `id` may be unknown until the document is created
export const DocumentDrawerContent: React.FC<DocumentDrawerProps> = (props) => {
  const { id: idFromProps, collectionSlug, onSave: onSaveFromProps } = props
  const [collectionConfig] = useRelatedCollections(collectionSlug)
  const [doc, setDoc] = useState<TypeWithID | null>()

  const onSave = useCallback<DocumentDrawerProps['onSave']>(
    (args) => {
      setDoc(args.doc)

      if (typeof onSaveFromProps === 'function') {
        void onSaveFromProps({
          ...args,
          collectionConfig,
        })
      }
    },
    [onSaveFromProps, collectionConfig],
  )

  return (
    <FieldPathProvider path="" schemaPath={collectionSlug}>
      <Content {...props} id={idFromProps || doc?.id} initialData={doc} onSave={onSave} />
    </FieldPathProvider>
  )
}
