import type { Metadata } from 'next'
import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload/types'

import type { GenerateViewMetadata } from '../Root'

import { getNextI18n } from '../../utilities/getNextI18n'
import { generateMetadata as apiMeta } from '../API/meta'
import { generateMetadata as editMeta } from '../Edit/meta'
import { generateMetadata as livePreviewMeta } from '../LivePreview/meta'
import { generateNotFoundMeta } from '../NotFound/meta'
import { generateMetadata as versionMeta } from '../Version/meta'
import { generateMetadata as versionsMeta } from '../Versions/meta'

export type GenerateEditViewMetadata = (
  args: Parameters<GenerateViewMetadata>[0] & {
    collectionConfig?: SanitizedCollectionConfig | null
    globalConfig?: SanitizedGlobalConfig | null
    isEditing: boolean
  },
) => Promise<Metadata>

export const getMetaBySegment: GenerateEditViewMetadata = async ({
  collectionConfig,
  config,
  globalConfig,
  params,
}) => {
  const { segments } = params

  let fn: GenerateEditViewMetadata | null = null

  const [segmentOne] = segments
  const isCollection = segmentOne === 'collections'
  const isGlobal = segmentOne === 'globals'

  const isEditing = Boolean(isCollection && segments?.length > 2 && segments[2] !== 'create')

  if (isCollection) {
    // `/:id`
    if (params.segments.length === 3) {
      fn = editMeta
    }

    // `/:id/api`
    if (params.segments.length === 4 && params.segments[3] === 'api') {
      fn = apiMeta
    }

    // `/:id/preview`
    if (params.segments.length === 4 && params.segments[3] === 'preview') {
      fn = livePreviewMeta
    }

    // `/:id/versions`
    if (params.segments.length === 4 && params.segments[3] === 'versions') {
      fn = versionsMeta
    }

    // `/:id/versions/:version`
    if (params.segments.length === 5 && params.segments[3] === 'versions') {
      fn = versionMeta
    }
  }

  if (isGlobal) {
    // `/:slug`
    if (params.segments?.length === 2) {
      fn = editMeta
    }

    // `/:slug/api`
    if (params.segments?.length === 3 && params.segments[2] === 'api') {
      fn = apiMeta
    }

    // `/:slug/preview`
    if (params.segments?.length === 3 && params.segments[2] === 'preview') {
      fn = livePreviewMeta
    }

    // `/:slug/versions`
    if (params.segments?.length === 3 && params.segments[2] === 'versions') {
      fn = versionsMeta
    }

    // `/:slug/versions/:version`
    if (params.segments?.length === 4 && params.segments[2] === 'versions') {
      fn = versionMeta
    }
  }

  const i18n = await getNextI18n({
    config,
  })

  if (typeof fn === 'function') {
    return fn({
      collectionConfig,
      config,
      globalConfig,
      i18n,
      isEditing,
    })
  }

  return generateNotFoundMeta({ i18n })
}
