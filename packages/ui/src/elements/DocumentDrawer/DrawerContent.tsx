'use client'
import { useModal } from '@faceless-ui/modal'
import queryString from 'qs'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import type { CollectionPermission } from 'payload/auth'
import type { FormState } from '../../forms/Form/types'
import type { DocumentDrawerProps } from './types'

import { baseClass } from '.'
import { getTranslation } from '@payloadcms/translations'
import usePayloadAPI from '../../hooks/usePayloadAPI'
import { useRelatedCollections } from '../../forms/fields/Relationship/AddNew/useRelatedCollections'
import { X } from '../../icons/X'
import { useAuth } from '../../providers/Auth'
import { useConfig } from '../../providers/Config'
import { useTranslation } from '../../providers/Translation'
import { DocumentInfoProvider, useDocumentInfo } from '../../providers/DocumentInfo'
import { useFormQueryParams } from '../../providers/FormQueryParams'
import { useLocale } from '../../providers/Locale'
import { RenderCustomComponent } from '../../elements/RenderCustomComponent'
import { formatFields } from '../../utilities/formatFields'
import IDLabel from '../IDLabel'
import type { EditViewProps } from '../../views/types'
import { DefaultEditView } from '../../views/Edit'
import { Gutter } from '../Gutter'

const Content: React.FC<DocumentDrawerProps> = ({ collectionSlug, Header, drawerSlug, onSave }) => {
  const config = useConfig()

  const {
    routes: { api },
    serverURL,
  } = config

  const { closeModal, modalState, toggleModal } = useModal()
  const locale = useLocale()
  const { user } = useAuth()
  const [internalState, setInternalState] = useState<FormState>()
  const { i18n, t } = useTranslation()
  const hasInitializedState = useRef(false)
  const [isOpen, setIsOpen] = useState(false)
  const [collectionConfig] = useRelatedCollections(collectionSlug)
  const { formQueryParams } = useFormQueryParams()
  const formattedQueryParams = queryString.stringify(formQueryParams)

  const { admin: { components: { views: { Edit } = {} } = {} } = {}, fields: fieldsFromConfig } =
    collectionConfig

  const { id, docPermissions } = useDocumentInfo()

  // If they are replacing the entire edit view, use that.
  // Else let the DefaultEdit determine what to render.
  const CustomEditView = typeof Edit === 'function' ? Edit : undefined

  const [fields, setFields] = useState(() => formatFields(fieldsFromConfig, true))

  // no need to an additional requests when creating new documents
  const initialID = useRef(id)

  const [{ data, isError, isLoading: isLoadingDocument }] = usePayloadAPI(
    initialID.current ? `${serverURL}${api}/${collectionSlug}/${initialID.current}` : null,
    { initialParams: { depth: 0, draft: 'true', 'fallback-locale': 'null' } },
  )

  useEffect(() => {
    setFields(formatFields(fields, true))
  }, [collectionSlug, collectionConfig])

  useEffect(() => {
    setIsOpen(Boolean(modalState[drawerSlug]?.isOpen))
  }, [modalState, drawerSlug])

  useEffect(() => {
    if (isOpen && !isLoadingDocument && isError) {
      closeModal(drawerSlug)
      toast.error(data.errors?.[0].message || t('error:unspecific'))
    }
  }, [isError, t, isOpen, data, drawerSlug, closeModal, isLoadingDocument])

  if (isError) return null

  const isEditing = Boolean(id)

  const apiURL = id ? `${serverURL}${api}/${collectionSlug}/${id}?locale=${locale}` : null

  const action = `${serverURL}${api}/${collectionSlug}${
    isEditing ? `/${id}` : ''
  }?${formattedQueryParams}`

  const hasSavePermission =
    (isEditing && docPermissions?.update?.permission) ||
    (!isEditing && (docPermissions as CollectionPermission)?.create?.permission)

  const isLoading = !internalState || !docPermissions || isLoadingDocument

  const componentProps: EditViewProps = {
    id,
    action,
    apiURL,
    BeforeDocument: (
      <Gutter className={`${baseClass}__header`}>
        <div className={`${baseClass}__header-content`}>
          <h2 className={`${baseClass}__header-text`}>
            {Header ||
              t(!id ? 'fields:addNewLabel' : 'general:editLabel', {
                label: getTranslation(collectionConfig.labels.singular, i18n),
              })}
          </h2>
          {/* TODO: the `button` HTML element breaks CSS transitions on the drawer for some reason...
            i.e. changing to a `div` element will fix the animation issue but will break accessibility
          */}
          <button
            aria-label={t('general:close')}
            className={`${baseClass}__header-close`}
            onClick={() => toggleModal(drawerSlug)}
          >
            <X />
          </button>
        </div>
        {id && <IDLabel id={id.toString()} />}
      </Gutter>
    ),
    data,
    disableActions: true,
    disableLeaveWithoutSaving: true,
    hasSavePermission,
    isEditing,
    // isLoading,
    // me: true,
    onSave,
    collectionSlug: collectionConfig.slug,
    docPermissions: docPermissions as CollectionPermission,
    docPreferences: null,
    user,
    updatedAt: data?.updatedAt,
    locale,
    initializeFormState: true,
  }

  return (
    <RenderCustomComponent
      // CustomComponent={CustomEditView}
      DefaultComponent={DefaultEditView}
      componentProps={componentProps}
    />
  )
}

// First provide the document context using `DocumentInfoProvider`
// this is so we can utilize the `useDocumentInfo` hook in the `Content` component
// this drawer is used for both creating and editing documents
// this means that the `id` may be unknown until the document is created
export const DocumentDrawerContent: React.FC<DocumentDrawerProps> = (props) => {
  const { id: idFromProps, collectionSlug, onSave: onSaveFromProps } = props
  const [collectionConfig] = useRelatedCollections(collectionSlug)
  const [id, setId] = useState<null | string>(idFromProps)

  const onSave = useCallback<DocumentDrawerProps['onSave']>(
    (args) => {
      setId(args.doc.id)

      if (typeof onSaveFromProps === 'function') {
        onSaveFromProps({
          ...args,
          collectionConfig,
        })
      }
    },
    [onSaveFromProps, collectionConfig],
  )

  return (
    <DocumentInfoProvider collectionSlug={collectionSlug} id={id}>
      <Content {...props} onSave={onSave} />
    </DocumentInfoProvider>
  )
}
