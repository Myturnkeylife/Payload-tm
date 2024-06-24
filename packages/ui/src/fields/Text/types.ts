import type { TextField } from 'payload'
import type { ChangeEvent } from 'react'

import type { Option, ReactSelectAdapterProps } from '../../elements/ReactSelect/types.js'
import type { FormFieldBase } from '../shared/index.js'

export type TextFieldProps = FormFieldBase & {
  hasMany?: boolean
  inputRef?: React.MutableRefObject<HTMLInputElement>
  maxLength?: number
  maxRows?: number
  minLength?: number
  minRows?: number
  name?: string
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  path?: string
  placeholder?: TextField['admin']['placeholder']
  width?: string
}

export type SharedTextFieldProps =
  | {
      hasMany?: false
      onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    }
  | {
      hasMany?: true
      onChange?: ReactSelectAdapterProps['onChange']
    }

export type TextInputProps = Omit<TextFieldProps, 'type'> &
  SharedTextFieldProps & {
    inputRef?: React.MutableRefObject<HTMLInputElement>
    maxRows?: number
    minRows?: number
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
    showError?: boolean
    value?: string
    valueToRender?: Option[]
  }
