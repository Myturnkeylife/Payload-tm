'use client'

import type { SanitizedCollectionConfig } from 'payload/types'

import { getTranslation } from '@payloadcms/translations'
import {
  Button,
  DrawerToggler,
  FileGraphic,
  useConfig,
  useDocumentDrawer,
  useDrawerSlug,
  useListDrawer,
  usePayloadAPI,
  useThumbnail,
  useTranslation,
} from '@payloadcms/ui'
import React, { useCallback, useReducer, useState } from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useFocused, useSelected, useSlateStatic } from 'slate-react'

import type { FormFieldBase } from '../../../../../../ui/src/forms/fields/shared'
import type { UploadElementType } from '../types'

import { useElement } from '../../../providers/ElementProvider'
import { EnabledRelationshipsCondition } from '../../EnabledRelationshipsCondition'
import { uploadFieldsSchemaPath, uploadName } from '../shared'
import { UploadDrawer } from './UploadDrawer'
import './index.scss'

const baseClass = 'rich-text-upload'

const initialParams = {
  depth: 0,
}

type Props = FormFieldBase & {
  name: string
  richTextComponentMap: Map<string, React.ReactNode>
}

const Element: React.FC<Props & { enabledCollectionSlugs?: string[] }> = ({
  enabledCollectionSlugs,
}) => {
  const {
    attributes,
    children,
    element: { relationTo, value },
    element,
    fieldProps,
    schemaPath,
  } = useElement<UploadElementType>()

  const {
    collections,
    routes: { api },
    serverURL,
  } = useConfig()
  const { i18n, t } = useTranslation()
  const [cacheBust, dispatchCacheBust] = useReducer((state) => state + 1, 0)
  const [relatedCollection, setRelatedCollection] = useState<SanitizedCollectionConfig>(() =>
    collections.find((coll) => coll.slug === relationTo),
  )

  const drawerSlug = useDrawerSlug('upload-drawer')

  const [ListDrawer, ListDrawerToggler, { closeDrawer: closeListDrawer }] = useListDrawer({
    collectionSlugs: enabledCollectionSlugs,
    selectedCollection: relatedCollection.slug,
  })

  const [DocumentDrawer, DocumentDrawerToggler, { closeDrawer }] = useDocumentDrawer({
    id: value?.id,
    collectionSlug: relatedCollection.slug,
  })

  const editor = useSlateStatic()
  const selected = useSelected()
  const focused = useFocused()

  // Get the referenced document
  const [{ data }, { setParams }] = usePayloadAPI(
    `${serverURL}${api}/${relatedCollection.slug}/${value?.id}`,
    { initialParams },
  )

  const thumbnailSRC = useThumbnail(relatedCollection.upload, data)

  const removeUpload = useCallback(() => {
    const elementPath = ReactEditor.findPath(editor, element)

    Transforms.removeNodes(editor, { at: elementPath })
  }, [editor, element])

  const updateUpload = useCallback(
    (json) => {
      const { doc } = json

      const newNode = {
        fields: doc,
      }

      const elementPath = ReactEditor.findPath(editor, element)

      Transforms.setNodes(editor, newNode, { at: elementPath })

      setParams({
        ...initialParams,
        cacheBust, // do this to get the usePayloadAPI to re-fetch the data even though the URL string hasn't changed
      })

      dispatchCacheBust()
      closeDrawer()
    },
    [editor, element, setParams, cacheBust, closeDrawer],
  )

  const swapUpload = React.useCallback(
    ({ collectionSlug, docID }) => {
      const newNode = {
        children: [{ text: ' ' }],
        relationTo: collectionSlug,
        type: uploadName,
        value: { id: docID },
      }

      const elementPath = ReactEditor.findPath(editor, element)

      setRelatedCollection(collections.find((coll) => coll.slug === collectionSlug))

      Transforms.setNodes(editor, newNode, { at: elementPath })

      dispatchCacheBust()
      closeListDrawer()
    },
    [closeListDrawer, editor, element, collections],
  )

  const relatedFieldSchemaPath = `${uploadFieldsSchemaPath}.${relatedCollection.slug}`
  const customFieldsMap = fieldProps.richTextComponentMap.get(relatedFieldSchemaPath)

  return (
    <div
      className={[baseClass, selected && focused && `${baseClass}--selected`]
        .filter(Boolean)
        .join(' ')}
      contentEditable={false}
      {...attributes}
    >
      <div className={`${baseClass}__card`}>
        <div className={`${baseClass}__topRow`}>
          <div className={`${baseClass}__thumbnail`}>
            {thumbnailSRC ? <img alt={data?.filename} src={thumbnailSRC} /> : <FileGraphic />}
          </div>
          <div className={`${baseClass}__topRowRightPanel`}>
            <div className={`${baseClass}__collectionLabel`}>
              {getTranslation(relatedCollection.labels.singular, i18n)}
            </div>
            <div className={`${baseClass}__actions`}>
              {Boolean(customFieldsMap) && (
                <DrawerToggler
                  className={`${baseClass}__upload-drawer-toggler`}
                  disabled={fieldProps?.readOnly}
                  slug={drawerSlug}
                >
                  <Button
                    buttonStyle="icon-label"
                    el="div"
                    icon="edit"
                    onClick={(e) => {
                      e.preventDefault()
                    }}
                    round
                    tooltip={t('fields:editRelationship')}
                  />
                </DrawerToggler>
              )}
              <ListDrawerToggler
                className={`${baseClass}__list-drawer-toggler`}
                disabled={fieldProps?.readOnly}
              >
                <Button
                  buttonStyle="icon-label"
                  disabled={fieldProps?.readOnly}
                  el="div"
                  icon="swap"
                  onClick={() => {
                    // do nothing
                  }}
                  round
                  tooltip={t('fields:swapUpload')}
                />
              </ListDrawerToggler>
              <Button
                buttonStyle="icon-label"
                className={`${baseClass}__removeButton`}
                disabled={fieldProps?.readOnly}
                icon="x"
                onClick={(e) => {
                  e.preventDefault()
                  removeUpload()
                }}
                round
                tooltip={t('fields:removeUpload')}
              />
            </div>
          </div>
        </div>
        <div className={`${baseClass}__bottomRow`}>
          <DocumentDrawerToggler className={`${baseClass}__doc-drawer-toggler`}>
            <strong>{data?.filename}</strong>
          </DocumentDrawerToggler>
        </div>
      </div>
      {children}
      {value?.id && <DocumentDrawer onSave={updateUpload} />}
      <ListDrawer onSelect={swapUpload} />
      <UploadDrawer {...{ drawerSlug, element, fieldProps, relatedCollection, schemaPath }} />
    </div>
  )
}

export default (props: Props): React.ReactNode => {
  return (
    <EnabledRelationshipsCondition {...props} uploads>
      <Element {...props} />
    </EnabledRelationshipsCondition>
  )
}
