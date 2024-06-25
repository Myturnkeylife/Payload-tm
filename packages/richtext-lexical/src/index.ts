import type { JSONSchema4 } from 'json-schema'
import type {
  EditorConfig as LexicalEditorConfig,
  SerializedEditorState,
  SerializedLexicalNode,
} from 'lexical'

import { withMergedProps } from '@payloadcms/ui/shared'
import { fileURLToPath } from 'node:url'
import path from 'path'
import {
  afterChangeTraverseFields,
  afterReadTraverseFields,
  beforeChangeTraverseFields,
  beforeValidateTraverseFields,
  getDependencies,
  withNullableJSONSchemaType,
} from 'payload'

import type { FeatureProviderServer, ResolvedServerFeatureMap } from './features/typesServer.js'
import type { SanitizedServerEditorConfig } from './lexical/config/types.js'
import type {
  AdapterProps,
  LexicalEditorProps,
  LexicalRichTextAdapter,
  LexicalRichTextAdapterProvider,
} from './types.js'

// eslint-disable-next-line payload/no-imports-from-exports-dir
import { RichTextCell, RichTextField } from './exports/client/index.js'
import { i18n } from './i18n.js'
import { defaultEditorConfig, defaultEditorFeatures } from './lexical/config/server/default.js'
import { loadFeatures } from './lexical/config/server/loader.js'
import {
  sanitizeServerEditorConfig,
  sanitizeServerFeatures,
} from './lexical/config/server/sanitize.js'
import { cloneDeep } from './lexical/utils/cloneDeep.js'
import { populateLexicalPopulationPromises } from './populateGraphQL/populateLexicalPopulationPromises.js'
import { getGenerateComponentMap } from './utilities/generateComponentMap.js'
import { getGenerateSchemaMap } from './utilities/generateSchemaMap.js'
import { recurseNodeTree } from './utilities/recurseNodeTree.js'
import { richTextValidateHOC } from './validate/index.js'

