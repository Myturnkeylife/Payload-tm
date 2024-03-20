import type { ClientCollectionConfig, FieldAffectingData } from 'payload/types'

import { fieldAffectsData } from 'payload/types'
import { flattenTopLevelFields } from 'payload/utilities'

export const useUseTitleField = (collection: ClientCollectionConfig): FieldAffectingData => {
  const {
    admin: { useAsTitle },
    fields,
  } = collection

  const topLevelFields = flattenTopLevelFields(fields)
  return topLevelFields.find(
    (field) => fieldAffectsData(field) && field.name === useAsTitle,
  ) as FieldAffectingData
}
