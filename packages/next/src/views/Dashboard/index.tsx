import type { AdminViewProps } from 'payload/types'

import { HydrateClientUser, RenderCustomComponent } from '@payloadcms/ui'
import LinkImport from 'next/link.js'
import { isEntityHidden } from 'payload/utilities'
import React, { Fragment } from 'react'

import type { DashboardProps } from './Default/index.js'

import { DefaultDashboard } from './Default/index.js'

export { generateDashboardMetadata } from './meta.js'

const Link = (LinkImport.default || LinkImport) as unknown as typeof LinkImport.default

export const Dashboard: React.FC<AdminViewProps> = ({
  initPageResult,
  // searchParams,
}) => {
  const {
    permissions,
    req: {
      payload: { config },
      user,
    },
  } = initPageResult

  const CustomDashboardComponent = config.admin.components?.views?.Dashboard

  const visibleCollections: string[] = config.collections.reduce((acc, collection) => {
    if (!isEntityHidden({ hidden: collection.admin.hidden, user })) {
      acc.push(collection.slug)
    }
    return acc
  }, [])

  const visibleGlobals: string[] = config.globals.reduce((acc, global) => {
    if (!isEntityHidden({ hidden: global.admin.hidden, user })) {
      acc.push(global.slug)
    }
    return acc
  }, [])

  const componentProps: DashboardProps = {
    Link,
    config,
    permissions,
    visibleCollections,
    visibleGlobals,
  }

  return (
    <Fragment>
      <HydrateClientUser permissions={permissions} user={user} />
      <RenderCustomComponent
        CustomComponent={
          typeof CustomDashboardComponent === 'function' ? CustomDashboardComponent : undefined
        }
        DefaultComponent={DefaultDashboard}
        componentProps={componentProps}
      />
    </Fragment>
  )
}
