import React from 'react'

import type { CollectionEditViewProps } from '../types'

// import { API } from '../../../API'
// import { LivePreviewView } from '../../../LivePreview'
// import VersionView from '../../../Version/Version'
// import VersionsView from '../../../Versions'
import { DefaultCollectionEdit } from './Default/index'
import { SanitizedCollectionConfig } from 'payload/types'

export type collectionViewType =
  | 'API'
  | 'Default'
  | 'LivePreview'
  | 'References'
  | 'Relationships'
  | 'Version'
  | 'Versions'

export const defaultCollectionViews = (): {
  [key in collectionViewType]: React.ComponentType<any>
} => ({
  API: null,
  Default: DefaultCollectionEdit,
  LivePreview: null,
  References: null,
  Relationships: null,
  Version: null,
  Versions: null,
})

export const RenderCustomView = (
  args: CollectionEditViewProps & {
    view: collectionViewType
  },
) => {
  const { collectionConfig, view } = args

  const { admin: { components: { views: { Edit } = {} } = {} } = {} } = collectionConfig

  // Overriding components may come from multiple places in the config
  // Need to cascade through the hierarchy to find the correct component to render
  // For example, the Edit view:
  // 1. Edit?.Default
  // 2. Edit?.Default?.Component

  const Component =
    typeof Edit === 'object' && typeof Edit[view] === 'function'
      ? Edit[view]
      : typeof Edit === 'object' &&
        typeof Edit?.[view] === 'object' &&
        typeof Edit[view].Component === 'function'
      ? Edit[view].Component
      : defaultCollectionViews()[view]

  if (Component) {
    return <Component {...args} />
  }
}