let defaultSanitizedServerEditorConfig: SanitizedServerEditorConfig = null

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export function lexicalEditor(props?: LexicalEditorProps): LexicalRichTextAdapterProvider {
  return async ({ config, isRoot }) => {
    if (process.env.NODE_ENV !== 'production') {
      const resolvedDependencies = await getDependencies(dirname, [
        'lexical',
        '@lexical/headless',
        '@lexical/link',
        '@lexical/list',
        '@lexical/mark',
        '@lexical/markdown',
        '@lexical/react',
        '@lexical/rich-text',
        '@lexical/selection',
        '@lexical/utils',
      ])

      // Go through each resolved dependency. If any dependency has a mismatching version, throw an error
      const foundVersions: {
        [version: string]: string
      } = {}
      for (const [_pkg, { version }] of resolvedDependencies.resolved) {
        if (!Object.keys(foundVersions).includes(version)) {
          foundVersions[version] = _pkg
        }
      }
      if (Object.keys(foundVersions).length > 1) {
        const formattedVersionsWithPackageNameString = Object.entries(foundVersions)
          .map(([version, pkg]) => `${pkg}@${version}`)
          .join(', ')

        throw new Error(
          `Mismatching lexical dependency versions found: ${formattedVersionsWithPackageNameString}. All lexical and @lexical/* packages must have the same version. This is an error with your set-up, caused by you, not a bug in payload. Please go to your package.json and ensure all lexical and @lexical/* packages have the same version.`,
        )
      }
    }

    let features: FeatureProviderServer<unknown, unknown, unknown>[] = []
    let resolvedFeatureMap: ResolvedServerFeatureMap

    let finalSanitizedEditorConfig: SanitizedServerEditorConfig // For server only
    if (!props || (!props.features && !props.lexical)) {
      if (!defaultSanitizedServerEditorConfig) {
        defaultSanitizedServerEditorConfig = await sanitizeServerEditorConfig(
          defaultEditorConfig,
          config,
        )
        features = cloneDeep(defaultEditorFeatures)
      }

      finalSanitizedEditorConfig = cloneDeep(defaultSanitizedServerEditorConfig)

      resolvedFeatureMap = finalSanitizedEditorConfig.resolvedFeatureMap
    } else {
      const rootEditor = config.editor
      let rootEditorFeatures: FeatureProviderServer<unknown, unknown, unknown>[] = []
      if (typeof rootEditor === 'object' && 'features' in rootEditor) {
        rootEditorFeatures = (rootEditor as LexicalRichTextAdapter).features
      }

      features =
        props.features && typeof props.features === 'function'
          ? props.features({
              defaultFeatures: cloneDeep(defaultEditorFeatures),
              rootFeatures: rootEditorFeatures,
            })
          : (props.features as FeatureProviderServer<unknown, unknown, unknown>[])
      if (!features) {
        features = cloneDeep(defaultEditorFeatures)
      }

      const lexical: LexicalEditorConfig = props.lexical

      resolvedFeatureMap = await loadFeatures({
        config,
        isRoot,
        unSanitizedEditorConfig: {
          features,
          lexical: lexical ? lexical : defaultEditorConfig.lexical,
        },
      })

      finalSanitizedEditorConfig = {
        features: sanitizeServerFeatures(resolvedFeatureMap),
        lexical: lexical ? lexical : defaultEditorConfig.lexical,
        resolvedFeatureMap,
      }
    }

    const featureI18n = finalSanitizedEditorConfig.features.i18n
    for (const lang in i18n) {
      if (!featureI18n[lang]) {
        featureI18n[lang] = {
          lexical: {},
        }
      }

      featureI18n[lang].lexical.general = i18n[lang]
    }

    return {
      CellComponent: withMergedProps({
        Component: RichTextCell,
        toMergeIntoProps: {
          admin: props?.admin,
          lexicalEditorConfig: finalSanitizedEditorConfig.lexical,
        },
      }),
      FieldComponent: withMergedProps({
        Component: RichTextField,
        toMergeIntoProps: {
          admin: props?.admin,
          lexicalEditorConfig: finalSanitizedEditorConfig.lexical,
        },
      }),
      editorConfig: finalSanitizedEditorConfig,
      features,
      generateComponentMap: getGenerateComponentMap({
        resolvedFeatureMap,
      }),
      generateSchemaMap: getGenerateSchemaMap({
        resolvedFeatureMap,
      }),
      graphQLPopulationPromises({
        context,
        currentDepth,
        depth,
        draft,
        field,
        fieldPromises,
        findMany,
        flattenLocales,
        overrideAccess,
        populationPromises,
        req,
        showHiddenFields,
        siblingDoc,
      }) {
        // check if there are any features with nodes which have populationPromises for this field
        if (finalSanitizedEditorConfig?.features?.graphQLPopulationPromises?.size) {
          populateLexicalPopulationPromises({
            context,
            currentDepth: currentDepth ?? 0,
            depth,
            draft,
            editorPopulationPromises: finalSanitizedEditorConfig.features.graphQLPopulationPromises,
            field,
            fieldPromises,
            findMany,
            flattenLocales,
            overrideAccess,
            populationPromises,
            req,
            showHiddenFields,
            siblingDoc,
          })
        }
      },
      hooks: {
        afterChange: [
          async ({
            collection,
            context: _context,
            global,
            operation,
            path,
            req,
            schemaPath,
            value,
          }) => {
            if (
              !finalSanitizedEditorConfig.features.hooks.afterChange.size &&
              !finalSanitizedEditorConfig.features.getSubFields.size
            ) {
              return value
            }
            const context: any = _context
            const nodeIDMap: {
              [key: string]: SerializedLexicalNode
            } = {}

            /**
             * Get the originalNodeIDMap from the beforeValidate hook, which is always run before this hook.
             */
            const originalNodeIDMap: {
              [key: string]: SerializedLexicalNode
            } = context?.internal?.richText?.[path.join('.')]?.originalNodeIDMap

            if (!originalNodeIDMap || !Object.keys(originalNodeIDMap).length || !value) {
              return value
            }

            recurseNodeTree({
              nodeIDMap,
              nodes: (value as SerializedEditorState)?.root?.children ?? [],
            })

            // eslint-disable-next-line prefer-const
            for (let [id, node] of Object.entries(nodeIDMap)) {
              const afterChangeHooks = finalSanitizedEditorConfig.features.hooks.afterChange
              if (afterChangeHooks?.has(node.type)) {
                for (const hook of afterChangeHooks.get(node.type)) {
                  if (!originalNodeIDMap[id]) {
                    console.warn(
                      '(afterChange) No original node found for node with id',
                      id,
                      'node:',
                      node,
                      'path',
                      path.join('.'),
                    )
                    continue
                  }
                  node = await hook({
                    context,
                    node,
                    operation,
                    originalNode: originalNodeIDMap[id],
                    parentRichTextFieldPath: path,
                    parentRichTextFieldSchemaPath: schemaPath,
                    req,
                  })
                }
              }
              const subFieldFn = finalSanitizedEditorConfig.features.getSubFields.get(node.type)
              const subFieldDataFn = finalSanitizedEditorConfig.features.getSubFieldsData.get(
                node.type,
              )

              if (subFieldFn) {
                const subFields = subFieldFn({ node, req })
                const data = subFieldDataFn({ node, req }) ?? {}
                const originalData = subFieldDataFn({ node: originalNodeIDMap[id], req }) ?? {}

                if (subFields?.length) {
                  await afterChangeTraverseFields({
                    collection,
                    context,
                    data: originalData,
                    doc: data,
                    fields: subFields,
                    global,
                    operation,
                    path,
                    previousDoc: data,
                    previousSiblingDoc: { ...data },
                    req,
                    schemaPath,
                    siblingData: originalData || {},
                    siblingDoc: { ...data },
                  })
                }
              }
            }
            return value
          },
        ],
        afterRead: [
          /**
           * afterRead hooks do not receive the originalNode. Thus, they can run on all nodes, not just nodes with an ID.
           */
          async ({
            collection,
            context: context,
            currentDepth,
            depth,
            draft,
            fallbackLocale,
            fieldPromises,
            findMany,
            flattenLocales,
            global,
            locale,
            overrideAccess,
            path,
            populationPromises,
            req,
            schemaPath,
            showHiddenFields,
            triggerAccessControl,
            triggerHooks,
            value,
          }) => {
            if (
              !finalSanitizedEditorConfig.features.hooks.afterRead.size &&
              !finalSanitizedEditorConfig.features.getSubFields.size
            ) {
              return value
            }
            const flattenedNodes: SerializedLexicalNode[] = []

            recurseNodeTree({
              flattenedNodes,
              nodes: (value as SerializedEditorState)?.root?.children ?? [],
            })

            for (let node of flattenedNodes) {
              const afterReadHooks = finalSanitizedEditorConfig.features.hooks.afterRead
              if (afterReadHooks?.has(node.type)) {
                for (const hook of afterReadHooks.get(node.type)) {
                  node = await hook({
                    context,
                    currentDepth,
                    depth,
                    draft,
                    fallbackLocale,
                    fieldPromises,
                    findMany,
                    flattenLocales,
                    locale,
                    node,
                    overrideAccess,
                    parentRichTextFieldPath: path,
                    parentRichTextFieldSchemaPath: schemaPath,
                    populationPromises,
                    req,
                    showHiddenFields,
                    triggerAccessControl,
                    triggerHooks,
                  })
                }
              }
              const subFieldFn = finalSanitizedEditorConfig.features.getSubFields.get(node.type)
              const subFieldDataFn = finalSanitizedEditorConfig.features.getSubFieldsData.get(
                node.type,
              )

              if (subFieldFn) {
                const subFields = subFieldFn({ node, req })
                const data = subFieldDataFn({ node, req }) ?? {}

                if (subFields?.length) {
                  afterReadTraverseFields({
                    collection,
                    context,
                    currentDepth,
                    depth,
                    doc: data,
                    draft,
                    fallbackLocale,
                    fieldPromises,
                    fields: subFields,
                    findMany,
                    flattenLocales,
                    global,
                    locale,
                    overrideAccess,
                    path,
                    populationPromises,
                    req,
                    schemaPath,
                    showHiddenFields,
                    siblingDoc: data,
                    triggerAccessControl,
                    triggerHooks,
                  })
                }
              }
            }

            return value
          },
        ],
        beforeChange: [
          async ({
            collection,
            context: _context,
            duplicate,
            errors,
            field,
            global,
            mergeLocaleActions,
            operation,
            path,
            req,
            schemaPath,
            siblingData,
            siblingDocWithLocales,
            skipValidation,
            value,
          }) => {
            if (
              !finalSanitizedEditorConfig.features.hooks.beforeChange.size &&
              !finalSanitizedEditorConfig.features.getSubFields.size
            ) {
              return value
            }

            const context: any = _context
            const nodeIDMap: {
              [key: string]: SerializedLexicalNode
            } = {}

            /**
             * Get the originalNodeIDMap from the beforeValidate hook, which is always run before this hook.
             */
            const originalNodeIDMap: {
              [key: string]: SerializedLexicalNode
            } = context?.internal?.richText?.[path.join('.')]?.originalNodeIDMap

            if (!originalNodeIDMap || !Object.keys(originalNodeIDMap).length || !value) {
              return value
            }

            const originalNodeWithLocalesIDMap: {
              [key: string]: SerializedLexicalNode
            } = {}

            recurseNodeTree({
              nodeIDMap,
              nodes: (value as SerializedEditorState)?.root?.children ?? [],
            })

            if (siblingDocWithLocales?.[field.name]) {
              recurseNodeTree({
                nodeIDMap: originalNodeWithLocalesIDMap,
                nodes:
                  (siblingDocWithLocales[field.name] as SerializedEditorState)?.root?.children ??
                  [],
              })
            }

            // eslint-disable-next-line prefer-const
            for (let [id, node] of Object.entries(nodeIDMap)) {
              const beforeChangeHooks = finalSanitizedEditorConfig.features.hooks.beforeChange
              if (beforeChangeHooks?.has(node.type)) {
                for (const hook of beforeChangeHooks.get(node.type)) {
                  if (!originalNodeIDMap[id]) {
                    console.warn(
                      '(beforeChange) No original node found for node with id',
                      id,
                      'node:',
                      node,
                      'path',
                      path.join('.'),
                    )
                    continue
                  }
                  node = await hook({
                    context,
                    duplicate,
                    errors,
                    mergeLocaleActions,
                    node,
                    operation,
                    originalNode: originalNodeIDMap[id],
                    originalNodeWithLocales: originalNodeWithLocalesIDMap[id],
                    parentRichTextFieldPath: path,
                    parentRichTextFieldSchemaPath: schemaPath,
                    req,
                    skipValidation,
                  })
                }
              }

              const subFieldFn = finalSanitizedEditorConfig.features.getSubFields.get(node.type)
              const subFieldDataFn = finalSanitizedEditorConfig.features.getSubFieldsData.get(
                node.type,
              )

              if (subFieldFn) {
                const subFields = subFieldFn({ node, req })
                const data = subFieldDataFn({ node, req }) ?? {}
                const originalData = subFieldDataFn({ node: originalNodeIDMap[id], req }) ?? {}
                const originalDataWithLocales =
                  subFieldDataFn({
                    node: originalNodeWithLocalesIDMap[id],
                    req,
                  }) ?? {}

                if (subFields?.length) {
                  await beforeChangeTraverseFields({
                    id,
                    collection,
                    context,
                    data,
                    doc: originalData,
                    docWithLocales: originalDataWithLocales ?? {},
                    duplicate,
                    errors,
                    fields: subFields,
                    global,
                    mergeLocaleActions,
                    operation,
                    path,
                    req,
                    schemaPath,
                    siblingData: data,
                    siblingDoc: originalData,
                    siblingDocWithLocales: originalDataWithLocales ?? {},
                    skipValidation,
                  })
                }
              }
            }

            /**
             * within the beforeChange hook, id's may be re-generated.
             * Example:
             * 1. Seed data contains IDs for block feature blocks.
             * 2. Those are used in beforeValidate
             * 3. in beforeChange, those IDs are regenerated, because you cannot provide IDs during document creation. See baseIDField beforeChange hook for reasoning
             * 4. Thus, in order for all post-beforeChange hooks to receive the correct ID, we need to update the originalNodeIDMap with the new ID's, by regenerating the nodeIDMap.
             * The reason this is not generated for every hook, is to save on performance. We know we only really have to generate it in beforeValidate, which is the first hook,
             * and in beforeChange, which is where modifications to the provided IDs can occur.
             */
            const newOriginalNodeIDMap: {
              [key: string]: SerializedLexicalNode
            } = {}

            const previousValue = siblingData[field.name]

            recurseNodeTree({
              nodeIDMap: newOriginalNodeIDMap,
              nodes: (previousValue as SerializedEditorState)?.root?.children ?? [],
            })

            if (!context.internal) {
              // Add to context, for other hooks to use
              context.internal = {}
            }
            if (!context.internal.richText) {
              context.internal.richText = {}
            }
            context.internal.richText[path.join('.')] = {
              originalNodeIDMap: newOriginalNodeIDMap,
            }

            return value
          },
        ],
        beforeValidate: [
          async ({
            collection,
            context,
            global,
            operation,
            overrideAccess,
            path,
            previousValue,
            req,
            schemaPath,
            value,
          }) => {
            // return value if there are NO hooks
            if (
              !finalSanitizedEditorConfig.features.hooks.beforeValidate.size &&
              !finalSanitizedEditorConfig.features.hooks.afterChange.size &&
              !finalSanitizedEditorConfig.features.hooks.beforeChange.size &&
              !finalSanitizedEditorConfig.features.getSubFields.size
            ) {
              return value
            }

            /**
             * beforeValidate is the first field hook which runs. This is where we can create the node map, which can then be used in the other hooks.
             *
             */

            /**
             * flattenedNodes contains all nodes in the editor, in the order they appear in the editor. They will be used for the following hooks:
             * - afterRead
             *
             * The other hooks require nodes to have IDs, which is why those are ran only from the nodeIDMap. They require IDs because they have both doc/siblingDoc and data/siblingData, and
             * thus require a reliable way to match new node data to old node data. Given that node positions can change in between hooks, this is only reliably possible for nodes which are saved with
             * an ID.
             */
            //const flattenedNodes: SerializedLexicalNode[] = []

            /**
             * Only nodes with id's (so, nodes with hooks added to them) will be added to the nodeIDMap. They will be used for the following hooks:
             * - afterChange
             * - beforeChange
             * - beforeValidate
             * - beforeDuplicate
             *
             * Other hooks are handled by the flattenedNodes. All nodes in the nodeIDMap are part of flattenedNodes.
             */

            const originalNodeIDMap: {
              [key: string]: SerializedLexicalNode
            } = {}

            recurseNodeTree({
              nodeIDMap: originalNodeIDMap,
              nodes: (previousValue as SerializedEditorState)?.root?.children ?? [],
            })

            if (!context.internal) {
              // Add to context, for other hooks to use
              context.internal = {}
            }
            if (!(context as any).internal.richText) {
              ;(context as any).internal.richText = {}
            }
            ;(context as any).internal.richText[path.join('.')] = {
              originalNodeIDMap,
            }

            /**
             * Now that the maps for all hooks are set up, we can run the validate hook
             */
            if (!finalSanitizedEditorConfig.features.hooks.beforeValidate.size) {
              return value
            }
            const nodeIDMap: {
              [key: string]: SerializedLexicalNode
            } = {}
            recurseNodeTree({
              //flattenedNodes,
              nodeIDMap,
              nodes: (value as SerializedEditorState)?.root?.children ?? [],
            })

            // eslint-disable-next-line prefer-const
            for (let [id, node] of Object.entries(nodeIDMap)) {
              const beforeValidateHooks = finalSanitizedEditorConfig.features.hooks.beforeValidate
              if (beforeValidateHooks?.has(node.type)) {
                for (const hook of beforeValidateHooks.get(node.type)) {
                  if (!originalNodeIDMap[id]) {
                    console.warn(
                      '(beforeValidate) No original node found for node with id',
                      id,
                      'node:',
                      node,
                      'path',
                      path.join('.'),
                    )
                    continue
                  }
                  node = await hook({
                    context,
                    node,
                    operation,
                    originalNode: originalNodeIDMap[id],
                    overrideAccess,
                    parentRichTextFieldPath: path,
                    parentRichTextFieldSchemaPath: schemaPath,
                    req,
                  })
                }
              }
              const subFieldFn = finalSanitizedEditorConfig.features.getSubFields.get(node.type)
              const subFieldDataFn = finalSanitizedEditorConfig.features.getSubFieldsData.get(
                node.type,
              )

              if (subFieldFn) {
                const subFields = subFieldFn({ node, req })
                const data = subFieldDataFn({ node, req }) ?? {}
                const originalData = subFieldDataFn({ node: originalNodeIDMap[id], req }) ?? {}

                if (subFields?.length) {
                  await beforeValidateTraverseFields({
                    id,
                    collection,
                    context,
                    data,
                    doc: originalData,
                    fields: subFields,
                    global,
                    operation,
                    overrideAccess,
                    path,
                    req,
                    schemaPath,
                    siblingData: data,
                    siblingDoc: originalData,
                  })
                }
              }
            }

            return value
          },
        ],
      },
      i18n: featureI18n,
      outputSchema: ({
        collectionIDFieldTypes,
        config,
        field,
        interfaceNameDefinitions,
        isRequired,
      }) => {
        let outputSchema: JSONSchema4 = {
          // This schema matches the SerializedEditorState type so far, that it's possible to cast SerializedEditorState to this schema without any errors.
          // In the future, we should
          // 1) allow recursive children
          // 2) Pass in all the different types for every node added to the editorconfig. This can be done with refs in the schema.
          type: withNullableJSONSchemaType('object', isRequired),
          properties: {
            root: {
              type: 'object',
              additionalProperties: false,
              properties: {
                type: {
                  type: 'string',
                },
                children: {
                  type: 'array',
                  items: {
                    type: 'object',
                    additionalProperties: true,
                    properties: {
                      type: {
                        type: 'string',
                      },
                      version: {
                        type: 'integer',
                      },
                    },
                    required: ['type', 'version'],
                  },
                },
                direction: {
                  oneOf: [
                    {
                      enum: ['ltr', 'rtl'],
                    },
                    {
                      type: 'null',
                    },
                  ],
                },
                format: {
                  type: 'string',
                  enum: ['left', 'start', 'center', 'right', 'end', 'justify', ''], // ElementFormatType, since the root node is an element
                },
                indent: {
                  type: 'integer',
                },
                version: {
                  type: 'integer',
                },
              },
              required: ['children', 'direction', 'format', 'indent', 'type', 'version'],
            },
          },
          required: ['root'],
        }
        for (const modifyOutputSchema of finalSanitizedEditorConfig.features.generatedTypes
          .modifyOutputSchemas) {
          outputSchema = modifyOutputSchema({
            collectionIDFieldTypes,
            config,
            currentSchema: outputSchema,
            field,
            interfaceNameDefinitions,
            isRequired,
          })
        }

        return outputSchema
      },
      validate: richTextValidateHOC({
        editorConfig: finalSanitizedEditorConfig,
      }),
    }
  }
}

