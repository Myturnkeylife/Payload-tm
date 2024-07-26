import type { ErrorComponent } from '../forms/Error.js'
import type { DescriptionComponent, FormFieldBase, LabelComponent } from '../types.js'

export type CheckboxFieldProps = {
  checked?: boolean
  disableFormData?: boolean
  id?: string
  name?: string
  onChange?: (val: boolean) => void
  partialChecked?: boolean
  path?: string
  type: 'checkbox'
  width?: string
} & FormFieldBase

export type CheckboxFieldLabelComponent = LabelComponent<'checkbox'>

export type CheckboxFieldDescriptionComponent = DescriptionComponent<'checkbox'>

export type CheckboxFieldErrorComponent = ErrorComponent<'checkbox'>
