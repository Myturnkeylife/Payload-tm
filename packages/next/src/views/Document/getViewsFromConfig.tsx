import type {
  AdminViewProps,
  CollectionPermission,
  GlobalPermission,
  PayloadComponent,
  SanitizedCollectionConfig,
  SanitizedConfig,
  SanitizedGlobalConfig,
  ServerSideEditViewProps,
} from 'payload'
import type React from 'react'

import { notFound } from 'next/navigation.js'

import { APIView as DefaultAPIView } from '../API/index.js'
import { EditView as DefaultEditView } from '../Edit/index.js'
import { LivePreviewView as DefaultLivePreviewView } from '../LivePreview/index.js'
import { UnauthorizedView } from '../Unauthorized/index.js'
import { VersionView as DefaultVersionView } from '../Version/index.js'
import { VersionsView as DefaultVersionsView } from '../Versions/index.js'
import { getCustomViewByKey } from './getCustomViewByKey.js'
import { getCustomViewByRoute } from './getCustomViewByRoute.js'

export type ViewFromConfig<TProps extends object> = {
  Component?: React.FC<TProps>
  payloadComponent?: PayloadComponent<TProps>
}

export const getViewsFromConfig = ({
  collectionConfig,
  config,
  docPermissions,
  globalConfig,
  overrideDocPermissions,
  routeSegments,
}: {
  collectionConfig?: SanitizedCollectionConfig
  config: SanitizedConfig
  globalConfig?: SanitizedGlobalConfig
  routeSegments: string[]
} & (
  | {
      docPermissions: CollectionPermission | GlobalPermission
      overrideDocPermissions?: false | undefined
    }
  | {
      docPermissions?: never
      overrideDocPermissions: true
    }
)): {
  CustomView: ViewFromConfig<ServerSideEditViewProps>
  DefaultView: ViewFromConfig<ServerSideEditViewProps>
  /**
   * The error view to display if CustomView or DefaultView do not exist (could be either due to not found, or unauthorized). Can be null
   */
  ErrorView: ViewFromConfig<AdminViewProps>
  viewKey: string
} | null => {
  // Conditionally import and lazy load the default view
  let DefaultView: ViewFromConfig<ServerSideEditViewProps> = null
  let CustomView: ViewFromConfig<ServerSideEditViewProps> = null
  let ErrorView: ViewFromConfig<AdminViewProps> = null
  let viewKey: string

  const {
    routes: { admin: adminRoute },
  } = config

  const views =
    (collectionConfig && collectionConfig?.admin?.components?.views) ||
    (globalConfig && globalConfig?.admin?.components?.views)

  const livePreviewEnabled =
    (collectionConfig && collectionConfig?.admin?.livePreview) ||
    config?.admin?.livePreview?.collections?.includes(collectionConfig?.slug) ||
    (globalConfig && globalConfig?.admin?.livePreview) ||
    config?.admin?.livePreview?.globals?.includes(globalConfig?.slug)

  if (collectionConfig) {
    const [collectionEntity, collectionSlug, segment3, segment4, segment5, ...remainingSegments] =
      routeSegments

    if (!overrideDocPermissions && !docPermissions?.read?.permission) {
      notFound()
    } else {
      // `../:id`, or `../create`
      switch (routeSegments.length) {
        case 3: {
          switch (segment3) {
            case 'create': {
              if (
                !overrideDocPermissions &&
                'create' in docPermissions &&
                docPermissions?.create?.permission
              ) {
                CustomView = {
                  payloadComponent: getCustomViewByKey(views, 'default'),
                }
                DefaultView = {
                  Component: DefaultEditView,
                }
              } else {
                ErrorView = {
                  Component: UnauthorizedView,
                }
              }
              break
            }

            default: {
              const baseRoute = [
                adminRoute !== '/' && adminRoute,
                'collections',
                collectionSlug,
                segment3,
              ]
                .filter(Boolean)
                .join('/')

              const currentRoute = [baseRoute, segment4, segment5, ...remainingSegments]
                .filter(Boolean)
                .join('/')

              const { Component: CustomViewComponent, viewKey: customViewKey } =
                getCustomViewByRoute({
                  baseRoute,
                  currentRoute,
                  views,
                })

              if (customViewKey) {
                viewKey = customViewKey

                CustomView = {
                  payloadComponent: CustomViewComponent,
                }
              } else {
                CustomView = {
                  payloadComponent: getCustomViewByKey(views, 'default'),
                }

                DefaultView = {
                  Component: DefaultEditView,
                }
              }

              break
            }
          }
          break
        }

        // `../:id/api`, `../:id/preview`, `../:id/versions`, etc
        case 4: {
          switch (segment4) {
            case 'api': {
              if (collectionConfig?.admin?.hideAPIURL !== true) {
                CustomView = {
                  payloadComponent: getCustomViewByKey(views, 'api'),
                }
                DefaultView = {
                  Component: DefaultAPIView,
                }
              }
              break
            }

            case 'preview': {
              if (livePreviewEnabled) {
                DefaultView = {
                  Component: DefaultLivePreviewView,
                }
              }
              break
            }

            case 'versions': {
              if (!overrideDocPermissions && docPermissions?.readVersions?.permission) {
                CustomView = {
                  payloadComponent: getCustomViewByKey(views, 'versions'),
                }
                DefaultView = {
                  Component: DefaultVersionsView,
                }
              } else {
                ErrorView = {
                  Component: UnauthorizedView,
                }
              }
              break
            }

            default: {
              const baseRoute = [
                adminRoute !== '/' && adminRoute,
                'collections',
                collectionSlug,
                segment3,
              ]
                .filter(Boolean)
                .join('/')

              const currentRoute = [baseRoute, segment4, segment5, ...remainingSegments]
                .filter(Boolean)
                .join('/')

              const { Component: CustomViewComponent, viewKey: customViewKey } =
                getCustomViewByRoute({
                  baseRoute,
                  currentRoute,
                  views,
                })

              if (customViewKey) {
                viewKey = customViewKey

                CustomView = {
                  payloadComponent: CustomViewComponent,
                }
              }

              break
            }
          }
          break
        }

        // `../:id/versions/:version`, etc
        default: {
          if (segment4 === 'versions') {
            if (!overrideDocPermissions && docPermissions?.readVersions?.permission) {
              CustomView = {
                payloadComponent: getCustomViewByKey(views, 'version'),
              }
              DefaultView = {
                Component: DefaultVersionView,
              }
            } else {
              ErrorView = {
                Component: UnauthorizedView,
              }
            }
          } else {
            const baseRoute = [
              adminRoute !== '/' && adminRoute,
              collectionEntity,
              collectionSlug,
              segment3,
            ]
              .filter(Boolean)
              .join('/')

            const currentRoute = [baseRoute, segment4, segment5, ...remainingSegments]
              .filter(Boolean)
              .join('/')

            const { Component: CustomViewComponent, viewKey: customViewKey } = getCustomViewByRoute(
              {
                baseRoute,
                currentRoute,
                views,
              },
            )

            if (customViewKey) {
              viewKey = customViewKey

              CustomView = {
                payloadComponent: CustomViewComponent,
              }
            }
          }

          break
        }
      }
    }
  }

  if (globalConfig) {
    const [globalEntity, globalSlug, segment3, ...remainingSegments] = routeSegments

    if (!overrideDocPermissions && !docPermissions?.read?.permission) {
      notFound()
    } else {
      switch (routeSegments.length) {
        case 2: {
          CustomView = {
            payloadComponent: getCustomViewByKey(views, 'default'),
          }
          DefaultView = {
            Component: DefaultEditView,
          }
          break
        }

        case 3: {
          // `../:slug/api`, `../:slug/preview`, `../:slug/versions`, etc
          switch (segment3) {
            case 'api': {
              if (globalConfig?.admin?.hideAPIURL !== true) {
                CustomView = {
                  payloadComponent: getCustomViewByKey(views, 'api'),
                }
                DefaultView = {
                  Component: DefaultAPIView,
                }
              }
              break
            }

            case 'preview': {
              if (livePreviewEnabled) {
                DefaultView = {
                  Component: DefaultLivePreviewView,
                }
              }
              break
            }

            case 'versions': {
              if (!overrideDocPermissions && docPermissions?.readVersions?.permission) {
                CustomView = {
                  payloadComponent: getCustomViewByKey(views, 'versions'),
                }

                DefaultView = {
                  Component: DefaultVersionsView,
                }
              } else {
                ErrorView = {
                  Component: UnauthorizedView,
                }
              }
              break
            }

            default: {
              if (!overrideDocPermissions && docPermissions?.read?.permission) {
                const baseRoute = [adminRoute, globalEntity, globalSlug, segment3]
                  .filter(Boolean)
                  .join('/')

                const currentRoute = [baseRoute, segment3, ...remainingSegments]
                  .filter(Boolean)
                  .join('/')

                const { Component: CustomViewComponent, viewKey: customViewKey } =
                  getCustomViewByRoute({
                    baseRoute,
                    currentRoute,
                    views,
                  })

                if (customViewKey) {
                  viewKey = customViewKey

                  CustomView = {
                    payloadComponent: CustomViewComponent,
                  }
                } else {
                  DefaultView = {
                    Component: DefaultEditView,
                  }
                }
              } else {
                ErrorView = {
                  Component: UnauthorizedView,
                }
              }
              break
            }
          }
          break
        }

        default: {
          // `../:slug/versions/:version`, etc
          if (segment3 === 'versions') {
            if (!overrideDocPermissions && docPermissions?.readVersions?.permission) {
              CustomView = {
                payloadComponent: getCustomViewByKey(views, 'version'),
              }
              DefaultView = {
                Component: DefaultVersionView,
              }
            } else {
              ErrorView = {
                Component: UnauthorizedView,
              }
            }
          } else {
            const baseRoute = [adminRoute !== '/' && adminRoute, 'globals', globalSlug]
              .filter(Boolean)
              .join('/')

            const currentRoute = [baseRoute, segment3, ...remainingSegments]
              .filter(Boolean)
              .join('/')

            const { Component: CustomViewComponent, viewKey: customViewKey } = getCustomViewByRoute(
              {
                baseRoute,
                currentRoute,
                views,
              },
            )

            if (customViewKey) {
              viewKey = customViewKey

              CustomView = {
                payloadComponent: CustomViewComponent,
              }
            }
          }

          break
        }
      }
    }
  }

  return {
    CustomView,
    DefaultView,
    ErrorView,
    viewKey,
  }
}