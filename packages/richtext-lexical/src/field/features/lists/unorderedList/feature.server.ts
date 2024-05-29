import { ListItemNode, ListNode } from '@lexical/list'

import type { FeatureProviderProviderServer } from '../../types.js'

import { createNode } from '../../typeUtilities.js'
import { ListHTMLConverter, ListItemHTMLConverter } from '../htmlConverter.js'
import { UnorderedListFeatureClientComponent } from './feature.client.js'
import { i18n } from './i18n.js'
import { UNORDERED_LIST } from './markdownTransformer.js'

export const UnorderedListFeature: FeatureProviderProviderServer<undefined, undefined> = (
  props,
) => {
  return {
    feature: () => {
      return {
        ClientComponent: UnorderedListFeatureClientComponent,
        i18n,
        markdownTransformers: [UNORDERED_LIST],
        nodes: [
          createNode({
            converters: {
              html: ListHTMLConverter,
            },
            node: ListNode,
          }),
          createNode({
            converters: {
              html: ListItemHTMLConverter,
            },
            node: ListItemNode,
          }),
        ],
        serverFeatureProps: props,
      }
    },
    key: 'unorderedList',
    serverFeatureProps: props,
  }
}
