import React from 'react'
import { useTranslation } from 'react-i18next'

import type { Props } from './types.js'

import { formatUseAsTitle } from '../../../hooks/useTitle.js'
import { useConfig } from '../../utilities/Config/index.js'
import Thumbnail from '../Thumbnail/index.js'
import './index.scss'

const baseClass = 'thumbnail-card'

export const ThumbnailCard: React.FC<Props> = (props) => {
  const {
    alignLabel,
    className,
    collection,
    doc,
    label: labelFromProps,
    onClick,
    thumbnail,
  } = props

  const { i18n, t } = useTranslation('general')
  const config = useConfig()

  const classes = [
    baseClass,
    className,
    typeof onClick === 'function' && `${baseClass}--has-on-click`,
    alignLabel && `${baseClass}--align-label-${alignLabel}`,
  ]
    .filter(Boolean)
    .join(' ')

  let title = labelFromProps

  if (!title) {
    title =
      formatUseAsTitle({
        collection,
        config,
        doc,
        i18n,
      }) ||
      (doc?.filename as string) ||
      `[${t('untitled')}]`
  }

  return (
    <button className={classes} onClick={onClick} title={title} type="button">
      <div className={`${baseClass}__thumbnail`}>
        {thumbnail && thumbnail}
        {!thumbnail && collection && doc && (
          <Thumbnail collection={collection} doc={doc} size="expand" />
        )}
      </div>
      <div className={`${baseClass}__label`}>{title}</div>
    </button>
  )
}
