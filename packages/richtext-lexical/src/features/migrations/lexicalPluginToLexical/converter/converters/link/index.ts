import type { LexicalPluginNodeConverterProvider } from '../../types.js'

import { LinkConverterClient } from './client.js'
import { _LinkConverter } from './converter.js'

export const LinkConverter: LexicalPluginNodeConverterProvider = {
  ClientConverter: LinkConverterClient,
  converter: _LinkConverter,
}
