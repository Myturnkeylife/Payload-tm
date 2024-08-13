import type { I18n } from '@payloadcms/translations'
import type {
  Payload,
  Permissions,
  SanitizedCollectionConfig,
  SanitizedGlobalConfig,
} from 'payload'

import { RenderComponent, getCreateMappedComponent } from '@payloadcms/ui/shared'
import { isPlainObject } from 'payload'
import React from 'react'

import { ShouldRenderTabs } from './ShouldRenderTabs.js'
import { DocumentTab } from './Tab/index.js'
import { getCustomViews } from './getCustomViews.js'
import { getViewConfig } from './getViewConfig.js'
import './index.scss'
import { tabs as defaultTabs } from './tabs/index.js'

const baseClass = 'doc-tabs'

export const DocumentTabs: React.FC<{
  collectionConfig: SanitizedCollectionConfig
  globalConfig: SanitizedGlobalConfig
  i18n: I18n
  payload: Payload
  permissions: Permissions
}> = (props) => {
  const { collectionConfig, globalConfig, i18n, payload, permissions } = props
  const { config } = payload

  const customViews = getCustomViews({ collectionConfig, globalConfig })

  return (
    <ShouldRenderTabs>
      <div className={baseClass}>
        <div className={`${baseClass}__tabs-container`}>
          <ul className={`${baseClass}__tabs`}>
            {Object.entries(defaultTabs)
              // sort `defaultViews` based on `order` property from smallest to largest
              // if no `order`, append the view to the end
              // TODO: open `order` to the config and merge `defaultViews` with `customViews`
              ?.sort(([, a], [, b]) => {
                if (a.order === undefined && b.order === undefined) return 0
                else if (a.order === undefined) return 1
                else if (b.order === undefined) return -1
                return a.order - b.order
              })
              ?.map(([name, tab], index) => {
                const viewConfig = getViewConfig({ name, collectionConfig, globalConfig })
                const tabFromConfig = viewConfig && 'tab' in viewConfig ? viewConfig.tab : undefined

                const { condition } = tabFromConfig || {}

                const meetsCondition =
                  !condition ||
                  (condition &&
                    Boolean(condition({ collectionConfig, config, globalConfig, permissions })))

                if (meetsCondition) {
                  return (
                    <DocumentTab
                      key={`tab-${index}`}
                      {...{
                        ...props,
                        ...(tab || {}),
                        ...(tabFromConfig || {}),
                      }}
                    />
                  )
                }

                return null
              })}
            {customViews?.map((CustomView, index) => {
              if ('tab' in CustomView) {
                const { path, tab } = CustomView

                if (tab.Component) {
                  const createMappedComponent = getCreateMappedComponent({
                    importMap: payload.importMap,
                    serverProps: {
                      i18n,
                      payload,
                      permissions,
                      ...props,
                      key: `tab-custom-${index}`,
                      path,
                    },
                  })

                  const mappedTab = createMappedComponent(
                    tab.Component,
                    undefined,
                    undefined,
                    'tab.Component',
                  )

                  return (
                    <RenderComponent
                      clientProps={{
                        key: `tab-custom-${index}`,
                        path,
                      }}
                      key={`tab-custom-${index}`}
                      mappedComponent={mappedTab}
                    />
                  )
                }

                return (
                  <DocumentTab
                    key={`tab-custom-${index}`}
                    {...{
                      ...props,
                      ...tab,
                    }}
                  />
                )
              }
              return null
            })}
          </ul>
        </div>
      </div>
    </ShouldRenderTabs>
  )
}
