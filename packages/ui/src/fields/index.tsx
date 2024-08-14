import type { FieldTypes } from 'payload'
import type React from 'react'

import { ArrayField } from './Array/index.js'
import { BlocksField } from './Blocks/index.js'
import { CheckboxField } from './Checkbox/index.js'
import { CodeField } from './Code/index.js'
import { CollapsibleField } from './Collapsible/index.js'
import { ConfirmPasswordField } from './ConfirmPassword/index.js'
import { DateTimeField } from './DateTime/index.js'
import { EmailField } from './Email/index.js'
import { GroupField } from './Group/index.js'
import { HiddenField } from './Hidden/index.js'
import { JSONField } from './JSON/index.js'
import { NumberField } from './Number/index.js'
import { PasswordField } from './Password/index.js'
import { PointField } from './Point/index.js'
import { RadioGroupField } from './RadioGroup/index.js'
import { RelationshipField } from './Relationship/index.js'
import { RichTextField } from './RichText/index.js'
import { RowField } from './Row/index.js'
import { SelectField } from './Select/index.js'
import { TabsField } from './Tabs/index.js'
import { TextField } from './Text/index.js'
import { TextareaField } from './Textarea/index.js'
import { UIField } from './UI/index.js'
import { UploadField } from './Upload/index.js'

export * from './shared/index.js'

export type FieldTypesComponents = {
  [K in 'confirmPassword' | 'hidden' | 'password' | FieldTypes]: React.FC
}

export const fieldComponents: FieldTypesComponents = {
  array: ArrayField,
  blocks: BlocksField,
  checkbox: CheckboxField,
  code: CodeField,
  collapsible: CollapsibleField,
  confirmPassword: ConfirmPasswordField,
  date: DateTimeField,
  email: EmailField,
  group: GroupField,
  hidden: HiddenField,
  json: JSONField,
  number: NumberField,
  password: PasswordField,
  point: PointField,
  radio: RadioGroupField,
  relationship: RelationshipField,
  richText: RichTextField,
  row: RowField,
  select: SelectField,
  tabs: TabsField,
  text: TextField,
  textarea: TextareaField,
  ui: UIField,
  upload: UploadField,
}
