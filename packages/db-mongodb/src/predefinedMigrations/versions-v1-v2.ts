const imports = `import { migrateVersionsV1_V2 } from '@payloadcms/db-mongodb/migration-utils'`
const upSQL = `   await migrateVersionsV1_V2({
        req,
        })
`
export { imports, upSQL }

//# sourceMappingURL=versions-v2-v3.js.map
