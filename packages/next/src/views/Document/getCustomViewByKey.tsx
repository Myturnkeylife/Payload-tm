import type { ServerSideEditViewComponent } from 'payload/types'
import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload/types'

export const getCustomViewByKey = (
  views:
    | SanitizedCollectionConfig['admin']['components']['views']
    | SanitizedGlobalConfig['admin']['components']['views'],
  customViewKey: string,
): ServerSideEditViewComponent => {
  return typeof views?.Edit === 'function'
    ? views?.Edit
    : typeof views?.Edit === 'object' &&
        views?.Edit?.[customViewKey] &&
        typeof views?.Edit?.[customViewKey] === 'function'
      ? views?.Edit?.[customViewKey]
      : views?.Edit?.[customViewKey]
        ? typeof views?.Edit?.[customViewKey] === 'object' &&
          'Component' in views?.Edit?.[customViewKey] &&
          typeof views?.Edit?.[customViewKey].Component === 'function' &&
          views?.Edit?.[customViewKey].Component
        : null
}
