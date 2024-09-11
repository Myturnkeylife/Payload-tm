import type React from 'react'
import type { MarkOptional } from 'ts-essentials'

import type { TextareaField, TextareaFieldClient } from '../../fields/config/types.js'
import type { TextareaFieldValidation } from '../../fields/validations.js'
import type { FieldErrorClientComponent, FieldErrorServerComponent } from '../forms/Error.js'
import type {
  ClientFieldBase,
  FieldClientComponent,
  FieldServerComponent,
  ServerFieldBase,
} from '../forms/Field.js'
import type {
  FieldDescriptionClientComponent,
  FieldDescriptionServerComponent,
  FieldLabelClientComponent,
  FieldLabelServerComponent,
} from '../types.js'

type TextareaFieldClientWithoutType = MarkOptional<TextareaFieldClient, 'type'>

type TextareaFieldBaseClientProps = {
  readonly inputRef?: React.Ref<HTMLInputElement>
  readonly onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  readonly validate?: TextareaFieldValidation
}

export type TextareaFieldClientProps = ClientFieldBase<TextareaFieldClientWithoutType> &
  TextareaFieldBaseClientProps

export type TextareaFieldServerProps = ServerFieldBase<TextareaField>

export type TextareaFieldServerComponent = FieldServerComponent<TextareaField, TextareaFieldClient>

export type TextareaFieldClientComponent = FieldClientComponent<
  TextareaFieldClientWithoutType,
  TextareaFieldBaseClientProps
>

export type TextareaFieldLabelServerComponent = FieldLabelServerComponent<TextareaField>

export type TextareaFieldLabelClientComponent =
  FieldLabelClientComponent<TextareaFieldClientWithoutType>

export type TextareaFieldDescriptionServerComponent = FieldDescriptionServerComponent<TextareaField>

export type TextareaFieldDescriptionClientComponent =
  FieldDescriptionClientComponent<TextareaFieldClientWithoutType>

export type TextareaFieldErrorServerComponent = FieldErrorServerComponent<TextareaField>

export type TextareaFieldErrorClientComponent =
  FieldErrorClientComponent<TextareaFieldClientWithoutType>
