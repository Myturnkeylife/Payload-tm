import type { DocToSync, SyncWithSearch } from '../../types.js'

export const syncWithSearch: SyncWithSearch = async (args) => {
  const {
    collection,
    doc,
    operation,
    pluginConfig,
    req: { payload },
    req,
  } = args

  const { id, _status: status, title } = doc || {}

  const { beforeSync, defaultPriorities, deleteDrafts, syncDrafts } = pluginConfig

  let dataToSave: DocToSync = {
    doc: {
      relationTo: collection,
      value: id,
    },
    title,
  }

  if (typeof beforeSync === 'function') {
    let docToSyncWith = doc
    if (payload.config?.localization) {
      docToSyncWith = await payload.findByID({
        id,
        collection,
        context: {
          pluginSearchRead: true,
        },
        locale: 'all',
        overrideAccess: false,
        req,
      })
    }
    dataToSave = await beforeSync({
      originalDoc: docToSyncWith,
      payload,
      req,
      searchDoc: dataToSave,
    })
  }

  let defaultPriority = 0
  if (defaultPriorities) {
    const { [collection]: priority } = defaultPriorities

    if (typeof priority === 'function') {
      try {
        defaultPriority = await priority(doc)
      } catch (err: unknown) {
        payload.logger.error(err)
        payload.logger.error(
          `Error gathering default priority for search documents related to ${collection}`,
        )
      }
    } else {
      defaultPriority = priority
    }
  }

  const doSync = syncDrafts || (!syncDrafts && status !== 'draft')

  try {
    if (operation === 'create') {
      if (doSync) {
        await payload.create({
          collection: 'search',
          data: {
            ...dataToSave,
            priority: defaultPriority,
          },
          overrideAccess: false,
          req,
        })
      }
    }

    if (operation === 'update') {
      try {
        // find the correct doc to sync with
        const searchDocQuery = await payload.find({
          collection: 'search',
          depth: 0,
          overrideAccess: false,
          req,
          where: {
            'doc.value': {
              equals: id,
            },
          },
        })

        const docs: Array<{
          id: number | string
          priority?: number
        }> = searchDocQuery?.docs || []

        const [foundDoc, ...duplicativeDocs] = docs

        // delete all duplicative search docs (docs that reference the same page)
        // to ensure the same, out-of-date result does not appear twice (where only syncing the first found doc)
        if (duplicativeDocs.length > 0) {
          try {
            const duplicativeDocIDs = duplicativeDocs.map(({ id }) => id)
            await payload.delete({
              collection: 'search',
              overrideAccess: false,
              req,
              where: { id: { in: duplicativeDocIDs } },
            })
          } catch (err: unknown) {
            payload.logger.error(`Error deleting duplicative search documents.`)
          }
        }

        if (foundDoc) {
          const { id: searchDocID } = foundDoc

          if (doSync) {
            // update the doc normally
            try {
              await payload.update({
                id: searchDocID,
                collection: 'search',
                data: {
                  ...dataToSave,
                  priority: foundDoc.priority || defaultPriority,
                },
                overrideAccess: false,
                req,
              })
            } catch (err: unknown) {
              payload.logger.error(`Error updating search document.`)
            }
          }
          if (deleteDrafts && status === 'draft') {
            // do not include draft docs in search results, so delete the record
            try {
              await payload.delete({
                id: searchDocID,
                collection: 'search',
                overrideAccess: false,
                req,
              })
            } catch (err: unknown) {
              payload.logger.error(`Error deleting search document: ${err}`)
            }
          }
        } else if (doSync) {
          try {
            await payload.create({
              collection: 'search',
              data: {
                ...dataToSave,
                priority: defaultPriority,
              },
              overrideAccess: false,
              req,
            })
          } catch (err: unknown) {
            payload.logger.error(`Error creating search document: ${err}`)
          }
        }
      } catch (err: unknown) {
        payload.logger.error(`Error finding search document: ${err}`)
      }
    }
  } catch (err: unknown) {
    payload.logger.error(
      `Error syncing search document related to ${collection} with id: '${id}': ${err}`,
    )
  }

  return doc
}
