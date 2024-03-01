'use client'
import type { ClientValidate } from 'payload/types'

import React, { useCallback } from 'react'

import type { Props } from './types'

import { useForm } from '../../Form/context'
import LabelComp from '../../Label'
import useField from '../../useField'
import { withCondition } from '../../withCondition'
import { fieldBaseClass } from '../shared'
import { CheckboxInput } from './Input'
import './index.scss'

const baseClass = 'checkbox'

const Checkbox: React.FC<Props> = (props) => {
  const {
    id,
    name,
    AfterInput,
    BeforeInput,
    Description,
    Error,
    Label: LabelFromProps,
    checked: checkedFromProps,
    className,
    disableFormData,
    label,
    onChange: onChangeFromProps,
    partialChecked,
    path: pathFromProps,
    readOnly,
    required,
    style,
    validate,
    width,
  } = props

  const { uuid } = useForm()

  const Label = LabelFromProps || <LabelComp label={label} required={required} />

  const memoizedValidate: ClientValidate = useCallback(
    (value, options) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options, required })
      }
    },
    [validate, required],
  )

  const { path, setValue, showError, value } = useField({
    disableFormData,
    path: pathFromProps || name,
    validate: memoizedValidate,
  })

  const onToggle = useCallback(() => {
    if (!readOnly) {
      setValue(!value)
      if (typeof onChangeFromProps === 'function') onChangeFromProps(!value)
    }
  }, [onChangeFromProps, readOnly, setValue, value])

  const checked = checkedFromProps || Boolean(value)

  const fieldID = id || `field-${path?.replace(/\./g, '__')}${uuid ? `-${uuid}` : ''}`

  return (
    <div
      className={[
        fieldBaseClass,
        baseClass,
        showError && 'error',
        className,
        value && `${baseClass}--checked`,
        readOnly && `${baseClass}--read-only`,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...style,
        width,
      }}
    >
      <div className={`${baseClass}__error-wrap`}>{Error}</div>
      <CheckboxInput
        AfterInput={AfterInput}
        BeforeInput={BeforeInput}
        Label={Label}
        checked={checked}
        id={fieldID}
        inputRef={null}
        name={path}
        onToggle={onToggle}
        partialChecked={partialChecked}
        readOnly={readOnly}
        required={required}
      />
      {Description}
    </div>
  )
}

export default withCondition(Checkbox)
