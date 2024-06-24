import type { TextareaField as TextareaFieldType } from 'payload'

import { type ChangeEvent } from 'react'

import type { FormFieldBase } from '../shared/index.js'

export type TextareaFieldProps = FormFieldBase & {
  maxLength?: number
  minLength?: number
  name?: string
  path?: string
  placeholder?: TextareaFieldType['admin']['placeholder']
  rows?: number
  width?: string
}

export type TextAreaInputProps = TextareaFieldProps & {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  showError?: boolean
  value?: string
}
