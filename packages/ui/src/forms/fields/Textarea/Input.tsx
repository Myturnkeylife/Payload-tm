'use client'
import { getTranslation } from '@payloadcms/translations'
import React, { type ChangeEvent } from 'react'

import type { TextareaFieldProps } from './types.js'

import { useTranslation } from '../../../providers/Translation/index.js'
import { fieldBaseClass } from '../shared.js'
import './index.scss'

export type TextAreaInputProps = TextareaFieldProps & {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  showError?: boolean
  value?: string
}

export const TextareaInput: React.FC<TextAreaInputProps> = (props) => {
  const {
    AfterInput,
    BeforeInput,
    Description,
    Error,
    Label,
    className,
    onChange,
    path,
    placeholder,
    readOnly,
    rows,
    rtl,
    showError,
    style,
    value,
    width,
  } = props

  const { i18n } = useTranslation()

  return (
    <div
      className={[
        fieldBaseClass,
        'textarea',
        className,
        showError && 'error',
        readOnly && 'read-only',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...style,
        width,
      }}
    >
      {Error}
      {Label}
      {BeforeInput}
      <label className="textarea-outer" htmlFor={`field-${path.replace(/\./g, '__')}`}>
        <div className="textarea-inner">
          <div className="textarea-clone" data-value={value || placeholder || ''} />
          <textarea
            className="textarea-element"
            data-rtl={rtl}
            disabled={readOnly}
            id={`field-${path.replace(/\./g, '__')}`}
            name={path}
            onChange={onChange}
            placeholder={getTranslation(placeholder, i18n)}
            rows={rows}
            value={value || ''}
          />
        </div>
      </label>
      {AfterInput}
      {Description}
    </div>
  )
}
