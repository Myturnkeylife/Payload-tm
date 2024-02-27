import { getTranslation } from '@payloadcms/translations'
import React from 'react'

import type { Props } from './types'

import getDataByPath from '../Form/getDataByPath'
import getSiblingData from '../Form/getSiblingData'
import { isComponent } from './types'

const baseClass = 'row-label'

export const RowLabel: React.FC<Props> = (props) => {
  const { className, data: dataFromProps, i18n, label, path, rowNumber } = props

  const collapsibleData = getSiblingData(dataFromProps, path)
  const arrayData = getDataByPath(dataFromProps, path)
  const data = arrayData || collapsibleData

  if (isComponent(label)) {
    const Label = label
    return <Label data={data} index={rowNumber} path={path} />
  }

  return (
    <span
      className={[baseClass, className].filter(Boolean).join(' ')}
      style={{
        pointerEvents: 'none',
      }}
    >
      {typeof label === 'function'
        ? label({
            data,
            index: rowNumber,
            path,
          })
        : getTranslation(label, i18n)}
    </span>
  )
}
