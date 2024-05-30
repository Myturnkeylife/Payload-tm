'use client'
import type { EditorConfig as LexicalEditorConfig } from 'lexical'
import type { CellComponentProps } from 'payload/types'

import { createHeadlessEditor } from '@lexical/headless'
import { useTableCell } from '@payloadcms/ui/elements/Table'
import { useClientFunctions } from '@payloadcms/ui/providers/ClientFunction'
import { $getRoot } from 'lexical'
import React, { useEffect, useState } from 'react'

import type { FeatureProviderClient } from '../field/features/types.js'
import type { SanitizedClientEditorConfig } from '../field/lexical/config/types.js'
import type { GeneratedFeatureProviderComponent, LexicalFieldAdminProps } from '../types.js'

import { defaultEditorLexicalConfig } from '../field/lexical/config/client/default.js'
import { loadClientFeatures } from '../field/lexical/config/client/loader.js'
import { sanitizeClientEditorConfig } from '../field/lexical/config/client/sanitize.js'
import { getEnabledNodes } from '../field/lexical/nodes/index.js'

export const RichTextCell: React.FC<
  CellComponentProps & {
    admin?: LexicalFieldAdminProps
    lexicalEditorConfig: LexicalEditorConfig
  }
> = (props) => {
  const { admin, lexicalEditorConfig, richTextComponentMap } = props

  const [preview, setPreview] = React.useState('Loading...')

  const {
    cellData,
    cellProps: { schemaPath },
  } = useTableCell()

  const clientFunctions = useClientFunctions()
  const [hasLoadedFeatures, setHasLoadedFeatures] = useState(false)

  const [featureProviders, setFeatureProviders] = useState<FeatureProviderClient<unknown>[]>([])

  const [finalSanitizedEditorConfig, setFinalSanitizedEditorConfig] =
    useState<SanitizedClientEditorConfig>(null)

  const featureProviderComponents: GeneratedFeatureProviderComponent[] = (
    richTextComponentMap.get('features') as GeneratedFeatureProviderComponent[]
  ).sort((a, b) => a.order - b.order) // order by order

  let featureProvidersAndComponentsToLoad = 0 // feature providers and components
  for (const featureProvider of featureProviderComponents) {
    const featureComponentKeys = Array.from(richTextComponentMap.keys()).filter((key) =>
      key.startsWith(`feature.${featureProvider.key}.components.`),
    )

    featureProvidersAndComponentsToLoad += 1
    featureProvidersAndComponentsToLoad += featureComponentKeys.length
  }

  useEffect(() => {
    if (!hasLoadedFeatures) {
      const featureProvidersLocal: FeatureProviderClient<unknown>[] = []
      let featureProvidersAndComponentsLoaded = 0 // feature providers and components only

      Object.entries(clientFunctions).forEach(([key, plugin]) => {
        if (key.startsWith(`lexicalFeature.${schemaPath}.`)) {
          if (!key.includes('.components.')) {
            featureProvidersLocal.push(plugin)
          }
          featureProvidersAndComponentsLoaded++
        }
      })

      if (featureProvidersAndComponentsLoaded === featureProvidersAndComponentsToLoad) {
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
    featureProviderComponents,
    hasLoadedFeatures,
    clientFunctions,
    schemaPath,
    featureProviderComponents.length,
    featureProviders,
    finalSanitizedEditorConfig,
    lexicalEditorConfig,
    richTextComponentMap,
    featureProvidersAndComponentsToLoad,
  ])

  useEffect(() => {
    if (!hasLoadedFeatures) {
      return
    }
    let dataToUse = cellData
    if (dataToUse == null || !hasLoadedFeatures || !finalSanitizedEditorConfig) {
      setPreview('')
      return
    }

    // Transform data through load hooks
    if (finalSanitizedEditorConfig?.features?.hooks?.load?.length) {
      finalSanitizedEditorConfig.features.hooks.load.forEach((hook) => {
        dataToUse = hook({ incomingEditorState: dataToUse })
      })
    }

    if (!dataToUse || typeof dataToUse !== 'object') {
      setPreview('')
      return
    }

    // If data is from Slate and not Lexical
    if (Array.isArray(dataToUse) && !('root' in dataToUse)) {
      setPreview('')
      return
    }

    // If data is from payload-plugin-lexical
    if ('jsonContent' in dataToUse) {
      setPreview('')
      return
    }

    // initialize headless editor
    const headlessEditor = createHeadlessEditor({
      namespace: finalSanitizedEditorConfig.lexical.namespace,
      nodes: getEnabledNodes({ editorConfig: finalSanitizedEditorConfig }),
      theme: finalSanitizedEditorConfig.lexical.theme,
    })
    headlessEditor.setEditorState(headlessEditor.parseEditorState(dataToUse))

    const textContent =
      headlessEditor.getEditorState().read(() => {
        return $getRoot().getTextContent()
      }) || ''

    // Limiting the number of characters shown is done in a CSS rule
    setPreview(textContent)
  }, [cellData, lexicalEditorConfig, hasLoadedFeatures, finalSanitizedEditorConfig])

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
            })

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

  return <span>{preview}</span>
}
