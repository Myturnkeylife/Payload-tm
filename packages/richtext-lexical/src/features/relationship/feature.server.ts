import type { CollectionSlug } from 'payload'

// eslint-disable-next-line payload/no-imports-from-exports-dir
import { RelationshipFeatureClient } from '../../exports/client/index.js'
import { populate } from '../../populateGraphQL/populate.js'
import { createServerFeature } from '../../utilities/createServerFeature.js'
import { createNode } from '../typeUtilities.js'
import { relationshipPopulationPromiseHOC } from './graphQLPopulationPromise.js'
import { i18n } from './i18n.js'
import { RelationshipNode } from './nodes/RelationshipNode.js'

export type ExclusiveRelationshipFeatureProps =
  | {
      /**
       * The collections that should be disabled. Overrides the `enableRichTextRelationship` property in the collection config.
       * When this property is set, `enabledCollections` will not be available.
       **/
      disabledCollections?: CollectionSlug[]

      // Ensures that enabledCollections is not available when disabledCollections is set
      enabledCollections?: never
    }
  | {
      // Ensures that disabledCollections is not available when enabledCollections is set
      disabledCollections?: never

      /**
       * The collections that should be enabled. Overrides the `enableRichTextRelationship` property in the collection config
       * When this property is set, `disabledCollections` will not be available.
       **/
      enabledCollections?: CollectionSlug[]
    }

export type RelationshipFeatureProps = ExclusiveRelationshipFeatureProps & {
  /**
   * Sets a maximum population depth for this relationship, regardless of the remaining depth when the respective field is reached.
   * This behaves exactly like the maxDepth properties of relationship and upload fields.
   *
   * {@link https://payloadcms.com/docs/getting-started/concepts#field-level-max-depth}
   */
  maxDepth?: number
}

export const RelationshipFeature = createServerFeature<
  RelationshipFeatureProps,
  RelationshipFeatureProps
>({
  feature: ({ props }) => ({
    ClientFeature: RelationshipFeatureClient,
    i18n,
    nodes: [
      createNode({
        graphQLPopulationPromises: [relationshipPopulationPromiseHOC(props)],
        hooks: {
          afterRead: [
            ({
              currentDepth,
              depth,
              draft,
              node,
              overrideAccess,
              populationPromises,
              req,
              showHiddenFields,
            }) => {
              if (!node?.value) {
                return node
              }
              const collection = req.payload.collections[node?.relationTo]

              if (!collection) {
                return node
              }
              // @ts-expect-error
              const id = node?.value?.id || node?.value // for backwards-compatibility

              const populateDepth =
                props?.maxDepth !== undefined && props?.maxDepth < depth ? props?.maxDepth : depth

              populationPromises.push(
                populate({
                  id,
                  collectionSlug: collection.config.slug,
                  currentDepth,
                  data: node,
                  depth: populateDepth,
                  draft,
                  key: 'value',
                  overrideAccess,
                  req,
                  showHiddenFields,
                }),
              )

              return node
            },
          ],
        },
        node: RelationshipNode,
      }),
    ],
  }),
  key: 'relationship',
})