export { AlignFeature } from './features/align/feature.server.js'
export { BlockquoteFeature } from './features/blockquote/feature.server.js'
export { BlocksFeature, type BlocksFeatureProps } from './features/blocks/feature.server.js'
export {
  type BlockFields,
  BlockNode,
  type SerializedBlockNode,
} from './features/blocks/nodes/BlocksNode.js'

export { LinebreakHTMLConverter } from './features/converters/html/converter/converters/linebreak.js'
export { ParagraphHTMLConverter } from './features/converters/html/converter/converters/paragraph.js'
export { TextHTMLConverter } from './features/converters/html/converter/converters/text.js'

export { defaultHTMLConverters } from './features/converters/html/converter/defaultConverters.js'
export {
  convertLexicalNodesToHTML,
  convertLexicalToHTML,
} from './features/converters/html/converter/index.js'
export type { HTMLConverter } from './features/converters/html/converter/types.js'
export {
  HTMLConverterFeature,
  type HTMLConverterFeatureProps,
} from './features/converters/html/feature.server.js'
export { consolidateHTMLConverters, lexicalHTML } from './features/converters/html/field/index.js'
export { TestRecorderFeature } from './features/debug/testRecorder/feature.server.js'
export { TreeViewFeature } from './features/debug/treeView/feature.server.js'
export { BoldFeature } from './features/format/bold/feature.server.js'
export { InlineCodeFeature } from './features/format/inlineCode/feature.server.js'

