'use client'
import type { FormFieldBase } from '@payloadcms/ui/fields/shared'
import type { EditorConfig as LexicalEditorConfig } from 'lexical'

import { ShimmerEffect } from '@payloadcms/ui/elements/ShimmerEffect'
import { useFieldProps } from '@payloadcms/ui/forms/FieldPropsProvider'
import { useClientFunctions } from '@payloadcms/ui/providers/ClientFunction'
import React, { Suspense, lazy, useEffect, useState } from 'react'

import type { GeneratedFeatureProviderComponent, LexicalFieldAdminProps } from '../types.js'
import type { FeatureProviderClient } from './features/types.js'
import type { SanitizedClientEditorConfig } from './lexical/config/types.js'

import { defaultEditorLexicalConfig } from './lexical/config/client/default.js'
import { loadClientFeatures } from './lexical/config/client/loader.js'
import { sanitizeClientEditorConfig } from './lexical/config/client/sanitize.js'

const RichTextEditor = lazy(() =>
  import('./Field.js').then((module) => ({ default: module.RichText })),
)

export const RichTextField: React.FC<
  FormFieldBase & {
    admin?: LexicalFieldAdminProps
    lexicalEditorConfig: LexicalEditorConfig
    name: string
    richTextComponentMap: Map<string, React.ReactNode>
  }
> = (props) => {
  const { admin, lexicalEditorConfig, richTextComponentMap } = props
  const { schemaPath } = useFieldProps()
  const clientFunctions = useClientFunctions()
  const [hasLoadedFeatures, setHasLoadedFeatures] = useState(false)

  const [featureProviders, setFeatureProviders] = useState<FeatureProviderClient<unknown>[]>([])

  const [finalSanitizedEditorConfig, setFinalSanitizedEditorConfig] =
    useState<SanitizedClientEditorConfig>(null)

  let featureProviderComponents: GeneratedFeatureProviderComponent[] = richTextComponentMap.get(
    'features',
  ) as GeneratedFeatureProviderComponent[] // TODO: Type better
  // order by order
  featureProviderComponents = featureProviderComponents.sort((a, b) => a.order - b.order)

  const featureComponentsWithFeaturesLength =
    Array.from(richTextComponentMap.keys()).filter(
      (key) => key.startsWith(`feature.`) && !key.includes('.fields.'),
    ).length + featureProviderComponents.length

  useEffect(() => {
    if (!hasLoadedFeatures) {
      const featureProvidersLocal: FeatureProviderClient<unknown>[] = []
      let featureProvidersAndComponentsLoaded = 0

      Object.entries(clientFunctions).forEach(([key, plugin]) => {
        if (key.startsWith(`lexicalFeature.${schemaPath}.`)) {
          if (!key.includes('.components.')) {
            featureProvidersLocal.push(plugin)
          }
          featureProvidersAndComponentsLoaded++
        }
      })

      if (featureProvidersAndComponentsLoaded === featureComponentsWithFeaturesLength) {
        setFeatureProviders(featureProvidersLocal)
        setHasLoadedFeatures(true)

        /**
         * Loaded feature provided => create the final sanitized editor config
         */

        const resolvedClientFeatures = loadClientFeatures({
          clientFunctions,
          schemaPath,
          unSanitizedEditorConfig: {
            features: featureProvidersLocal,
            lexical: lexicalEditorConfig,
          },
        })

        setFinalSanitizedEditorConfig(
          sanitizeClientEditorConfig(
            lexicalEditorConfig ? lexicalEditorConfig : defaultEditorLexicalConfig,
            resolvedClientFeatures,
            admin,
          ),
        )
      }
    }
  }, [
    admin,
    hasLoadedFeatures,
    clientFunctions,
    schemaPath,
    featureProviderComponents.length,
    featureProviders,
    finalSanitizedEditorConfig,
    lexicalEditorConfig,
    featureComponentsWithFeaturesLength,
  ])

  if (!hasLoadedFeatures) {
    return (
      <React.Fragment>
        {Array.isArray(featureProviderComponents) &&
          featureProviderComponents.map((featureProvider) => {
            // get all components starting with key feature.${FeatureProvider.key}.components.{featureComponentKey}
            const featureComponentKeys = Array.from(richTextComponentMap.keys()).filter((key) =>
              key.startsWith(`feature.${featureProvider.key}.components.`),
            )
            const featureComponents: React.ReactNode[] = featureComponentKeys.map((key) => {
              return richTextComponentMap.get(key)
            }) // TODO: Type better

            return (
              <React.Fragment key={featureProvider.key}>
                {featureComponents?.length
                  ? featureComponents.map((FeatureComponent) => {
                      return FeatureComponent
                    })
                  : null}
                {featureProvider.ClientComponent}
              </React.Fragment>
            )
          })}
      </React.Fragment>
    )
  }

  return (
    <Suspense fallback={<ShimmerEffect height="35vh" />}>
      {finalSanitizedEditorConfig && (
        <RichTextEditor {...props} editorConfig={finalSanitizedEditorConfig} />
      )}
    </Suspense>
  )
}
