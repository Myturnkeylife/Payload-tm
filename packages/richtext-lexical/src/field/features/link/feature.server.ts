import type { I18n } from '@payloadcms/translations'
import type { SanitizedConfig } from 'payload/config'
import type { Field } from 'payload/types'

import { initI18n } from '@payloadcms/translations'
import { translations } from '@payloadcms/translations/client'

import type { HTMLConverter } from '../converters/html/converter/types'
import type { FeatureProviderProviderServer } from '../types'
import type { ClientProps } from './feature.client'
import type { SerializedAutoLinkNode, SerializedLinkNode } from './nodes/types'

import { convertLexicalNodesToHTML } from '../converters/html/converter'
import { LinkFeatureClientComponent } from './feature.client'
import { AutoLinkNode } from './nodes/AutoLinkNode'
import { LinkNode } from './nodes/LinkNode'
import { transformExtraFields } from './plugins/floatingLinkEditor/utilities'
import { linkPopulationPromiseHOC } from './populationPromise'

export type ExclusiveLinkCollectionsProps =
  | {
      /**
       * The collections that should be disabled for internal linking. Overrides the `enableRichTextLink` property in the collection config.
       * When this property is set, `enabledCollections` will not be available.
       **/
      disabledCollections?: string[]

      // Ensures that enabledCollections is not available when disabledCollections is set
      enabledCollections?: never
    }
  | {
      // Ensures that disabledCollections is not available when enabledCollections is set
      disabledCollections?: never

      /**
       * The collections that should be enabled for internal linking. Overrides the `enableRichTextLink` property in the collection config
       * When this property is set, `disabledCollections` will not be available.
       **/
      enabledCollections?: string[]
    }

export type LinkFeatureServerProps = ExclusiveLinkCollectionsProps & {
  /**
   * A function or array defining additional fields for the link feature. These will be
   * displayed in the link editor drawer.
   */
  fields?:
    | ((args: { config: SanitizedConfig; defaultFields: Field[]; i18n: I18n }) => Field[])
    | Field[]
}

export const LinkFeature: FeatureProviderProviderServer<LinkFeatureServerProps, ClientProps> = (
  props,
) => {
  if (!props) {
    props = {}
  }
  return {
    feature: () => {
      return {
        ClientComponent: LinkFeatureClientComponent,
        clientFeatureProps: {
          disabledCollections: props.disabledCollections,
          enabledCollections: props.enabledCollections,
        } as ExclusiveLinkCollectionsProps,
        generateSchemaMap: ({ config, props, schemaMap, schemaPath }) => {
          const i18n = initI18n({ config: config.i18n, context: 'client', translations })

          return {
            fields: transformExtraFields(
              props.fields,
              config,
              i18n,
              props.enabledCollections,
              props.disabledCollections,
            ),
          }
        },
        nodes: [
          {
            converters: {
              html: {
                converter: async ({ converters, node, parent }) => {
                  const childrenText = await convertLexicalNodesToHTML({
                    converters,
                    lexicalNodes: node.children,
                    parent: {
                      ...node,
                      parent,
                    },
                  })

                  const rel: string = node.fields.newTab ? ' rel="noopener noreferrer"' : ''

                  let href: string = node.fields.url
                  if (node.fields.linkType === 'internal') {
                    href =
                      typeof node.fields.doc?.value === 'string'
                        ? node.fields.doc?.value
                        : node.fields.doc?.value?.id
                  }

                  return `<a href="${href}"${rel}>${childrenText}</a>`
                },
                nodeTypes: [AutoLinkNode.getType()],
              } as HTMLConverter<SerializedAutoLinkNode>,
            },
            node: AutoLinkNode,
            populationPromises: [linkPopulationPromiseHOC(props)],
          },
          {
            converters: {
              html: {
                converter: async ({ converters, node, parent }) => {
                  const childrenText = await convertLexicalNodesToHTML({
                    converters,
                    lexicalNodes: node.children,
                    parent: {
                      ...node,
                      parent,
                    },
                  })

                  const rel: string = node.fields.newTab ? ' rel="noopener noreferrer"' : ''

                  const href: string =
                    node.fields.linkType === 'custom'
                      ? node.fields.url
                      : (node.fields.doc?.value as string)

                  return `<a href="${href}"${rel}>${childrenText}</a>`
                },
                nodeTypes: [LinkNode.getType()],
              } as HTMLConverter<SerializedLinkNode>,
            },
            node: LinkNode,
            populationPromises: [linkPopulationPromiseHOC(props)],
          },
        ],
        serverFeatureProps: props,
      }
    },
    key: 'link',
    serverFeatureProps: props,
  }
}