export { ItalicFeature } from './features/format/italic/feature.server.js'
export { StrikethroughFeature } from './features/format/strikethrough/feature.server.js'
export { SubscriptFeature } from './features/format/subscript/feature.server.js'
export { SuperscriptFeature } from './features/format/superscript/feature.server.js'
export { UnderlineFeature } from './features/format/underline/feature.server.js'
export { HeadingFeature, type HeadingFeatureProps } from './features/heading/feature.server.js'
export { HorizontalRuleFeature } from './features/horizontalRule/feature.server.js'

export { IndentFeature } from './features/indent/feature.server.js'
export { LinkFeature, type LinkFeatureServerProps } from './features/link/feature.server.js'

export { AutoLinkNode } from './features/link/nodes/AutoLinkNode.js'
export { LinkNode } from './features/link/nodes/LinkNode.js'
export type {
  LinkFields,
  SerializedAutoLinkNode,
  SerializedLinkNode,
} from './features/link/nodes/types.js'
export { ChecklistFeature } from './features/lists/checklist/feature.server.js'
export { OrderedListFeature } from './features/lists/orderedList/feature.server.js'
export { UnorderedListFeature } from './features/lists/unorderedList/feature.server.js'
export { LexicalPluginToLexicalFeature } from './features/migrations/lexicalPluginToLexical/feature.server.js'
export { SlateBlockquoteConverter } from './features/migrations/slateToLexical/converter/converters/blockquote/index.js'
export { SlateHeadingConverter } from './features/migrations/slateToLexical/converter/converters/heading/index.js'
export { SlateIndentConverter } from './features/migrations/slateToLexical/converter/converters/indent/index.js'
export { SlateLinkConverter } from './features/migrations/slateToLexical/converter/converters/link/index.js'
export { SlateListItemConverter } from './features/migrations/slateToLexical/converter/converters/listItem/index.js'
export { SlateOrderedListConverter } from './features/migrations/slateToLexical/converter/converters/orderedList/index.js'
export { SlateRelationshipConverter } from './features/migrations/slateToLexical/converter/converters/relationship/index.js'
export { SlateUnknownConverter } from './features/migrations/slateToLexical/converter/converters/unknown/index.js'
export { SlateUnorderedListConverter } from './features/migrations/slateToLexical/converter/converters/unorderedList/index.js'
export { SlateUploadConverter } from './features/migrations/slateToLexical/converter/converters/upload/index.js'
export { defaultSlateConverters } from './features/migrations/slateToLexical/converter/defaultConverters.js'

