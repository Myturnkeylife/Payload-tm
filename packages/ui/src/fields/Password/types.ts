import type { ErrorProps, FormFieldBase, LabelProps } from 'payload'
import type { ChangeEvent } from 'react'
export type PasswordInputProps = {
  autoComplete?: string
  className?: string
  errorProps: ErrorProps
  inputRef?: React.RefObject<HTMLInputElement>
  label: string
  labelProps: LabelProps
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  path: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  rtl?: boolean
  showError?: boolean
  style?: React.CSSProperties
  value?: string
  width?: string
} & Pick<
  FormFieldBase,
  'AfterInput' | 'BeforeInput' | 'CustomDescription' | 'CustomError' | 'CustomLabel'
>
