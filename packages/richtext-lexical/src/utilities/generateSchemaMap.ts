import type { RichTextAdapter } from 'payload'

import type { ResolvedServerFeatureMap } from '../features/typesServer.js'

export const getGenerateSchemaMap =
  (args: { resolvedFeatureMap: ResolvedServerFeatureMap }): RichTextAdapter['generateSchemaMap'] =>
  ({ config, i18n, schemaMap, schemaPath }) => {
    for (const [featureKey, resolvedFeature] of args.resolvedFeatureMap.entries()) {
      if (
        !('generateSchemaMap' in resolvedFeature) ||
        typeof resolvedFeature.generateSchemaMap !== 'function'
      ) {
        continue
      }
      const schemas = resolvedFeature.generateSchemaMap({
        config,
        i18n,
        props: resolvedFeature.sanitizedServerFeatureProps,
        schemaMap,
        schemaPath,
      })

      if (schemas) {
        for (const [schemaKey, fields] of schemas.entries()) {
          schemaMap.set(`${schemaPath}.feature.${featureKey}.${schemaKey}`, fields)
        }
      }
    }

    return schemaMap
  }
