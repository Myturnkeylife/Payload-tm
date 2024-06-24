'use client'

import type { TextFieldProps } from '@payloadcms/ui'
import type { Data } from 'payload'

import { TextField, useLocale, useWatchForm } from '@payloadcms/ui'
import React, { useEffect, useState } from 'react'

type FieldWithID = {
  id: string
  name: string
}

export const DynamicPriceSelector: React.FC<TextFieldProps> = (props) => {
  const { label, path } = props

  const { fields, getData, getDataByPath } = useWatchForm()

  const locale = useLocale()

  const [isNumberField, setIsNumberField] = useState<boolean>()
  const [valueType, setValueType] = useState<'static' | 'valueOfField'>()

  // only number fields can use 'valueOfField`
  useEffect(() => {
    if (path) {
      const parentPath = path.split('.').slice(0, -1).join('.')
      const paymentFieldData: any = getDataByPath(parentPath)

      if (paymentFieldData) {
        const { fieldToUse, valueType } = paymentFieldData

        setValueType(valueType)

        const { fields: allFields }: Data = getData()
        const field = allFields.find((field: FieldWithID) => field.name === fieldToUse)

        if (field) {
          const { blockType } = field
          setIsNumberField(blockType === 'number')
        }
      }
    }
  }, [fields, path, getDataByPath, getData])

  // TODO: make this a number field, block by Payload
  if (valueType === 'static') {
    return <TextField {...props} />
  }

  const localeCode = typeof locale === 'object' && 'code' in locale ? locale.code : locale

  const localLabels = typeof label === 'object' ? label : { [localeCode]: label }

  const labelValue = localLabels[localeCode] || localLabels['en'] || ''

  if (valueType === 'valueOfField' && !isNumberField) {
    return (
      <div>
        <div>{String(labelValue)}</div>
        <div
          style={{
            color: '#9A9A9A',
          }}
        >
          The selected field must be a number field.
        </div>
      </div>
    )
  }

  return null
}
