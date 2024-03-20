import type { I18n } from '@payloadcms/translations'
import type { Column } from '@payloadcms/ui/elements/Table'
import type {
  SanitizedCollectionConfig,
  SanitizedConfig,
  SanitizedGlobalConfig,
} from 'payload/types'

import { SortColumn } from '@payloadcms/ui/elements/SortColumn'
import React from 'react'

import { AutosaveCell } from './cells/AutosaveCell/index.js'
import { CreatedAtCell } from './cells/CreatedAt/index.js'
import { IDCell } from './cells/ID/index.js'

export const buildVersionColumns = ({
  collectionConfig,
  config,
  docID,
  globalConfig,
  i18n: { t },
  i18n,
}: {
  collectionConfig?: SanitizedCollectionConfig
  config: SanitizedConfig
  docID?: number | string
  globalConfig?: SanitizedGlobalConfig
  i18n: I18n
}): Column[] => [
  {
    name: '',
    accessor: 'updatedAt',
    active: true,
    components: {
      Cell: (
        <CreatedAtCell
          collectionSlug={collectionConfig?.slug}
          docID={docID}
          globalSlug={globalConfig?.slug}
        />
      ),
      Heading: <SortColumn label={t('general:updatedAt')} name="updatedAt" />,
    },
    label: '',
  },
  {
    name: '',
    accessor: 'id',
    active: true,
    components: {
      Cell: <IDCell />,
      Heading: <SortColumn disable label={t('version:versionID')} name="id" />,
    },
    label: '',
  },
  {
    name: '',
    accessor: 'autosave',
    active: true,
    components: {
      Cell: <AutosaveCell />,
      Heading: <SortColumn disable label={t('version:type')} name="autosave" />,
    },
    label: '',
  },
]
