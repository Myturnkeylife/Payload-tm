import type { EntityToGroup } from '@payloadcms/ui/shared'
import type { ServerProps } from 'payload'

import { Logout } from '@payloadcms/ui'
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent'
import { EntityType, groupNavItems } from '@payloadcms/ui/shared'
import React from 'react'

import './index.scss'
import { NavHamburger } from './NavHamburger/index.js'
import { NavWrapper } from './NavWrapper/index.js'

const baseClass = 'nav'

import { getNavPrefs } from './getNavPrefs.js'
import { DefaultNavClient } from './index.client.js'

export type NavProps = ServerProps

export const DefaultNav: React.FC<NavProps> = async (props) => {
  const { i18n, locale, params, payload, permissions, searchParams, user, visibleEntities } = props

  if (!payload?.config) {
    return null
  }

  const {
    admin: {
      components: { afterNavLinks, beforeNavLinks, logout },
    },
    collections,
    globals,
  } = payload.config

  const groups = groupNavItems(
    [
      ...collections
        .filter(({ slug }) => visibleEntities.collections.includes(slug))
        .map(
          (collection) =>
            ({
              type: EntityType.collection,
              entity: collection,
            }) satisfies EntityToGroup,
        ),
      ...globals
        .filter(({ slug }) => visibleEntities.globals.includes(slug))
        .map(
          (global) =>
            ({
              type: EntityType.global,
              entity: global,
            }) satisfies EntityToGroup,
        ),
    ],
    permissions,
    i18n,
  )

  const collapsedPreferences = await getNavPrefs({ groups, payload, user })

  return (
    <NavWrapper baseClass={baseClass}>
      <nav className={`${baseClass}__wrap`}>
        <RenderServerComponent
          Component={beforeNavLinks}
          importMap={payload.importMap}
          serverProps={{
            i18n,
            locale,
            params,
            payload,
            permissions,
            searchParams,
            user,
          }}
        />
        <DefaultNavClient collapsedPreferences={collapsedPreferences} groups={groups} />
        <RenderServerComponent
          Component={afterNavLinks}
          importMap={payload.importMap}
          serverProps={{
            i18n,
            locale,
            params,
            payload,
            permissions,
            searchParams,
            user,
          }}
        />
        <div className={`${baseClass}__controls`}>
          <RenderServerComponent
            Component={logout?.Button}
            Fallback={Logout}
            importMap={payload.importMap}
            serverProps={{
              i18n,
              locale,
              params,
              payload,
              permissions,
              searchParams,
              user,
            }}
          />
        </div>
      </nav>
      <div className={`${baseClass}__header`}>
        <div className={`${baseClass}__header-content`}>
          <NavHamburger baseClass={baseClass} />
        </div>
      </div>
    </NavWrapper>
  )
}
