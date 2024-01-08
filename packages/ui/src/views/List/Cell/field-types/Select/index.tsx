import React from 'react'

import type { OptionObject, SelectField } from 'payload/types'
import type { CellComponentProps } from '../../types'

import { optionsAreObjects } from 'payload/types'
import { getTranslation } from '@payloadcms/translations'

const SelectCell: React.FC<CellComponentProps<SelectField, any>> = ({ data, field }) => {
  // TODO(i18n)
  const i18n = undefined

  const findLabel = (items: string[]) =>
    items
      .map((i) => {
        const found = (field.options as OptionObject[]).filter(
          (f: OptionObject) => f.value === i,
        )?.[0]?.label
        return getTranslation(found, i18n)
      })
      .join(', ')

  let content = ''
  if (optionsAreObjects(field.options)) {
    content = Array.isArray(data)
      ? findLabel(data) // hasMany
      : findLabel([data])
  } else {
    content = Array.isArray(data)
      ? data.join(', ') // hasMany
      : data
  }

  return <span>{content}</span>
}

export default SelectCell
