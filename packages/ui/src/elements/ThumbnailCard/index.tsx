import React from 'react'

import type { Props } from './types'

import { useTranslation } from '../../providers/Translation'
import { formatDocTitle } from '../../utilities/formatDocTitle'
import Thumbnail from '../Thumbnail'
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

  const { i18n, t } = useTranslation()

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
      formatDocTitle({
        doc,
        i18n,
        useAsTitle: collection?.admin?.useAsTitle,
      }) ||
      (doc?.filename as string) ||
      `[${t('general:untitled')}]`
  }

  return (
    <button className={classes} onClick={onClick} title={title} type="button">
      <div className={`${baseClass}__thumbnail`}>
        {thumbnail && thumbnail}
        {!thumbnail && collection && doc && <Thumbnail doc={doc} size="expand" />}
      </div>
      <div className={`${baseClass}__label`}>{title}</div>
    </button>
  )
}
