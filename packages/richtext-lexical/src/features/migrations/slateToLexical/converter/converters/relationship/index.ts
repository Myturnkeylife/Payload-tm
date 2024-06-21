import type { SlateNodeConverterProvider } from '../../types.js'

import { RelationshipConverterClient } from './client.js'
import { _SlateRelationshipConverter } from './converter.js'

export const SlateRelationshipConverter: SlateNodeConverterProvider = {
  ClientFeature: RelationshipConverterClient,
  converter: _SlateRelationshipConverter,
}