export {
  convertSlateNodesToLexical,
  convertSlateToLexical,
} from './features/migrations/slateToLexical/converter/index.js'
export type {
  SlateNode,
  SlateNodeConverter,
} from './features/migrations/slateToLexical/converter/types.js'
export { SlateToLexicalFeature } from './features/migrations/slateToLexical/feature.server.js'

export { ParagraphFeature } from './features/paragraph/feature.server.js'
export {
  RelationshipFeature,
  type RelationshipFeatureProps,
} from './features/relationship/feature.server.js'
export {
  type RelationshipData,
  RelationshipNode,
  type SerializedRelationshipNode,
} from './features/relationship/nodes/RelationshipNode.js'

export { FixedToolbarFeature } from './features/toolbars/fixed/feature.server.js'
export { InlineToolbarFeature } from './features/toolbars/inline/feature.server.js'

export type { ToolbarGroup, ToolbarGroupItem } from './features/toolbars/types.js'
export { createNode } from './features/typeUtilities.js' // Only useful in feature.server.ts
export type {
  ClientComponentProps,
  ClientFeature,
  ClientFeatureProviderMap,
  FeatureProviderClient,
  FeatureProviderProviderClient,
  PluginComponent,
  PluginComponentWithAnchor,
  ResolvedClientFeature,
  ResolvedClientFeatureMap,
  SanitizedClientFeatures,
  SanitizedPlugin,
} from './features/typesClient.js'

