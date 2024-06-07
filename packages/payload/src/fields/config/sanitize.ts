import type { Config, SanitizedConfig } from '../../config/types.js'
import type { Field } from './types.js'

import { MissingEditorProp } from '../../errors/MissingEditorProp.js'
import {
  DuplicateFieldName,
  InvalidFieldName,
  InvalidFieldRelationship,
  MissingFieldType,
} from '../../errors/index.js'
import { deepMerge } from '../../utilities/deepMerge.js'
import { formatLabels, toWords } from '../../utilities/formatLabels.js'
import { baseBlockFields } from '../baseFields/baseBlockFields.js'
import { baseIDField } from '../baseFields/baseIDField.js'
import { setDefaultBeforeDuplicate } from '../setDefaultBeforeDuplicate.js'
import validations from '../validations.js'
import { fieldAffectsData, tabHasName } from './types.js'

type Args = {
  config: Config
  existingFieldNames?: Set<string>
  fields: Field[]
  /**
   * If true, a richText field will require an editor property to be set, as the sanitizeFields function will not add it from the payload config if not present.
   *
   * @default false
   */
  requireFieldLevelRichTextEditor?: boolean
  /**
   * If this property is set, RichText fields won't be sanitized immediately. Instead, they will be added to this array as promises
   * so that you can sanitize them together, after the config has been sanitized.
   */
  richTextSanitizationPromises?: Array<(config: SanitizedConfig) => Promise<void>>

  /**
   * If not null, will validate that upload and relationship fields do not relate to a collection that is not in this array.
   * This validation will be skipped if validRelationships is null.
   */
  validRelationships: null | string[]
}

