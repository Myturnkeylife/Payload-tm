import type { HeadingTagType } from '@lexical/rich-text'

import { HeadingNode } from '@lexical/rich-text'

import type { FeatureProviderProviderServer } from '../types.js'

import { convertLexicalNodesToHTML } from '../converters/html/converter/index.js'
import { createNode } from '../typeUtilities.js'
import { HeadingFeatureClientComponent } from './feature.client.js'
import { i18n } from './i18n.js'
import { MarkdownTransformer } from './markdownTransformer.js'

export type HeadingFeatureProps = {
  enabledHeadingSizes?: HeadingTagType[]
}

export const HeadingFeature: FeatureProviderProviderServer<
  HeadingFeatureProps,
  HeadingFeatureProps
> = (props) => {
  if (!props) {
    props = {}
  }

  const { enabledHeadingSizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] } = props

  return {
    feature: () => {
      return {
        ClientComponent: HeadingFeatureClientComponent,
        clientFeatureProps: props,
        i18n,
        markdownTransformers: [MarkdownTransformer(enabledHeadingSizes)],
        nodes: [
          createNode({
            converters: {
              html: {
                converter: async ({ converters, node, parent, payload }) => {
                  const childrenText = await convertLexicalNodesToHTML({
                    converters,
                    lexicalNodes: node.children,
                    parent: {
                      ...node,
                      parent,
                    },
                    payload,
                  })

                  return '<' + node?.tag + '>' + childrenText + '</' + node?.tag + '>'
                },
                nodeTypes: [HeadingNode.getType()],
              },
            },
            node: HeadingNode,
          }),
        ],
        serverFeatureProps: props,
      }
    },
    key: 'heading',
    serverFeatureProps: props,
  }
}
