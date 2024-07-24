import type { MigrationTemplateArgs } from 'payload'

export const getMigrationTemplate = ({
  downSQL,
  imports,
  upSQL,
}: MigrationTemplateArgs): string => `import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'
${imports ? `${imports}\n` : ''}
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
${upSQL}
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
${downSQL}
}
`
