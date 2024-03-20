'use client'
import React, { useEffect } from 'react'

import { useField } from '../../forms/useField/index.js'
import { withCondition } from '../../forms/withCondition/index.js'

export type HiddenInputFieldProps = {
  disableModifyingForm?: false
  name: string
  path?: string
  value?: unknown
}

/**
 * This is mainly used to save a value on the form that is not visible to the user.
 * For example, this sets the `ìd` property of a block in the Blocks field.
 */
const HiddenInputField: React.FC<HiddenInputFieldProps> = (props) => {
  const { name, disableModifyingForm = true, path: pathFromProps, value: valueFromProps } = props

  const { path, setValue, value } = useField({
    path: pathFromProps || name,
  })

  useEffect(() => {
    if (valueFromProps !== undefined) {
      setValue(valueFromProps, disableModifyingForm)
    }
  }, [valueFromProps, setValue, disableModifyingForm])

  return (
    <input
      id={`field-${path?.replace(/\./g, '__')}`}
      name={path}
      onChange={setValue}
      type="hidden"
      value={(value as string) || ''}
    />
  )
}

export const HiddenInput = withCondition(HiddenInputField)
