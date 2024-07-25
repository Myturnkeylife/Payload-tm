import type { CustomComponent } from '../../config/types.js'

export type LabelProps = {
  CustomLabel?: React.ReactNode
  as?: 'label' | 'span'
  htmlFor?: string
  label?: Record<string, string> | string
  required?: boolean
  schemaPath?: string
  unstyled?: boolean
}

export type SanitizedLabelProps = Omit<LabelProps, 'label' | 'required'>

export type LabelComponent = CustomComponent<LabelProps>
