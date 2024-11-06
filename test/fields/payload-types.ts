/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "BlockColumns".
 */
export type BlockColumns =
  | {
      text?: string | null
      id?: string | null
    }[]
  | null

export interface Config {
  collections: {
    'lexical-fields': LexicalField
    'lexical-migrate-fields': LexicalMigrateField
    users: User
    'array-fields': ArrayField
    'block-fields': BlockField
    'checkbox-fields': CheckboxField
    'code-fields': CodeField
    'collapsible-fields': CollapsibleField
    'conditional-logic': ConditionalLogic
    'date-fields': DateField
    'radio-fields': RadioField
    'group-fields': GroupField
    'row-fields': RowField
    'indexed-fields': IndexedField
    'json-fields': JsonField
    'number-fields': NumberField
    'point-fields': PointField
    'relationship-fields': RelationshipField
    'rich-text-fields': RichTextField
    'select-fields': SelectField
    'tabs-fields': TabsField
    'text-fields': TextField
    uploads: Upload
    uploads2: Uploads2
    uploads3: Uploads3
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  globals: {
    tabsWithRichText: TabsWithRichText
  }
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "lexical-fields".
 */
export interface LexicalField {
  id: string
  title: string
  lexicalSimple?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  lexicalWithBlocks: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "lexical-migrate-fields".
 */
export interface LexicalMigrateField {
  id: string
  title: string
  lexicalWithLexicalPluginData?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  lexicalWithSlateData?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  lexicalSimple?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  lexicalSimple_html?: string | null
  groupWithLexicalField?: {
    lexicalInGroupField?: {
      root: {
        type: string
        children: {
          type: string
          version: number
          [k: string]: unknown
        }[]
        direction: ('ltr' | 'rtl') | null
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
        indent: number
        version: number
      }
      [k: string]: unknown
    } | null
    lexicalInGroupField_html?: string | null
  }
  arrayWithLexicalField?:
    | {
        lexicalInArrayField?: {
          root: {
            type: string
            children: {
              type: string
              version: number
              [k: string]: unknown
            }[]
            direction: ('ltr' | 'rtl') | null
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
            indent: number
            version: number
          }
          [k: string]: unknown
        } | null
        lexicalInArrayField_html?: string | null
        id?: string | null
      }[]
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string
  canViewConditionalField?: boolean | null
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "array-fields".
 */
export interface ArrayField {
  id: string
  title?: string | null
  items: {
    text: string
    localizedText?: string | null
    subArray?:
      | {
          text?: string | null
          id?: string | null
        }[]
      | null
    id?: string | null
  }[]
  collapsedArray?:
    | {
        text: string
        id?: string | null
      }[]
    | null
  localized: {
    text: string
    id?: string | null
  }[]
  readOnly?:
    | {
        text?: string | null
        id?: string | null
      }[]
    | null
  potentiallyEmptyArray?:
    | {
        text?: string | null
        groupInRow?: {
          textInGroupInRow?: string | null
        }
        id?: string | null
      }[]
    | null
  rowLabelAsFunction?:
    | {
        title?: string | null
        id?: string | null
      }[]
    | null
  rowLabelAsComponent?:
    | {
        title?: string | null
        id?: string | null
      }[]
    | null
  arrayWithMinRows?:
    | {
        text?: string | null
        id?: string | null
      }[]
    | null
  disableSort?:
    | {
        text: string
        id?: string | null
      }[]
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "block-fields".
 */
export interface BlockField {
  id: string
  blocks: (
    | {
        text: string
        richText?:
          | {
              [k: string]: unknown
            }[]
          | null
        id?: string | null
        blockName?: string | null
        blockType: 'content'
      }
    | {
        number: number
        id?: string | null
        blockName?: string | null
        blockType: 'number'
      }
    | {
        subBlocks?:
          | (
              | {
                  text: string
                  id?: string | null
                  blockName?: string | null
                  blockType: 'text'
                }
              | {
                  number: number
                  id?: string | null
                  blockName?: string | null
                  blockType: 'number'
                }
            )[]
          | null
        id?: string | null
        blockName?: string | null
        blockType: 'subBlocks'
      }
    | {
        textInCollapsible?: string | null
        textInRow?: string | null
        id?: string | null
        blockName?: string | null
        blockType: 'tabs'
      }
  )[]
  duplicate: (
    | {
        text: string
        richText?:
          | {
              [k: string]: unknown
            }[]
          | null
        id?: string | null
        blockName?: string | null
        blockType: 'content'
      }
    | {
        number: number
        id?: string | null
        blockName?: string | null
        blockType: 'number'
      }
    | {
        subBlocks?:
          | (
              | {
                  text: string
                  id?: string | null
                  blockName?: string | null
                  blockType: 'text'
                }
              | {
                  number: number
                  id?: string | null
                  blockName?: string | null
                  blockType: 'number'
                }
            )[]
          | null
        id?: string | null
        blockName?: string | null
        blockType: 'subBlocks'
      }
    | {
        textInCollapsible?: string | null
        textInRow?: string | null
        id?: string | null
        blockName?: string | null
        blockType: 'tabs'
      }
  )[]
  collapsedByDefaultBlocks: (
    | {
        text: string
        richText?:
          | {
              [k: string]: unknown
            }[]
          | null
        id?: string | null
        blockName?: string | null
        blockType: 'localizedContent'
      }
    | {
        number: number
        id?: string | null
        blockName?: string | null
        blockType: 'localizedNumber'
      }
    | {
        subBlocks?:
          | (
              | {
                  text: string
                  id?: string | null
                  blockName?: string | null
                  blockType: 'text'
                }
              | {
                  number: number
                  id?: string | null
                  blockName?: string | null
                  blockType: 'number'
                }
            )[]
          | null
        id?: string | null
        blockName?: string | null
        blockType: 'localizedSubBlocks'
      }
    | {
        textInCollapsible?: string | null
        textInRow?: string | null
        id?: string | null
        blockName?: string | null
        blockType: 'localizedTabs'
      }
  )[]
  disableSort: (
    | {
        text: string
        richText?:
          | {
              [k: string]: unknown
            }[]
          | null
        id?: string | null
        blockName?: string | null
        blockType: 'localizedContent'
      }
    | {
        number: number
        id?: string | null
        blockName?: string | null
        blockType: 'localizedNumber'
      }
    | {
        subBlocks?:
          | (
              | {
                  text: string
                  id?: string | null
                  blockName?: string | null
                  blockType: 'text'
                }
              | {
                  number: number
                  id?: string | null
                  blockName?: string | null
                  blockType: 'number'
                }
            )[]
          | null
        id?: string | null
        blockName?: string | null
        blockType: 'localizedSubBlocks'
      }
    | {
        textInCollapsible?: string | null
        textInRow?: string | null
        id?: string | null
        blockName?: string | null
        blockType: 'localizedTabs'
      }
  )[]
  localizedBlocks: (
    | {
        text: string
        richText?:
          | {
              [k: string]: unknown
            }[]
          | null
        id?: string | null
        blockName?: string | null
        blockType: 'localizedContent'
      }
    | {
        number: number
        id?: string | null
        blockName?: string | null
        blockType: 'localizedNumber'
      }
    | {
        subBlocks?:
          | (
              | {
                  text: string
                  id?: string | null
                  blockName?: string | null
                  blockType: 'text'
                }
              | {
                  number: number
                  id?: string | null
                  blockName?: string | null
                  blockType: 'number'
                }
            )[]
          | null
        id?: string | null
        blockName?: string | null
        blockType: 'localizedSubBlocks'
      }
    | {
        textInCollapsible?: string | null
        textInRow?: string | null
        id?: string | null
        blockName?: string | null
        blockType: 'localizedTabs'
      }
  )[]
  i18nBlocks?:
    | {
        text?: string | null
        id?: string | null
        blockName?: string | null
        blockType: 'text'
      }[]
    | null
  blocksWithSimilarConfigs?:
    | (
        | {
            items?:
              | {
                  title: string
                  id?: string | null
                }[]
              | null
            id?: string | null
            blockName?: string | null
            blockType: 'block-a'
          }
        | {
            items?:
              | {
                  title2: string
                  id?: string | null
                }[]
              | null
            id?: string | null
            blockName?: string | null
            blockType: 'block-b'
          }
        | {
            group?: {
              text?: string | null
            }
            id?: string | null
            blockName?: string | null
            blockType: 'group-block'
          }
      )[]
    | null
  blocksWithSimilarGroup?:
    | (
        | {
            group?: {
              text?: string | null
            }
            id?: string | null
            blockName?: string | null
            blockType: 'group-block'
          }
        | {
            items?:
              | {
                  title2: string
                  id?: string | null
                }[]
              | null
            id?: string | null
            blockName?: string | null
            blockType: 'block-b'
          }
      )[]
    | null
  blocksWithMinRows?:
    | {
        blockTitle?: string | null
        id?: string | null
        blockName?: string | null
        blockType: 'block'
      }[]
    | null
  customBlocks?:
    | (
        | {
            block1Title?: string | null
            id?: string | null
            blockName?: string | null
            blockType: 'block-1'
          }
        | {
            block2Title?: string | null
            id?: string | null
            blockName?: string | null
            blockType: 'block-2'
          }
      )[]
    | null
  relationshipBlocks?:
    | {
        relationship?: (string | null) | TextField
        id?: string | null
        blockName?: string | null
        blockType: 'relationships'
      }[]
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "text-fields".
 */
export interface TextField {
  id: string
  text: string
  localizedText?: string | null
  i18nText?: string | null
  defaultFunction?: string | null
  defaultAsync?: string | null
  overrideLength?: string | null
  fieldWithDefaultValue?: string | null
  dependentOnFieldWithDefaultValue?: string | null
  customLabel?: string | null
  customError?: string | null
  beforeAndAfterInput?: string | null
  hasMany?: string[] | null
  validatesHasMany?: string[] | null
  localizedHasMany?: string[] | null
  withMinRows?: string[] | null
  withMaxRows?: string[] | null
  disableListColumnText?: string | null
  disableListFilterText?: string | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "checkbox-fields".
 */
export interface CheckboxField {
  id: string
  checkbox: boolean
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "code-fields".
 */
export interface CodeField {
  id: string
  javascript?: string | null
  typescript?: string | null
  json?: string | null
  html?: string | null
  css?: string | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "collapsible-fields".
 */
export interface CollapsibleField {
  id: string
  text: string
  group?: {
    textWithinGroup?: string | null
    subGroup?: {
      textWithinSubGroup?: string | null
    }
  }
  someText?: string | null
  group2?: {
    textWithinGroup?: string | null
    subGroup?: {
      textWithinSubGroup?: string | null
    }
  }
  functionTitleField?: string | null
  componentTitleField?: string | null
  nestedTitle?: string | null
  arrayWithCollapsibles?:
    | {
        innerCollapsible?: string | null
        id?: string | null
      }[]
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "conditional-logic".
 */
export interface ConditionalLogic {
  id: string
  text: string
  toggleField?: boolean | null
  fieldToToggle?: string | null
  userConditional?: string | null
  parentGroup?: {
    enableParentGroupFields?: boolean | null
    siblingField?: string | null
  }
  reliesOnParentGroup?: string | null
  groupSelection?: ('group1' | 'group2') | null
  group1?: {
    group1Field?: string | null
  }
  group2?: {
    group2Field?: string | null
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "date-fields".
 */
export interface DateField {
  id: string
  default: string
  timeOnly?: string | null
  timeOnlyWithCustomFormat?: string | null
  dayOnly?: string | null
  dayAndTime?: string | null
  monthOnly?: string | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "radio-fields".
 */
export interface RadioField {
  id: string
  radio?: ('one' | 'two' | 'three') | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "group-fields".
 */
export interface GroupField {
  id: string
  group: {
    text: string
    defaultParent?: string | null
    defaultChild?: string | null
    subGroup?: {
      textWithinGroup?: string | null
      arrayWithinGroup?:
        | {
            textWithinArray?: string | null
            id?: string | null
          }[]
        | null
    }
  }
  arrayOfGroups?:
    | {
        groupItem?: {
          text?: string | null
        }
        id?: string | null
      }[]
    | null
  potentiallyEmptyGroup?: {
    text?: string | null
  }
  groupInRow?: {
    field?: string | null
    secondField?: string | null
    thirdField?: string | null
  }
  secondGroupInRow?: {
    field?: string | null
    nestedGroup?: {
      nestedField?: string | null
    }
  }
  groups: {
    groupInRow?: {
      field?: string | null
      secondField?: string | null
      thirdField?: string | null
    }
    secondGroupInRow?: {
      field?: string | null
      nestedGroup?: {
        nestedField?: string | null
      }
    }
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "row-fields".
 */
export interface RowField {
  id: string
  title: string
  disableListColumnText?: string | null
  field_with_width_a?: string | null
  field_with_width_b?: string | null
  field_within_collapsible_a?: string | null
  field_within_collapsible_b?: string | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "indexed-fields".
 */
export interface IndexedField {
  id: string
  text: string
  uniqueText?: string | null
  uniqueRequiredText: string
  /**
   * @minItems 2
   * @maxItems 2
   */
  point?: [number, number] | null
  group?: {
    localizedUnique?: string | null
    unique?: string | null
    /**
     * @minItems 2
     * @maxItems 2
     */
    point?: [number, number] | null
  }
  collapsibleLocalizedUnique?: string | null
  collapsibleTextUnique?: string | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "json-fields".
 */
export interface JsonField {
  id: string
  json?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "number-fields".
 */
export interface NumberField {
  id: string
  number?: number | null
  min?: number | null
  max?: number | null
  positiveNumber?: number | null
  negativeNumber?: number | null
  decimalMin?: number | null
  decimalMax?: number | null
  defaultNumber?: number | null
  hasMany?: number[] | null
  validatesHasMany?: number[] | null
  localizedHasMany?: number[] | null
  withMinRows?: number[] | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "point-fields".
 */
export interface PointField {
  id: string
  /**
   * @minItems 2
   * @maxItems 2
   */
  point: [number, number]
  /**
   * @minItems 2
   * @maxItems 2
   */
  localized?: [number, number] | null
  group?: {
    /**
     * @minItems 2
     * @maxItems 2
     */
    point?: [number, number] | null
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "relationship-fields".
 */
export interface RelationshipField {
  id: string
  text?: string | null
  relationship:
    | {
        relationTo: 'text-fields'
        value: string | TextField
      }
    | {
        relationTo: 'array-fields'
        value: string | ArrayField
      }
  relationHasManyPolymorphic?:
    | (
        | {
            relationTo: 'text-fields'
            value: string | TextField
          }
        | {
            relationTo: 'array-fields'
            value: string | ArrayField
          }
      )[]
    | null
  relationToSelf?: (string | null) | RelationshipField
  relationToSelfSelectOnly?: (string | null) | RelationshipField
  relationWithDynamicDefault?: (string | null) | User
  relationHasManyWithDynamicDefault?: {
    relationTo: 'users'
    value: string | User
  } | null
  relationshipWithMin?: (string | TextField)[] | null
  relationshipWithMax?: (string | TextField)[] | null
  relationshipHasMany?: (string | TextField)[] | null
  array?:
    | {
        relationship?: (string | null) | TextField
        id?: string | null
      }[]
    | null
  relationshipWithMinRows?:
    | {
        relationTo: 'text-fields'
        value: string | TextField
      }[]
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "rich-text-fields".
 */
export interface RichTextField {
  id: string
  title: string
  lexicalCustomFields: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  }
  lexicalCustomFields_html?: string | null
  lexical?: {
    root: {
      type: string
      children: {
        type: string
        version: number
        [k: string]: unknown
      }[]
      direction: ('ltr' | 'rtl') | null
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
      indent: number
      version: number
    }
    [k: string]: unknown
  } | null
  selectHasMany?: ('one' | 'two' | 'three' | 'four' | 'five' | 'six')[] | null
  richText: {
    [k: string]: unknown
  }[]
  richTextCustomFields?:
    | {
        [k: string]: unknown
      }[]
    | null
  richTextReadOnly?:
    | {
        [k: string]: unknown
      }[]
    | null
  blocks?:
    | (
        | {
            text?: string | null
            id?: string | null
            blockName?: string | null
            blockType: 'textBlock'
          }
        | {
            text?:
              | {
                  [k: string]: unknown
                }[]
              | null
            id?: string | null
            blockName?: string | null
            blockType: 'richTextBlock'
          }
      )[]
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "select-fields".
 */
export interface SelectField {
  id: string
  select?: ('one' | 'two' | 'three') | null
  selectReadOnly?: ('one' | 'two' | 'three') | null
  selectHasMany?: ('one' | 'two' | 'three' | 'four' | 'five' | 'six')[] | null
  selectHasManyLocalized?: ('one' | 'two')[] | null
  selectI18n?: ('one' | 'two' | 'three') | null
  simple?: ('One' | 'Two' | 'Three') | null
  settings?: {
    category?: ('a' | 'b')[] | null
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tabs-fields".
 */
export interface TabsField {
  id: string
  sidebarField?: string | null
  array: {
    text: string
    id?: string | null
  }[]
  blocks: (
    | {
        text: string
        richText?:
          | {
              [k: string]: unknown
            }[]
          | null
        id?: string | null
        blockName?: string | null
        blockType: 'content'
      }
    | {
        number: number
        id?: string | null
        blockName?: string | null
        blockType: 'number'
      }
    | {
        subBlocks?:
          | (
              | {
                  text: string
                  id?: string | null
                  blockName?: string | null
                  blockType: 'text'
                }
              | {
                  number: number
                  id?: string | null
                  blockName?: string | null
                  blockType: 'number'
                }
            )[]
          | null
        id?: string | null
        blockName?: string | null
        blockType: 'subBlocks'
      }
    | {
        textInCollapsible?: string | null
        textInRow?: string | null
        id?: string | null
        blockName?: string | null
        blockType: 'tabs'
      }
  )[]
  group: {
    number: number
  }
  textInRow: string
  numberInRow: number
  json?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  tab: {
    array: {
      text: string
      id?: string | null
    }[]
    text?: string | null
    defaultValue?: string | null
    arrayInRow?:
      | {
          textInArrayInRow?: string | null
          id?: string | null
        }[]
      | null
  }
  namedTabWithDefaultValue: {
    defaultValue?: string | null
  }
  localizedTab: {
    text?: string | null
  }
  accessControlTab: {
    text?: string | null
  }
  hooksTab: {
    beforeValidate?: boolean | null
    beforeChange?: boolean | null
    afterChange?: boolean | null
    afterRead?: boolean | null
  }
  textarea?: string | null
  anotherText: string
  nestedTab: {
    text?: string | null
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "uploads".
 */
export interface Upload {
  id: string
  text?: string | null
  media?: string | Upload | null
  richText?:
    | {
        [k: string]: unknown
      }[]
    | null
  updatedAt: string
  createdAt: string
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "uploads2".
 */
export interface Uploads2 {
  id: string
  text?: string | null
  media?: string | Uploads2 | null
  updatedAt: string
  createdAt: string
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "uploads3".
 */
export interface Uploads3 {
  id: string
  media?: string | Uploads3 | null
  richText?:
    | {
        [k: string]: unknown
      }[]
    | null
  updatedAt: string
  createdAt: string
  url?: string | null
  filename?: string | null
  mimeType?: string | null
  filesize?: number | null
  width?: number | null
  height?: number | null
  focalX?: number | null
  focalY?: number | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string
  user: {
    relationTo: 'users'
    value: string | User
  }
  key?: string | null
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string
  name?: string | null
  batch?: number | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "tabsWithRichText".
 */
export interface TabsWithRichText {
  id: string
  tab1: {
    rt1?: {
      root: {
        type: string
        children: {
          type: string
          version: number
          [k: string]: unknown
        }[]
        direction: ('ltr' | 'rtl') | null
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
        indent: number
        version: number
      }
      [k: string]: unknown
    } | null
  }
  tab2: {
    rt2?: {
      root: {
        type: string
        children: {
          type: string
          version: number
          [k: string]: unknown
        }[]
        direction: ('ltr' | 'rtl') | null
        format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
        indent: number
        version: number
      }
      [k: string]: unknown
    } | null
  }
  updatedAt?: string | null
  createdAt?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "LexicalBlocksRadioButtonsBlock".
 */
export interface LexicalBlocksRadioButtonsBlock {
  radioButtons?: ('option1' | 'option2' | 'option3') | null
  id?: string | null
  blockName?: string | null
  blockType: 'radioButtons'
}

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