export type {
  AfterChangeNodeHook,
  AfterChangeNodeHookArgs,
  AfterReadNodeHook,
  AfterReadNodeHookArgs,
  BaseNodeHookArgs,
  BeforeChangeNodeHook,
  BeforeChangeNodeHookArgs,
  BeforeValidateNodeHook,
  BeforeValidateNodeHookArgs,
  FeatureProviderProviderServer,
  FeatureProviderServer,
  NodeValidation,
  NodeWithHooks,
  PopulationPromise,
  ResolvedServerFeature,
  ResolvedServerFeatureMap,
  SanitizedServerFeatures,
  ServerFeature,
  ServerFeatureProviderMap,
} from './features/typesServer.js'

export { UploadFeature } from './features/upload/feature.server.js'

export type { UploadFeatureProps } from './features/upload/feature.server.js'
export {
  type SerializedUploadNode,
  type UploadData,
  UploadNode,
} from './features/upload/nodes/UploadNode.js'

export type { EditorConfigContextType } from './lexical/config/client/EditorConfigProvider.js'
export {
  defaultEditorConfig,
  defaultEditorFeatures,
  defaultEditorLexicalConfig,
} from './lexical/config/server/default.js'

export { loadFeatures, sortFeaturesForOptimalLoading } from './lexical/config/server/loader.js'
export {
  sanitizeServerEditorConfig,
  sanitizeServerFeatures,
} from './lexical/config/server/sanitize.js'

