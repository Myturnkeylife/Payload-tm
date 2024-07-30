'use client'
import React from 'react'

import { LogOutIcon } from '../../icons/LogOut/index.js'
import { RenderMappedComponent } from '../../providers/ComponentMap/RenderMappedComponent.js'
import { useComponentMap } from '../../providers/ComponentMap/index.js'
import { useConfig } from '../../providers/Config/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { formatAdminURL } from '../../utilities/formatAdminURL.js'

const baseClass = 'nav'

const DefaultLogout: React.FC<{
  Link: React.ComponentType
  tabIndex?: number
}> = ({ Link, tabIndex }) => {
  const { t } = useTranslation()
  const config = useConfig()

  const {
    admin: {
      routes: { logout: logoutRoute },
    },
    routes: { admin: adminRoute },
  } = config

  const LinkElement = Link || 'a'

  return (
    <LinkElement
      aria-label={t('authentication:logOut')}
      className={`${baseClass}__log-out`}
      href={formatAdminURL({
        adminRoute,
        path: logoutRoute,
      })}
      tabIndex={tabIndex}
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
    componentMap: { LogoutButton: CustomLogout },
  } = useComponentMap()

  if (CustomLogout) {
    return <RenderMappedComponent component={CustomLogout} />
  }

  return <DefaultLogout Link={Link} tabIndex={tabIndex} />
}
