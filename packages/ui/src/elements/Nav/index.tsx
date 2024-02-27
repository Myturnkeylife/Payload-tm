import type { I18n } from '@payloadcms/translations'
import type { Permissions, User } from 'payload/auth'
import type { SanitizedConfig } from 'payload/types'

import { getTranslation } from '@payloadcms/translations'
import Link from 'next/link'
import React from 'react'

import type { EntityToGroup } from '../../utilities/groupNavItems'

import { Chevron } from '../../icons/Chevron'
import { EntityType, groupNavItems } from '../../utilities/groupNavItems'
import Logout from '../Logout'
import NavGroup from '../NavGroup'
import { NavHamburger } from './NavHamburger'
import { NavWrapper } from './NavWrapper'
import './index.scss'

const baseClass = 'nav'

export const DefaultNav: React.FC<{
  config: SanitizedConfig
  i18n: I18n
  permissions: Permissions
  user: User
}> = (props) => {
  const { config, i18n, permissions, user } = props

  const {
    admin: {
      components: { afterNavLinks, beforeNavLinks },
    },
    collections,
    globals,
    routes: { admin },
  } = config

  const groups = groupNavItems(
    [
      ...collections
        .filter(
          ({ admin: { hidden } }) => !(typeof hidden === 'function' ? hidden({ user }) : hidden),
        )
        .map((collection) => {
          const entityToGroup: EntityToGroup = {
            entity: collection,
            type: EntityType.collection,
          }

          return entityToGroup
        }),
      ...globals
        .filter(
          ({ admin: { hidden } }) => !(typeof hidden === 'function' ? hidden({ user }) : hidden),
        )
        .map((global) => {
          const entityToGroup: EntityToGroup = {
            entity: global,
            type: EntityType.global,
          }

          return entityToGroup
        }),
    ],
    permissions,
    i18n,
  )

  return (
    <NavWrapper baseClass={baseClass}>
      <nav className={`${baseClass}__wrap`}>
        {Array.isArray(beforeNavLinks) &&
          beforeNavLinks.map((Component, i) => <Component key={i} />)}
        {groups.map(({ entities, label }, key) => {
          return (
            <NavGroup key={key} label={label}>
              {entities.map(({ entity, type }, i) => {
                let entityLabel: string
                let href: string
                let id: string

                if (type === EntityType.collection) {
                  href = `${admin}/collections/${entity.slug}`
                  entityLabel = getTranslation(entity.labels.plural, i18n)
                  id = `nav-${entity.slug}`
                }

                if (type === EntityType.global) {
                  href = `${admin}/globals/${entity.slug}`
                  entityLabel = getTranslation(entity.label, i18n)
                  id = `nav-global-${entity.slug}`
                }

                const LinkElement = Link || 'a'

                return (
                  <LinkElement
                    // activeClassName="active"
                    className={`${baseClass}__link`}
                    // to={href} // for `react-router-dom` Link
                    href={href} // for `next/link` Link
                    id={id}
                    // tabIndex={!navOpen ? -1 : undefined}
                    key={i}
                  >
                    <span className={`${baseClass}__link-icon`}>
                      <Chevron direction="right" />
                    </span>
                    <span className={`${baseClass}__link-label`}>{entityLabel}</span>
                  </LinkElement>
                )
              })}
            </NavGroup>
          )
        })}
        {Array.isArray(afterNavLinks) && afterNavLinks.map((Component, i) => <Component key={i} />)}
        <div className={`${baseClass}__controls`}>
          <Logout
          // tabIndex={!navOpen ? -1 : undefined}
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
