import type { StaticLabel } from '../../config/types.js'
import type { ClientFieldConfig } from '../../fields/config/client.js'
import type { SelectFieldValidation } from '../../fields/validations.js'
import type { ErrorComponent } from '../forms/Error.js'
import type { DescriptionComponent, FormFieldBase, LabelComponent } from '../types.js'

export type SelectFieldClient = {
  readonly label: StaticLabel
} & Extract<ClientFieldConfig, { type: 'select' }>

export type SelectFieldProps = {
  readonly field: SelectFieldClient
  readonly onChange?: (e: string | string[]) => void
  readonly validate?: SelectFieldValidation
  readonly value?: string
} & FormFieldBase

export type SelectFieldLabelComponent = LabelComponent<'select'>

export type SelectFieldDescriptionComponent = DescriptionComponent<'select'>

export type SelectFieldErrorComponent = ErrorComponent<'select'>
