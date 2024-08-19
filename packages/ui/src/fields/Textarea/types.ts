import type {
  FieldDescriptionProps,
  FieldErrorProps,
  FieldLabelProps,
  MappedComponent,
  StaticDescription,
  StaticLabel,
  TextareaFieldClient,
} from 'payload'
import type React from 'react'
import type { MarkOptional } from 'ts-essentials'

import { type ChangeEvent } from 'react'

export type TextAreaInputProps = {
  readonly Description?: MappedComponent
  readonly Error?: MappedComponent
  readonly Label?: MappedComponent
  readonly afterInput?: MappedComponent[]
  readonly beforeInput?: MappedComponent[]
  readonly className?: string
  readonly description?: StaticDescription
  readonly descriptionProps?: FieldDescriptionProps<MarkOptional<TextareaFieldClient, 'type'>>
  readonly errorProps?: FieldErrorProps<MarkOptional<TextareaFieldClient, 'type'>>
  readonly field?: MarkOptional<TextareaFieldClient, 'type'>
  readonly inputRef?: React.RefObject<HTMLInputElement>
  readonly label: StaticLabel
  readonly labelProps?: FieldLabelProps<MarkOptional<TextareaFieldClient, 'type'>>
  readonly onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  readonly onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  readonly path: string
  readonly placeholder?: string
  readonly readOnly?: boolean
  readonly required?: boolean
  readonly rows?: number
  readonly rtl?: boolean
  readonly showError?: boolean
  readonly style?: React.CSSProperties
  readonly value?: string
  readonly valueToRender?: string
  readonly width?: string
}
