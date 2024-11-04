'use client'
import React from 'react'

import { LogOutIcon } from '../../icons/LogOut/index.js'
import { useConfig } from '../../providers/Config/index.js'
import { RenderComponent } from '../../providers/Config/RenderComponent.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { formatAdminURL } from '../../utilities/formatAdminURL.js'

const baseClass = 'nav'

const DefaultLogout: React.FC<{
  Link: React.ComponentType
  tabIndex?: number
}> = ({ Link, tabIndex }) => {
  const { t } = useTranslation()
  const { config } = useConfig()

  const {
    admin: {
      routes: { logout: logoutRoute },
    },
    routes: { admin: adminRoute },
  } = config

  const basePath = process.env.NEXT_BASE_PATH ?? ''
  const LinkElement = Link || 'a'

  const props = {
    ariaLabel: t('authentication:logOut'),
    className: `${baseClass}__log-out`,
    prefetch: false,
    tabIndex,
  }

  return (
    <LinkElement
      {...props}
      href={formatAdminURL({
        adminRoute,
        basePath,
        path: logoutRoute,
      })}
    >
      <LogOutIcon />
    </LinkElement>
  )
}

export const Logout: React.FC<{
  Link?: React.ComponentType
  tabIndex?: number
}> = ({ Link, tabIndex = 0 }) => {
  const {
    config: {
      admin: {
        components: { LogoutButton: CustomLogout },
      },
    },
  } = useConfig()

  if (CustomLogout) {
    return <RenderComponent mappedComponent={CustomLogout} />
  }

  return <DefaultLogout Link={Link} tabIndex={tabIndex} />
}
