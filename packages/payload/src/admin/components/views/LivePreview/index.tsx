import React, { Fragment, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from '../../../../exports/types'
import type { GlobalEditViewProps } from '../Global/types'
import type { CollectionEditViewProps } from '../collections/Edit/types'

import { getTranslation } from '../../../../utilities/getTranslation'
import { DocumentControls } from '../../elements/DocumentControls'
import { Gutter } from '../../elements/Gutter'
import RenderFields from '../../forms/RenderFields'
import { filterFields } from '../../forms/RenderFields/filterFields'
import { fieldTypes } from '../../forms/field-types'
import LeaveWithoutSaving from '../../modals/LeaveWithoutSaving'
import Meta from '../../utilities/Meta'
import { Preview } from './Preview'
import './index.scss'
import { usePopupWindow } from './usePopupWindow'

const baseClass = 'live-preview'

export type LivePreviewViewProps =
  | ({
      collection: SanitizedCollectionConfig
    } & CollectionEditViewProps)
  | ({
      global: SanitizedGlobalConfig
    } & GlobalEditViewProps)

export const LivePreviewView: React.FC<LivePreviewViewProps> = (props) => {
  const { i18n, t } = useTranslation('general')

  let url

  if ('collection' in props) {
    url = props?.collection.admin.livePreview.url
  }

  if ('global' in props) {
    url = props?.global.admin.livePreview.url
  }

  const { isPopupOpen, openPopupWindow, popupRef } = usePopupWindow({
    eventType: 'livePreview',
    href: url,
  })

  const { apiURL, data, permissions } = props

  let collection: SanitizedCollectionConfig
  let global: SanitizedGlobalConfig
  let disableActions: boolean
  let disableLeaveWithoutSaving: boolean
  let hasSavePermission: boolean
  let isEditing: boolean
  let id: string

  if ('collection' in props) {
    collection = props?.collection
    disableActions = props?.disableActions
    disableLeaveWithoutSaving = props?.disableLeaveWithoutSaving
    hasSavePermission = props?.hasSavePermission
    isEditing = props?.isEditing
    id = props?.id
  }

  if ('global' in props) {
    global = props?.global
  }

  const { fields } = collection

  const sidebarFields = filterFields({
    fieldSchema: fields,
    fieldTypes,
    filter: (field) => field?.admin?.position === 'sidebar',
    permissions: permissions.fields,
    readOnly: !hasSavePermission,
  })

  const toggleWindow = useCallback(
    (e) => {
      openPopupWindow(e)
    },
    [openPopupWindow],
  )

  return (
    <Fragment>
      <DocumentControls
        apiURL={apiURL}
        collection={collection}
        data={data}
        disableActions={disableActions}
        global={global}
        hasSavePermission={hasSavePermission}
        id={id}
        isEditing={isEditing}
        permissions={permissions}
      />
      <div
        className={[baseClass, isPopupOpen && `${baseClass}--detached`].filter(Boolean).join(' ')}
      >
        <div className={`${baseClass}__main`}>
          <Meta
            description={t('editing')}
            keywords={`${getTranslation(collection.labels.singular, i18n)}, Payload, CMS`}
            title={`${isEditing ? t('editing') : t('creating')} - ${getTranslation(
              collection.labels.singular,
              i18n,
            )}`}
          />
          {!(collection.versions?.drafts && collection.versions?.drafts?.autosave) &&
            !disableLeaveWithoutSaving && <LeaveWithoutSaving />}
          <Gutter className={`${baseClass}__edit`}>
            <RenderFields
              fieldSchema={fields}
              fieldTypes={fieldTypes}
              filter={(field) => !field?.admin?.position || field?.admin?.position !== 'sidebar'}
              permissions={permissions.fields}
              readOnly={!hasSavePermission}
            />
            {sidebarFields && sidebarFields.length > 0 && (
              <RenderFields fieldTypes={fieldTypes} fields={sidebarFields} />
            )}
          </Gutter>
        </div>
        <Preview
          {...props}
          isPopupOpen={isPopupOpen}
          popupRef={popupRef}
          toggleWindow={toggleWindow}
          url={url}
        />
      </div>
    </Fragment>
  )
}
