import type { I18nClient } from '@payloadcms/translations'
import type {
  AdminViewProps,
  EditViewProps,
  SanitizedCollectionConfig,
  SanitizedConfig,
} from 'payload/types'

import React from 'react'

import type { ViewDescriptionProps } from '../../../elements/ViewDescription/index.js'
import type { WithServerSidePropsPrePopulated } from './index.js'
import type { CollectionComponentMap } from './types.js'

import { ViewDescription } from '../../../elements/ViewDescription/index.js'
import { mapActions } from './actions.js'
import { mapFields } from './fields.js'

export const mapCollections = (args: {
  DefaultEditView: React.FC<EditViewProps>
  DefaultListView: React.FC<AdminViewProps>
  WithServerSideProps: WithServerSidePropsPrePopulated
  collections: SanitizedCollectionConfig[]
  config: SanitizedConfig
  i18n: I18nClient
  readOnly?: boolean
}): {
  [key: SanitizedCollectionConfig['slug']]: CollectionComponentMap
} => {
  const {
    DefaultEditView,
    DefaultListView,
    WithServerSideProps,
    collections,
    config,
    i18n,
    i18n: { t },
    readOnly: readOnlyOverride,
  } = args

  return collections.reduce((acc, collectionConfig) => {
    const { slug, fields } = collectionConfig

    const internalCollections = ['payload-preferences', 'payload-migrations']

    if (internalCollections.includes(slug)) {
      return acc
    }

    const editViewFromConfig = collectionConfig?.admin?.components?.views?.Edit

    const listViewFromConfig = collectionConfig?.admin?.components?.views?.List

    const CustomEditView =
      typeof editViewFromConfig === 'function'
        ? editViewFromConfig
        : typeof editViewFromConfig === 'object' && typeof editViewFromConfig.Default === 'function'
          ? editViewFromConfig.Default
          : typeof editViewFromConfig?.Default === 'object' &&
              'Component' in editViewFromConfig.Default &&
              typeof editViewFromConfig.Default.Component === 'function'
            ? (editViewFromConfig.Default.Component as React.FC<EditViewProps>)
            : undefined

    const CustomListView =
      typeof listViewFromConfig === 'function'
        ? listViewFromConfig
        : typeof listViewFromConfig === 'object' &&
            typeof listViewFromConfig.Component === 'function'
          ? listViewFromConfig.Component
          : undefined

    const Edit = (CustomEditView as React.FC<EditViewProps>) || DefaultEditView

    const List = CustomListView || DefaultListView

    const SaveButtonComponent = collectionConfig?.admin?.components?.edit?.SaveButton

    const SaveButton = SaveButtonComponent ? (
      <WithServerSideProps Component={SaveButtonComponent} />
    ) : undefined

    const SaveDraftButtonComponent = collectionConfig?.admin?.components?.edit?.SaveDraftButton

    const SaveDraftButton = SaveDraftButtonComponent ? (
      <WithServerSideProps Component={SaveDraftButtonComponent} />
    ) : undefined

    const PreviewButtonComponent = collectionConfig?.admin?.components?.edit?.PreviewButton

    const PreviewButton = PreviewButtonComponent ? (
      <WithServerSideProps Component={PreviewButtonComponent} />
    ) : undefined

    const PublishButtonComponent = collectionConfig?.admin?.components?.edit?.PublishButton

    const PublishButton = PublishButtonComponent ? (
      <WithServerSideProps Component={PublishButtonComponent} />
    ) : undefined

    const beforeList = collectionConfig?.admin?.components?.BeforeList

    const BeforeList =
      (beforeList &&
        Array.isArray(beforeList) &&
        beforeList?.map((Component) => <WithServerSideProps Component={Component} />)) ||
      null

    const beforeListTable = collectionConfig?.admin?.components?.BeforeListTable

    const BeforeListTable =
      (beforeListTable &&
        Array.isArray(beforeListTable) &&
        beforeListTable?.map((Component) => <WithServerSideProps Component={Component} />)) ||
      null

    const afterList = collectionConfig?.admin?.components?.AfterList

    const AfterList =
      (afterList &&
        Array.isArray(afterList) &&
        afterList?.map((Component) => <WithServerSideProps Component={Component} />)) ||
      null

    const afterListTable = collectionConfig?.admin?.components?.AfterListTable

    const AfterListTable =
      (afterListTable &&
        Array.isArray(afterListTable) &&
        afterListTable?.map((Component) => <WithServerSideProps Component={Component} />)) ||
      null

    let description = undefined
    if (collectionConfig.admin && 'description' in collectionConfig.admin) {
      if (
        typeof collectionConfig.admin?.description === 'string' ||
        typeof collectionConfig.admin?.description === 'object'
      ) {
        description = collectionConfig.admin.description
      } else if (typeof collectionConfig.admin?.description === 'function') {
        description = collectionConfig.admin?.description({ t })
      }
    }

    const descriptionProps: ViewDescriptionProps = {
      description,
    }

    const DescriptionComponent =
      collectionConfig.admin?.components?.edit?.Description ||
      (description ? ViewDescription : undefined)

    const Description =
      DescriptionComponent !== undefined ? (
        <WithServerSideProps Component={DescriptionComponent} {...(descriptionProps || {})} />
      ) : undefined

    const componentMap: CollectionComponentMap = {
      AfterList,
      AfterListTable,
      BeforeList,
      BeforeListTable,
      Description,
      Edit: <Edit collectionSlug={collectionConfig.slug} />,
      List: <List collectionSlug={collectionConfig.slug} />,
      PreviewButton,
      PublishButton,
      SaveButton,
      SaveDraftButton,
      actionsMap: mapActions({
        WithServerSideProps,
        collectionConfig,
      }),
      fieldMap: mapFields({
        WithServerSideProps,
        config,
        fieldSchema: fields,
        i18n,
        readOnly: readOnlyOverride,
      }),
      isPreviewEnabled: !!collectionConfig?.admin?.preview,
    }

    return {
      ...acc,
      [slug]: componentMap,
    }
  }, {})
}