export type {
  ClientEditorConfig,
  SanitizedClientEditorConfig,
  SanitizedServerEditorConfig,
  ServerEditorConfig,
} from './lexical/config/types.js'
export { getEnabledNodes } from './lexical/nodes/index.js'
export type { AdapterProps }

export type {
  SlashMenuGroup,
  SlashMenuItem,
} from './lexical/plugins/SlashMenu/LexicalTypeaheadMenuPlugin/types.js'

export {
  DETAIL_TYPE_TO_DETAIL,
  DOUBLE_LINE_BREAK,
  ELEMENT_FORMAT_TO_TYPE,
  ELEMENT_TYPE_TO_FORMAT,
  IS_ALL_FORMATTING,
  LTR_REGEX,
  NON_BREAKING_SPACE,
  NodeFormat,
  RTL_REGEX,
  TEXT_MODE_TO_TYPE,
  TEXT_TYPE_TO_FORMAT,
  TEXT_TYPE_TO_MODE,
} from './lexical/utils/nodeFormat.js'
export { sanitizeUrl, validateUrl } from './lexical/utils/url.js'

export { defaultRichTextValue } from './populateGraphQL/defaultValue.js'

export type { LexicalEditorProps, LexicalRichTextAdapter } from './types.js'

export { createServerFeature } from './utilities/createServerFeature.js'
