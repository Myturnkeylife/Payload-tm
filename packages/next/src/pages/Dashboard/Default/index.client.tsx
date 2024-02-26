'use client'
import type { EntityToGroup, Group } from '@payloadcms/ui'

import { getTranslation } from '@payloadcms/translations'
import {
  Button,
  Card,
  EntityType,
  groupNavItems,
  useActions,
  useAuth,
  useConfig,
  useTranslation,
} from '@payloadcms/ui'
import React, { Fragment, useEffect, useState } from 'react'

import './index.scss'

const baseClass = 'dashboard'

export const DefaultDashboardClient: React.FC<{
  Link: React.ComponentType
}> = ({ Link }) => {
  const config = useConfig()

  const {
    collections: collectionsConfig,
    globals: globalsConfig,
    routes: { admin },
  } = config

  const { setViewActions } = useActions()

  useEffect(() => {
    setViewActions([])
  }, [setViewActions])

  const { permissions, user } = useAuth()

  const { i18n, t } = useTranslation()

  const [groups, setGroups] = useState<Group[]>([])

  useEffect(() => {
    const collections = collectionsConfig.filter(
      (collection) => permissions?.collections?.[collection.slug]?.read?.permission,
    )

    const globals = globalsConfig.filter(
      (global) => permissions?.globals?.[global.slug]?.read?.permission,
    )

    setGroups(
      groupNavItems(
        [
          ...(collections
            ?.filter(
              ({ admin: { hidden } }) =>
                !(typeof hidden === 'function' ? hidden({ user }) : hidden),
            )
            .map((collection) => {
              const entityToGroup: EntityToGroup = {
                entity: collection,
                type: EntityType.collection,
              }

              return entityToGroup
            }) ?? []),
          ...(globals
            ?.filter(
              ({ admin: { hidden } }) =>
                !(typeof hidden === 'function' ? hidden({ user }) : hidden),
            )
            .map((global) => {
              const entityToGroup: EntityToGroup = {
                entity: global,
                type: EntityType.global,
              }

              return entityToGroup
            }) ?? []),
        ],
        permissions,
        i18n,
      ),
    )
  }, [collectionsConfig, globalsConfig, permissions, user, i18n])

  return (
    <Fragment>
      {groups.map(({ entities, label }, groupIndex) => {
        return (
          <div className={`${baseClass}__group`} key={groupIndex}>
            <h2 className={`${baseClass}__label`}>{label}</h2>
            <ul className={`${baseClass}__card-list`}>
              {entities.map(({ entity, type }, entityIndex) => {
                let title: string
                let buttonAriaLabel: string
                let createHREF: string
                let href: string
                let hasCreatePermission: boolean

                if (type === EntityType.collection) {
                  title = getTranslation(entity.labels.plural, i18n)
                  buttonAriaLabel = t('general:showAllLabel', { label: title })
                  href = `${admin}/collections/${entity.slug}`
                  createHREF = `${admin}/collections/${entity.slug}/create`
                  hasCreatePermission = permissions?.collections?.[entity.slug]?.create?.permission
                }

                if (type === EntityType.global) {
                  title = getTranslation(entity.label, i18n)
                  buttonAriaLabel = t('general:editLabel', {
                    label: getTranslation(entity.label, i18n),
                  })
                  href = `${admin}/globals/${entity.slug}`
                }

                return (
                  <li key={entityIndex}>
                    <Card
                      Link={Link}
                      actions={
                        hasCreatePermission && type === EntityType.collection ? (
                          <Button
                            Link={Link}
                            aria-label={t('general:createNewLabel', {
                              label: getTranslation(entity.labels.singular, i18n),
                            })}
                            buttonStyle="icon-label"
                            el="link"
                            icon="plus"
                            iconStyle="with-border"
                            round
                            to={createHREF}
                          />
                        ) : undefined
                      }
                      buttonAriaLabel={buttonAriaLabel}
                      href={href}
                      id={`card-${entity.slug}`}
                      title={title}
                      titleAs="h3"
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </Fragment>
  )
}
