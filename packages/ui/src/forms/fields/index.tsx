import type { FieldTypes } from 'payload/config'

import array from './Array/index.js'
import blocks from './Blocks/index.js'
import checkbox from './Checkbox/index.js'
import code from './Code/index.js'
import collapsible from './Collapsible/index.js'
import confirmPassword from './ConfirmPassword/index.js'
import date from './DateTime/index.js'
import email from './Email/index.js'
import group from './Group/index.js'
import hidden from './HiddenInput/index.js'
import json from './JSON/index.js'
import number from './Number/index.js'
import password from './Password/index.js'
import point from './Point/index.js'
import radio from './RadioGroup/index.js'
import relationship from './Relationship/index.js'
import richText from './RichText/index.js'
import row from './Row/index.js'
import select from './Select/index.js'
import tabs from './Tabs/index.js'
import text from './Text/index.js'
import textarea from './Textarea/index.js'
import ui from './UI/index.js'
import upload from './Upload/index.js'

export const fieldComponents: FieldTypes = {
  array,
  blocks,
  checkbox,
  code,
  collapsible,
  confirmPassword,
  date,
  email,
  group,
  hidden,
  json,
  number,
  password,
  point,
  radio,
  relationship,
  richText,
  row,
  select,
  tabs,
  text,
  textarea,
  ui,
  upload,
}
