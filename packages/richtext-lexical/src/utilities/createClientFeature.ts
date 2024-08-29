import type React from 'react'

import type {
  ClientComponentProps,
  ClientFeature,
  ClientFeatureProviderMap,
  FeatureProviderClient,
  FeatureProviderProviderClient,
  ResolvedClientFeatureMap,
} from '../features/typesClient.js'
import type { ClientEditorConfig } from '../lexical/config/types.js'

import { createClientComponent } from '../features/createClientComponent.js'

export type CreateClientFeatureArgs<UnSanitizedClientProps, ClientProps> =
  | ((props: {
      clientFunctions: Record<string, any>
      /** unSanitizedEditorConfig.features, but mapped */
      featureProviderMap: ClientFeatureProviderMap
      props: ClientComponentProps<UnSanitizedClientProps>
      // other resolved features, which have been loaded before this one. All features declared in 'dependencies' should be available here
      resolvedFeatures: ResolvedClientFeatureMap
      // unSanitized EditorConfig,
      unSanitizedEditorConfig: ClientEditorConfig
    }) => ClientFeature<ClientProps>)
  | Omit<ClientFeature<ClientProps>, 'sanitizedClientFeatureProps'>

export const createClientFeature: <
  UnSanitizedClientProps = undefined,
  ClientProps = UnSanitizedClientProps,
>(
  args: CreateClientFeatureArgs<UnSanitizedClientProps, ClientProps>,
) => React.FC<ClientComponentProps<ClientProps>> = (feature) => {
  const featureProviderProvideClient: FeatureProviderProviderClient<any, any> = (props) => {
    const featureProviderClient: Partial<FeatureProviderClient<any, any>> = {
      clientFeatureProps: props,
    }

    if (typeof feature === 'function') {
      featureProviderClient.feature = ({
        clientFunctions,
        featureProviderMap,
        resolvedFeatures,
        unSanitizedEditorConfig,
      }) => {
        const toReturn = feature({
          clientFunctions,
          featureProviderMap,
          props,
          resolvedFeatures,
          unSanitizedEditorConfig,
        })

        if (toReturn.sanitizedClientFeatureProps === null) {
          toReturn.sanitizedClientFeatureProps = props
        }

        return toReturn
      }
    } else {
      // We have to spread feature here! Otherwise, if the arg of createClientFeature is not a function, and 2
      // richText editors have the same feature (even if both call it, e.g. both call UploadFeature()),
      // the second richText editor here will override sanitizedClientFeatureProps of the first feature, as both richText
      // editor features share the same reference to the feature object.
      // Example: richText editor 1 and 2 both have UploadFeature. richText editor 1 calls UploadFeature() with custom fields,
      // richText editor 2 calls UploadFeature() with NO custom fields. If we don't spread feature here, richText editor 1
      // will not have any custom fields, as richText editor 2 will override the feature object.
      const newFeature: ClientFeature<any> = { ...feature }
      newFeature.sanitizedClientFeatureProps = props
      featureProviderClient.feature = newFeature
    }
    return featureProviderClient as FeatureProviderClient<any, any>
  }

  return createClientComponent(featureProviderProvideClient)
}
