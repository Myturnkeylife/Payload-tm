import type { GenericClientFieldConfig } from '../../fields/config/client.js'
import type { RelationshipFieldValidation } from '../../fields/validations.js'
import type { ErrorComponent } from '../forms/Error.js'
import type { DescriptionComponent, FormFieldBase, LabelComponent } from '../types.js'

export type RelationshipFieldProps = {
  readonly clientFieldConfig: GenericClientFieldConfig<'relationship'>
  readonly validate?: RelationshipFieldValidation
} & FormFieldBase

export type RelationshipFieldLabelComponent = LabelComponent<'relationship'>

export type RelationshipFieldDescriptionComponent = DescriptionComponent<'relationship'>

export type RelationshipFieldErrorComponent = ErrorComponent<'relationship'>
