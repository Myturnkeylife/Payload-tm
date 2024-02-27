import type { RichTextAdapter } from 'payload/types'

import { initI18n } from '@payloadcms/translations'
import { translations } from '@payloadcms/translations/client'
import { sanitizeFields } from 'payload/config'

import type { AdapterArguments, RichTextCustomElement } from '.'

import elementTypes from './field/elements'
import { linkFieldsSchemaPath } from './field/elements/link/shared'
import { transformExtraFields } from './field/elements/link/utilities'
import { uploadFieldsSchemaPath } from './field/elements/upload/shared'

export const getGenerateSchemaMap =
  (args: AdapterArguments): RichTextAdapter['generateSchemaMap'] =>
  ({ config, schemaMap, schemaPath }) => {
    const i18n = initI18n({ config: config.i18n, context: 'client', translations })
    const validRelationships = config.collections.map((c) => c.slug) || []

    ;(args?.admin?.elements || Object.values(elementTypes)).forEach((el) => {
      let element: RichTextCustomElement

      if (typeof el === 'object' && el !== null) {
        element = el
      } else if (typeof el === 'string' && elementTypes[el]) {
        element = elementTypes[el]
      }

      if (element) {
        switch (element.name) {
          case 'link': {
            const linkFields = sanitizeFields({
              config,
              fields: transformExtraFields(args.admin?.link?.fields, config, i18n),
              validRelationships,
            })

            schemaMap.set(`${schemaPath}.${linkFieldsSchemaPath}`, linkFields)

            break
          }

          case 'upload': {
            const uploadEnabledCollections = config.collections.filter(
              ({ admin: { enableRichTextRelationship, hidden }, upload }) => {
                if (hidden === true) {
                  return false
                }

                return enableRichTextRelationship && Boolean(upload) === true
              },
            )

            uploadEnabledCollections.forEach((collection) => {
              if (args?.admin?.upload?.collections[collection.slug]?.fields) {
                const uploadFields = sanitizeFields({
                  config,
                  fields: args?.admin?.upload?.collections[collection.slug]?.fields,
                  validRelationships,
                })

                schemaMap.set(
                  `${schemaPath}.${uploadFieldsSchemaPath}.${collection.slug}`,
                  uploadFields,
                )
              }
            })

            break
          }

          case 'relationship':
            break
        }
      }
    })

    return schemaMap
  }
