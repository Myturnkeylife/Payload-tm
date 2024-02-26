import React, { Fragment } from 'react'

import type { DocumentTabConfig } from '../types'
import type { DocumentTabProps } from '../types'

import './index.scss'
import { DocumentTabLink } from './TabLink'

const baseClass = 'doc-tab'

export const DocumentTab: React.FC<DocumentTabProps & DocumentTabConfig> = (props) => {
  const {
    id,
    apiURL,
    config,
    collectionConfig,
    condition,
    globalConfig,
    href: tabHref,
    isActive: checkIsActive,
    label,
    newTab,
    pillLabel,
  } = props

  const { routes } = config
  // const { versions } = documentInfo

  let href = typeof tabHref === 'string' ? tabHref : ''

  if (typeof tabHref === 'function') {
    href = tabHref({
      id,
      apiURL,
      collection: collectionConfig,
      global: globalConfig,
      routes,
    })
  }

  if (
    !condition ||
    (condition && condition({ collectionConfig, config, documentInfo: undefined, globalConfig }))
  ) {
    const labelToRender =
      typeof label === 'function'
        ? label({
            // t
            t: (str: string) => str,
          })
        : label

<<<<<<< HEAD
  if (
    !condition ||
    (condition && Boolean(condition({ collection, config, documentInfo, global })))
  ) {
    const labelToRender = typeof label === 'function' ? label({ t }) : label
    const pillToRender = typeof pillLabel === 'function' ? pillLabel({ versions }) : pillLabel
=======
    const pillToRender =
      typeof pillLabel === 'function' ? pillLabel({ versions: undefined }) : pillLabel
>>>>>>> 3d5500e69 (chore(next): ssr versions view (#4645))

    return (
      <DocumentTabLink href={href} newTab={newTab} baseClass={baseClass} isActive={checkIsActive}>
        <span className={`${baseClass}__label`}>
          {labelToRender}
          {pillToRender && (
            <Fragment>
              &nbsp;
              <span className={`${baseClass}__count`}>{pillToRender}</span>
            </Fragment>
          )}
        </span>
      </DocumentTabLink>
    )
  }

  return null
}
