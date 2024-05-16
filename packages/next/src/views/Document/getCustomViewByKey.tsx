import type { EditViewComponent } from 'payload/config'
import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload/types'

import { isReactComponentOrFunction } from 'payload/utilities'

export const getCustomViewByKey = (
  views:
    | SanitizedCollectionConfig['admin']['components']['views']
    | SanitizedGlobalConfig['admin']['components']['views'],
  customViewKey: string,
): EditViewComponent => {
  return typeof views?.Edit === 'function'
    ? views?.Edit
    : typeof views?.Edit === 'object' &&
        views?.Edit?.[customViewKey] &&
        typeof views?.Edit?.[customViewKey] === 'function'
      ? views?.Edit?.[customViewKey]
      : views?.Edit?.[customViewKey]
        ? typeof views?.Edit?.[customViewKey] === 'object' &&
          'Component' in views.Edit[customViewKey] &&
          isReactComponentOrFunction(views?.Edit?.[customViewKey].Component) &&
          views?.Edit?.[customViewKey].Component
        : null
}
