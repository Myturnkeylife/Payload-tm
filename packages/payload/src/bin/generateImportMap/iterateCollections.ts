import type { SanitizedCollectionConfig } from '../../collections/config/types.js'
import type { SanitizedConfig } from '../../config/types.js'
import type { AddToImportMap, Imports, InternalImportMap } from './index.js'

import { genImportMapIterateFields } from './iterateFields.js'

export function iterateCollections({
  addToImportMap,
  baseDir,
  collections,
  config,
  importMap,
  imports,
}: {
  addToImportMap: AddToImportMap
  baseDir: string
  collections: SanitizedCollectionConfig[]
  config: SanitizedConfig
  importMap: InternalImportMap
  imports: Imports
}) {
  for (const collection of collections) {
    genImportMapIterateFields({
      addToImportMap,
      baseDir,
      config,
      fields: collection.fields,
      importMap,
      imports,
    })

    addToImportMap(collection.admin?.components?.afterList)
    addToImportMap(collection.admin?.components?.afterListTable)
    addToImportMap(collection.admin?.components?.beforeList)
    addToImportMap(collection.admin?.components?.beforeListTable)

    addToImportMap(collection.admin?.components?.edit?.Description)
    addToImportMap(collection.admin?.components?.edit?.PreviewButton)
    addToImportMap(collection.admin?.components?.edit?.PublishButton)
    addToImportMap(collection.admin?.components?.edit?.SaveButton)
    addToImportMap(collection.admin?.components?.edit?.SaveDraftButton)
    addToImportMap(collection.admin?.components?.edit?.Upload)

    if (collection.admin?.components?.views?.Edit) {
      for (const editViewConfig of Object.values(collection.admin?.components?.views?.Edit)) {
        if ('Component' in editViewConfig) {
          addToImportMap(editViewConfig?.Component)
        }
        if ('actions' in editViewConfig) {
          addToImportMap(editViewConfig?.actions)
        }
        if ('Tab' in editViewConfig) {
          addToImportMap(editViewConfig?.Tab?.TabComponent)
          addToImportMap(editViewConfig?.Tab?.Pill)
        }
      }
    }

    addToImportMap(collection.admin?.components?.views?.List?.Component)
    addToImportMap(collection.admin?.components?.views?.List?.actions)
  }
}
