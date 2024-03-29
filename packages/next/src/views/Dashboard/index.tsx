import type { AdminViewProps } from 'payload/types'

import { HydrateClientUser } from '@payloadcms/ui/elements/HydrateClientUser'
import { RenderCustomComponent } from '@payloadcms/ui/elements/RenderCustomComponent'
import LinkImport from 'next/link.js'
import React, { Fragment } from 'react'

import type { DashboardProps } from './Default/index.js'

import { DefaultDashboard } from './Default/index.js'

export { generateDashboardMetadata } from './meta.js'

const Link = (LinkImport.default || LinkImport) as unknown as typeof LinkImport.default

export const Dashboard: React.FC<AdminViewProps> = ({ initPageResult }) => {
  const {
    permissions,
    req: {
      payload: { config },
      user,
    },
    visibleEntities,
  } = initPageResult

  const CustomDashboardComponent = config.admin.components?.views?.Dashboard

  const viewComponentProps: DashboardProps = {
    Link,
    config,
    permissions,
    visibleEntities,
  }

  return (
    <Fragment>
      <HydrateClientUser permissions={permissions} user={user} />
      <RenderCustomComponent
        CustomComponent={
          typeof CustomDashboardComponent === 'function' ? CustomDashboardComponent : undefined
        }
        DefaultComponent={DefaultDashboard}
        componentProps={viewComponentProps}
      />
    </Fragment>
  )
}
