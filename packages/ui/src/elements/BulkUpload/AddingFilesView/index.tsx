'use client'

import { useModal } from '@faceless-ui/modal'
import { getTranslation } from '@payloadcms/translations'
import { reduceFieldsToValues } from 'payload/shared'
import React from 'react'

import { useConfig } from '../../../providers/Config/index.js'
import { DocumentInfoProvider } from '../../../providers/DocumentInfo/index.js'
import { useTranslation } from '../../../providers/Translation/index.js'
import { ActionsBar } from '../ActionsBar/index.js'
import { DiscardWithoutSaving, discardBulkUploadModalSlug } from '../DiscardWithoutSaving/index.js'
import { EditForm } from '../EditForm/index.js'
import { FileSidebar } from '../FileSidebar/index.js'
import { useFormsManager } from '../FormsManager/index.js'
import { DrawerHeader } from '../Header/index.js'
import './index.scss'

const baseClass = 'bulk-upload--file-manager'

export function AddingFilesView() {
  const {
    activeIndex,
    collectionSlug,
    docPermissions,
    forms,
    hasPublishPermission,
    hasSavePermission,
    hasSubmitted,
  } = useFormsManager()
  const activeForm = forms[activeIndex]
  const { config } = useConfig()
  const { i18n } = useTranslation()
  const { openModal } = useModal()

  const collection = config.collections.find((c) => c.slug === collectionSlug)

  return (
    <div className={baseClass}>
      <FileSidebar />

      <div className={`${baseClass}__editView`}>
        <DrawerHeader
          onClose={() => openModal(discardBulkUploadModalSlug)}
          title={getTranslation(collection.labels.singular, i18n)}
        />
        {activeForm ? (
          <DocumentInfoProvider
            collectionSlug={collectionSlug}
            docPermissions={docPermissions}
            hasPublishPermission={hasPublishPermission}
            hasSavePermission={hasSavePermission}
            id={null}
            initialData={reduceFieldsToValues(activeForm.formState, true)}
            initialState={activeForm.formState}
            key={`${activeIndex}-${forms.length}`}
          >
            <ActionsBar />
            <EditForm submitted={hasSubmitted} />
          </DocumentInfoProvider>
        ) : null}
      </div>

      <DiscardWithoutSaving />
    </div>
  )
}