export const sanitizeFields = async ({
  config,
  existingFieldNames = new Set(),
  fields,
  requireFieldLevelRichTextEditor = false,
  richTextSanitizationPromises,
  validRelationships,
}: Args): Promise<Field[]> => {
  if (!fields) return []

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]

    if (!field.type) throw new MissingFieldType(field)

    // assert that field names do not contain forbidden characters
    if (fieldAffectsData(field) && field.name.includes('.')) {
      throw new InvalidFieldName(field, field.name)
    }

    // Auto-label
    if (
      'name' in field &&
      field.name &&
      typeof field.label !== 'object' &&
      typeof field.label !== 'string' &&
      typeof field.label !== 'function' &&
      field.label !== false
    ) {
      field.label = toWords(field.name)
    }

    if (
      field.type === 'checkbox' &&
      typeof field.defaultValue === 'undefined' &&
      field.required === true
    ) {
      field.defaultValue = false
    }

    if (field.type === 'relationship' || field.type === 'upload') {
      if (validRelationships) {
        const relationships = Array.isArray(field.relationTo)
          ? field.relationTo
          : [field.relationTo]
        relationships.forEach((relationship: string) => {
          if (!validRelationships.includes(relationship)) {
            throw new InvalidFieldRelationship(field, relationship)
          }
        })
      }

      if (field.type === 'relationship') {
        if (field.min && !field.minRows) {
          console.warn(
            `(payload): The "min" property is deprecated for the Relationship field "${field.name}" and will be removed in a future version. Please use "minRows" instead.`,
          )
        }
        if (field.max && !field.maxRows) {
          console.warn(
            `(payload): The "max" property is deprecated for the Relationship field "${field.name}" and will be removed in a future version. Please use "maxRows" instead.`,
          )
        }
        field.minRows = field.minRows || field.min
        field.maxRows = field.maxRows || field.max
      }
    }

    if (field.type === 'blocks' && field.blocks) {
      field.blocks = field.blocks.map((block) => ({
        ...block,
        fields: block.fields.concat(baseBlockFields),
      }))
    }

    if (field.type === 'array' && field.fields) {
      field.fields.push(baseIDField)
    }

    if ((field.type === 'blocks' || field.type === 'array') && field.label) {
      field.labels = field.labels || formatLabels(field.name)
    }

    if (fieldAffectsData(field)) {
      if (existingFieldNames.has(field.name)) {
        throw new DuplicateFieldName(field.name)
      } else if (!['blockName', 'id'].includes(field.name)) {
        existingFieldNames.add(field.name)
      }

      if (field.localized && !config.localization) delete field.localized

      if (typeof field.validate === 'undefined') {
        const defaultValidate = validations[field.type]
        if (defaultValidate) {
          field.validate = (val, options) => defaultValidate(val, { ...field, ...options })
        } else {
          field.validate = () => true
        }
      }

      if (!field.hooks) field.hooks = {}
      if (!field.access) field.access = {}

      setDefaultBeforeDuplicate(field)
    }

    if (!field.admin) {
      field.admin = {}
    }

    // Make sure that the richText field has an editor
    if (field.type === 'richText') {
      const sanitizeRichText = async (_config: SanitizedConfig) => {
        if (!field.editor) {
          if (_config.editor && !requireFieldLevelRichTextEditor) {
            // config.editor should be sanitized at this point
            field.editor = _config.editor
          } else {
            throw new MissingEditorProp(field) // while we allow disabling editor functionality, you should not have any richText fields defined if you do not have an editor
          }
        }

        if (typeof field.editor === 'function') {
          field.editor = await field.editor({
            config: _config,
            isRoot: requireFieldLevelRichTextEditor,
          })
        }

        if (field.editor.i18n && Object.keys(field.editor.i18n).length >= 0) {
          config.i18n.translations = deepMerge(config.i18n.translations, field.editor.i18n)
        }

        // Add editor adapter hooks to field hooks
        if (!field.hooks) field.hooks = {}

        const mergeHooks = (hookName: keyof typeof field.editor.hooks) => {
          if (typeof field.editor === 'function') return

          if (field.editor?.hooks?.[hookName]?.length) {
            field.hooks[hookName] = field.hooks[hookName]
              ? field.hooks[hookName].concat(field.editor.hooks[hookName])
              : [...field.editor.hooks[hookName]]
          }
        }

        mergeHooks('afterRead')
        mergeHooks('afterChange')
        mergeHooks('beforeChange')
        mergeHooks('beforeValidate')
        mergeHooks('beforeDuplicate')
      }
      if (richTextSanitizationPromises) {
        richTextSanitizationPromises.push(sanitizeRichText)
      } else {
        await sanitizeRichText(config as unknown as SanitizedConfig)
      }
    }

    if ('fields' in field && field.fields) {
      field.fields = await sanitizeFields({
        config,
        existingFieldNames: fieldAffectsData(field) ? new Set() : existingFieldNames,
        fields: field.fields,
        requireFieldLevelRichTextEditor,
        richTextSanitizationPromises,
        validRelationships,
      })
    }

    if (field.type === 'tabs') {
      for (let j = 0; j < field.tabs.length; j++) {
        const tab = field.tabs[j]
        if (tabHasName(tab) && typeof tab.label === 'undefined') {
          tab.label = toWords(tab.name)
        }

        tab.fields = await sanitizeFields({
          config,
          existingFieldNames: tabHasName(tab) ? new Set() : existingFieldNames,
          fields: tab.fields,
          requireFieldLevelRichTextEditor,
          richTextSanitizationPromises,
          validRelationships,
        })
        field.tabs[j] = tab
      }
    }

    if ('blocks' in field && field.blocks) {
      for (let j = 0; j < field.blocks.length; j++) {
        const block = field.blocks[j]
        block.labels = !block.labels ? formatLabels(block.slug) : block.labels

        block.fields = await sanitizeFields({
          config,
          existingFieldNames: new Set(),
          fields: block.fields,
          requireFieldLevelRichTextEditor,
          richTextSanitizationPromises,
          validRelationships,
        })
        field.blocks[j] = block
      }
    }

    fields[i] = field
  }

  return fields
}
