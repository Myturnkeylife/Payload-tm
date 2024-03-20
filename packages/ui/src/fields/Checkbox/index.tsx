'use client'
import type { ClientValidate } from 'payload/types'

import React, { useCallback } from 'react'

import type { CheckboxFieldProps } from './types.js'

import { useForm } from '../../forms/Form/context.js'
import { Label as LabelComp } from '../../forms/Label/index.js'
import { useField } from '../../forms/useField/index.js'
import { withCondition } from '../../forms/withCondition/index.js'
import { generateFieldID } from '../../utilities/generateFieldID.js'
import { fieldBaseClass } from '../shared/index.js'
import { CheckboxInput } from './Input.js'
import './index.scss'

const baseClass = 'checkbox'

export { CheckboxFieldProps, CheckboxInput }

const CheckboxField: React.FC<CheckboxFieldProps> = (props) => {
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

  const fieldID = id || generateFieldID(path, uuid)

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

export const Checkbox = withCondition(CheckboxField)
