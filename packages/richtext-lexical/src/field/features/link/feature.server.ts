import type { I18n } from '@payloadcms/translations'
import type { Config, SanitizedConfig } from 'payload/config'
import type { Field, FieldWithRichTextRequiredEditor } from 'payload/types'

import { traverseFields } from '@payloadcms/next/utilities'
import { sanitizeFields } from 'payload/config'
import { deepCopyObject } from 'payload/utilities'

import type { FeatureProviderProviderServer } from '../types.js'
import type { ClientProps } from './feature.client.js'

import { convertLexicalNodesToHTML } from '../converters/html/converter/index.js'
import { createNode } from '../typeUtilities.js'
import { LinkFeatureClientComponent } from './feature.client.js'
import { AutoLinkNode } from './nodes/AutoLinkNode.js'
import { LinkNode } from './nodes/LinkNode.js'
import { transformExtraFields } from './plugins/floatingLinkEditor/utilities.js'
import { linkPopulationPromiseHOC } from './populationPromise.js'

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
    | ((args: {
        config: Config
        defaultFields: FieldWithRichTextRequiredEditor[]
      }) => FieldWithRichTextRequiredEditor[])
    | FieldWithRichTextRequiredEditor[]
}

export const LinkFeature: FeatureProviderProviderServer<LinkFeatureServerProps, ClientProps> = (
  props,
) => {
  if (!props) {
    props = {}
  }
  return {
    feature: async ({ config: _config }) => {
      const validRelationships = _config.collections.map((c) => c.slug) || []

      const _transformedFields = transformExtraFields(
        deepCopyObject(props.fields),
        _config,
        props.enabledCollections,
        props.disabledCollections,
      )

      const sanitizedFields = (await sanitizeFields({
        config: _config,
        fields: _transformedFields,
        requireFieldLevelRichTextEditor: true,
        validRelationships,
      })) as FieldWithRichTextRequiredEditor[]
      props.fields = sanitizedFields

      return {
        ClientComponent: LinkFeatureClientComponent,
        clientFeatureProps: {
          disabledCollections: props.disabledCollections,
          enabledCollections: props.enabledCollections,
        } as ExclusiveLinkCollectionsProps,
        generateSchemaMap: ({ config, i18n }) => {
          if (!sanitizedFields || !Array.isArray(sanitizedFields) || sanitizedFields.length === 0) {
            return null
          }

          const schemaMap = new Map<string, Field[]>()

          const validRelationships = config.collections.map((c) => c.slug) || []

          schemaMap.set('fields', sanitizedFields)

          traverseFields({
            config,
            fields: sanitizedFields,
            i18n,
            schemaMap,
            schemaPath: 'fields',
            validRelationships,
          })

          return schemaMap
        },
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
              },
            },
            hooks: {
              afterRead: [
                ({ node }) => {
                  return node
                },
              ],
            },
            node: AutoLinkNode,
            populationPromises: [linkPopulationPromiseHOC(props)],
          }),
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

                  const rel: string = node.fields.newTab ? ' rel="noopener noreferrer"' : ''

                  const href: string =
                    node.fields.linkType === 'custom'
                      ? node.fields.url
                      : (node.fields.doc?.value as string)

                  return `<a href="${href}"${rel}>${childrenText}</a>`
                },
                nodeTypes: [LinkNode.getType()],
              },
            },
            node: LinkNode,
            populationPromises: [linkPopulationPromiseHOC(props)],
          }),
        ],
        serverFeatureProps: props,
      }
    },
    key: 'link',
    serverFeatureProps: props,
  }
}
