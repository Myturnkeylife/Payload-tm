import type { Init, SanitizedCollectionConfig } from 'payload'

import { createTableName } from '@payloadcms/drizzle'
import { uniqueIndex } from 'drizzle-orm/pg-core'
import { buildVersionCollectionFields, buildVersionGlobalFields } from 'payload'
import toSnakeCase from 'to-snake-case'

import type { BaseExtraConfig } from './schema/build.js'
import type { GenericColumn, PostgresAdapter } from './types.js'

import { buildTable } from './schema/build.js'

export const init: Init = function init(this: PostgresAdapter) {
  if (this.payload.config.localization) {
    this.enums.enum__locales = this.pgSchema.enum(
      '_locales',
      this.payload.config.localization.locales.map(({ code }) => code) as [string, ...string[]],
    )
  }

  this.payload.config.collections.forEach((collection: SanitizedCollectionConfig) => {
    createTableName({
      adapter: this,
      config: collection,
    })

    if (collection.versions) {
      createTableName({
        adapter: this,
        config: collection,
        versions: true,
        versionsCustomName: true,
      })
    }
  })
  this.payload.config.collections.forEach((collection: SanitizedCollectionConfig) => {
    const tableName = this.tableNameMap.get(toSnakeCase(collection.slug))

    const baseExtraConfig: BaseExtraConfig = {}

    if (collection.upload.filenameCompoundIndex) {
      const indexName = `${tableName}_filename_compound_idx`

      baseExtraConfig.filename_compound_index = (cols) => {
        const colsConstraint = collection.upload.filenameCompoundIndex.map((f) => {
          return cols[f]
        })
        return uniqueIndex(indexName).on(colsConstraint[0], ...colsConstraint.slice(1))
      }
    }

    buildTable({
      adapter: this,
      baseExtraConfig,
      disableNotNull: !!collection?.versions?.drafts,
      disableUnique: false,
      fields: collection.fields,
      tableName,
      timestamps: collection.timestamps,
      versions: false,
    })

    if (collection.versions) {
      const versionsTableName = this.tableNameMap.get(
        `_${toSnakeCase(collection.slug)}${this.versionsSuffix}`,
      )
      const versionFields = buildVersionCollectionFields(collection)

      buildTable({
        adapter: this,
        disableNotNull: !!collection.versions?.drafts,
        disableUnique: true,
        fields: versionFields,
        tableName: versionsTableName,
        timestamps: true,
        versions: true,
      })
    }
  })

  this.payload.config.globals.forEach((global) => {
    const tableName = createTableName({ adapter: this, config: global })

    buildTable({
      adapter: this,
      disableNotNull: !!global?.versions?.drafts,
      disableUnique: false,
      fields: global.fields,
      tableName,
      timestamps: false,
      versions: false,
    })

    if (global.versions) {
      const versionsTableName = createTableName({
        adapter: this,
        config: global,
        versions: true,
        versionsCustomName: true,
      })
      const versionFields = buildVersionGlobalFields(global)

      buildTable({
        adapter: this,
        disableNotNull: !!global.versions?.drafts,
        disableUnique: true,
        fields: versionFields,
        tableName: versionsTableName,
        timestamps: true,
        versions: true,
      })
    }
  })
}
