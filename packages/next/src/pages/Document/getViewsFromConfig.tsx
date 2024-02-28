import type { CollectionPermission, GlobalPermission, User } from 'payload/auth'
import type { AdminViewComponent } from 'payload/config'
import type {
  SanitizedCollectionConfig,
  SanitizedConfig,
  SanitizedGlobalConfig,
} from 'payload/types'

import { isEntityHidden } from 'payload/utilities'
import { lazy } from 'react'

import { getCustomViewByKey } from './getCustomViewByKey'
import { getCustomViewByPath } from './getCustomViewByPath'

export const getViewsFromConfig = async ({
  collectionConfig,
  config,
  docPermissions,
  globalConfig,
  routeSegments,
  user,
}: {
  collectionConfig?: SanitizedCollectionConfig
  config: SanitizedConfig
  docPermissions: CollectionPermission | GlobalPermission
  globalConfig?: SanitizedGlobalConfig
  routeSegments: string[]
  user: User
}): Promise<{
  CustomView: AdminViewComponent
  DefaultView: AdminViewComponent
} | null> => {
  // Conditionally import and lazy load the default view
  let DefaultView: AdminViewComponent = null
  let CustomView: AdminViewComponent = null

  const views =
    (collectionConfig && collectionConfig?.admin?.components?.views) ||
    (globalConfig && globalConfig?.admin?.components?.views)

  const livePreviewEnabled =
    (collectionConfig && collectionConfig?.admin?.livePreview) ||
    config?.admin?.livePreview?.collections?.includes(collectionConfig?.slug) ||
    (globalConfig && globalConfig?.admin?.livePreview) ||
    config?.admin?.livePreview?.globals?.includes(globalConfig?.slug)

  if (collectionConfig) {
    const {
      admin: { hidden },
    } = collectionConfig

    if (isEntityHidden({ hidden, user })) {
      return null
    }

    // `../:id`, or `../create`
    if (routeSegments?.length === 1) {
      switch (routeSegments[0]) {
        case 'create': {
          if ('create' in docPermissions && docPermissions?.create?.permission) {
            CustomView = getCustomViewByKey(views, 'Default')
            DefaultView = lazy(() =>
              import('../Edit/index.tsx').then((module) => ({ default: module.EditView })),
            )
          }
          break
        }

        default: {
          if (docPermissions?.read?.permission) {
            CustomView = getCustomViewByKey(views, 'Default')
            DefaultView = lazy(() =>
              import('../Edit/index.tsx').then((module) => ({ default: module.EditView })),
            )
          }
        }
      }
    }

    if (routeSegments[0] !== 'create') {
      // `../:id/api`, `../:id/preview`, `../:id/versions`, etc
      if (routeSegments?.length === 2) {
        switch (routeSegments[1]) {
          case 'api': {
            if (collectionConfig?.admin?.hideAPIURL !== true) {
              CustomView = getCustomViewByKey(views, 'API')
              DefaultView = lazy(() =>
                import('../API/index.tsx').then((module) => ({ default: module.APIView })),
              )
            }
            break
          }

          case 'preview': {
            if (livePreviewEnabled) {
              // DefaultView = lazy(() =>
              //   import('../LivePreview/index.tsx').then((module) => ({
              //     default: module.LivePreviewView,
              //   })),
              // )
            }
            break
          }

          case 'versions': {
            if (docPermissions?.readVersions?.permission) {
              CustomView = getCustomViewByKey(views, 'Versions')
              DefaultView = lazy(() =>
                import('../Versions/index.tsx').then((module) => ({
                  default: module.VersionsView,
                })),
              )
            }
            break
          }

          default: {
            const path = `/${routeSegments[1]}`
            CustomView = getCustomViewByPath(views, path)
            break
          }
        }
      }

      // `../:id/versions/:version`, etc
      if (routeSegments?.length === 3) {
        if (routeSegments[1] === 'versions') {
          if (docPermissions?.readVersions?.permission) {
            CustomView = getCustomViewByKey(views, 'Version')
            DefaultView = lazy(() =>
              import('../Version/index.tsx').then((module) => ({ default: module.VersionView })),
            )
          }
        }
      }
    }
  }

  if (globalConfig) {
    const {
      admin: { hidden },
    } = globalConfig

    if (isEntityHidden({ hidden, user })) {
      return null
    }

    if (!routeSegments?.length) {
      if (docPermissions?.read?.permission) {
        CustomView = getCustomViewByKey(views, 'Default')
        DefaultView = lazy(() =>
          import('../Edit/index.tsx').then((module) => ({ default: module.EditView })),
        )
      }
    } else if (routeSegments?.length === 1) {
      // `../:slug/api`, `../:slug/preview`, `../:slug/versions`, etc
      switch (routeSegments[0]) {
        case 'api': {
          if (globalConfig?.admin?.hideAPIURL !== true) {
            CustomView = getCustomViewByKey(views, 'API')
            DefaultView = lazy(() =>
              import('../API/index.tsx').then((module) => ({ default: module.APIView })),
            )
          }
          break
        }

        case 'preview': {
          if (livePreviewEnabled) {
            // DefaultView = lazy(() =>
            //   import('../LivePreview/index.tsx').then((module) => ({
            //     default: module.LivePreviewView,
            //   })),
            // )
          }
          break
        }

        case 'versions': {
          if (docPermissions?.readVersions?.permission) {
            CustomView = getCustomViewByKey(views, 'Versions')
            DefaultView = lazy(() =>
              import('../Versions/index.tsx').then((module) => ({ default: module.VersionsView })),
            )
          }
          break
        }

        default: {
          if (docPermissions?.read?.permission) {
            CustomView = getCustomViewByKey(views, 'Default')
            DefaultView = lazy(() =>
              import('../Edit/index.tsx').then((module) => ({ default: module.EditView })),
            )
          }
          break
        }
      }
    } else if (routeSegments?.length === 2) {
      // `../:slug/versions/:version`, etc
      if (routeSegments[1] === 'versions') {
        if (docPermissions?.readVersions?.permission) {
          CustomView = getCustomViewByKey(views, 'Version')
          DefaultView = lazy(() =>
            import('../Version/index.tsx').then((module) => ({ default: module.VersionView })),
          )
        }
      }
    }
  }

  return {
    CustomView,
    DefaultView,
  }
}
