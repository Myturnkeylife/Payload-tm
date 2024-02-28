import type { RichTextAdapter } from 'payload/types'

import { sanitizeFields } from 'payload/config'

import type { ResolvedServerFeatureMap } from './field/features/types'

export const getGenerateSchemaMap =
  (args: { resolvedFeatureMap: ResolvedServerFeatureMap }): RichTextAdapter['generateSchemaMap'] =>
  ({ config, schemaMap, schemaPath }) => {
    const validRelationships = config.collections.map((c) => c.slug) || []

    for (const [featureKey, resolvedFeature] of args.resolvedFeatureMap.entries()) {
      const schemas = resolvedFeature.generateSchemaMap({
        config,
        props: resolvedFeature.serverFeatureProps,
        schemaMap,
        schemaPath,
      })

      for (const schemaKey in schemas) {
        const fields = schemas[schemaKey]

        const sanitizedFields = sanitizeFields({
          config: config,
          fields: fields,
          validRelationships,
        })

        schemaMap.set(`${schemaPath}.feature.${featureKey}.${schemaKey}`, sanitizedFields)
      }
    }

    return schemaMap
  }
