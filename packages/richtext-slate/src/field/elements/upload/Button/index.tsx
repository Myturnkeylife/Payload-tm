'use client'

import { useListDrawer, useTranslation } from '@payloadcms/ui'
import React, { Fragment, useCallback } from 'react'
import { ReactEditor, useSlate } from 'slate-react'

import UploadIcon from '../../../icons/Upload'
import ElementButton from '../../Button'
import { EnabledRelationshipsCondition } from '../../EnabledRelationshipsCondition'
import { injectVoidElement } from '../../injectVoid'
import './index.scss'

const baseClass = 'upload-rich-text-button'

const insertUpload = (editor, { relationTo, value }) => {
  const text = { text: ' ' }

  const upload = {
    children: [text],
    relationTo,
    type: 'upload',
    value,
  }

  injectVoidElement(editor, upload)

  ReactEditor.focus(editor)
}

type ButtonProps = {
  enabledCollectionSlugs: string[]
  path: string
}

const UploadButton: React.FC<ButtonProps> = ({ enabledCollectionSlugs }) => {
  const { t } = useTranslation()
  const editor = useSlate()

  const [ListDrawer, ListDrawerToggler, { closeDrawer }] = useListDrawer({
    collectionSlugs: enabledCollectionSlugs,
    uploads: true,
  })

  const onSelect = useCallback(
    ({ collectionSlug, docID }) => {
      insertUpload(editor, {
        relationTo: collectionSlug,
        value: {
          id: docID,
        },
      })
      closeDrawer()
    },
    [editor, closeDrawer],
  )

  return (
    <Fragment>
      <ListDrawerToggler>
        <ElementButton
          className={baseClass}
          el="div"
          format="upload"
          onClick={() => {
            // do nothing
          }}
          tooltip={t('fields:addUpload')}
        >
          <UploadIcon />
        </ElementButton>
      </ListDrawerToggler>
      <ListDrawer onSelect={onSelect} />
    </Fragment>
  )
}

export default (props: ButtonProps): React.ReactNode => {
  return (
    <EnabledRelationshipsCondition {...props} uploads>
      <UploadButton {...props} />
    </EnabledRelationshipsCondition>
  )
}
