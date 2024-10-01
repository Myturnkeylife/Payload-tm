import {
  type I18n,
  type I18nClient,
  initI18n,
  type SupportedLanguages,
} from '@payloadcms/translations'
import { headers } from 'next/headers.js'
import {
  type ClientUser,
  createLocalReq,
  type Data,
  type DocumentPreferences,
  type Field,
  type FormState,
  type Payload,
  type SanitizedConfig,
  type TypeWithID,
  type User,
} from 'payload'
import { reduceFieldsToValues } from 'payload/shared'

import type { FieldSchemaMap } from './buildFieldSchemaMap/types.js'

import { buildStateFromSchema } from '../forms/buildStateFromSchema/index.js'
import { buildFieldSchemaMap } from './buildFieldSchemaMap/index.js'

let cached = global._payload_fieldSchemaMap

if (!cached) {
  cached = global._payload_fieldSchemaMap = null
}

export const getFieldSchemaMap = (args: {
  config: SanitizedConfig
  i18n: I18nClient
}): FieldSchemaMap => {
  const { config, i18n } = args

  if (cached && process.env.NODE_ENV !== 'development') {
    return cached
  }

  cached = buildFieldSchemaMap({
    config,
    i18n,
  })

  return cached
}

export type BuildFormStateArgs = {
  collectionSlug?: string
  config: SanitizedConfig
  data?: Data
  docPreferences?: DocumentPreferences
  formState?: FormState
  globalSlug?: string
  i18n?: I18nClient
  id?: number | string
  /*
    If not i18n was passed, the language can be passed to init i18n
  */
  language?: keyof SupportedLanguages
  locale?: string
  operation?: 'create' | 'update'
  payload: Payload
  returnLockStatus?: boolean
  schemaPath: string
  updateLastEdited?: boolean
  user?: User
}

export const buildFormState = async (
  args: BuildFormStateArgs,
): Promise<{
  lockedState?: { isLocked: boolean; user: ClientUser | number | string }
  state: FormState
}> => {
  const {
    id: idFromArgs,
    collectionSlug,
    config,
    data: dataFromArgs,
    docPreferences: docPreferencesFromArgs,
    formState,
    globalSlug,
    i18n: i18nFromArgs,
    language,
    locale,
    operation,
    payload,
    returnLockStatus,
    schemaPath,
    updateLastEdited,
    user: userFromArgs,
  } = args

  if (!payload) {
    throw new Error('No Payload instance provided')
  }

  if (!config) {
    throw new Error('No config provided')
  }

  let i18n = i18nFromArgs as I18n // TODO: fix this type

  if (!i18n) {
    i18n = await initI18n({
      config: config.i18n,
      context: 'client',
      language: language || config.i18n.fallbackLanguage,
    })
  }

  let user = userFromArgs

  const req = await createLocalReq({ req: { i18n }, user }, payload)

  if (user === undefined) {
    const userResult = await payload.auth({ headers: headers(), req })
    user = userResult.user
  }

  const incomingUserSlug = user?.collection

  const adminUserSlug = config.admin.user

  // If we have a user slug, test it against the functions
  if (incomingUserSlug) {
    const adminAccessFunction = payload.collections[incomingUserSlug].config.access?.admin

    // Run the admin access function from the config if it exists
    if (adminAccessFunction) {
      const canAccessAdmin = await adminAccessFunction({ req })

      if (!canAccessAdmin) {
        throw new Error('Unauthorized')
      }
      // Match the user collection to the global admin config
    } else if (adminUserSlug !== incomingUserSlug) {
      throw new Error('Unauthorized')
    }
  } else {
    const hasUsers = await payload.find({
      collection: adminUserSlug,
      depth: 0,
      limit: 1,
      pagination: false,
    })
    // If there are users, we should not allow access because of /create-first-user
    if (hasUsers.docs.length) {
      throw new Error('Unauthorized')
    }
  }

  const fieldSchemaMap = getFieldSchemaMap({
    config,
    i18n,
  })

  const id = collectionSlug ? idFromArgs : undefined
  const schemaPathSegments = schemaPath && schemaPath.split('.')

  let fieldSchema: Field[]

  if (schemaPathSegments && schemaPathSegments.length === 1) {
    if (payload.collections[schemaPath]) {
      fieldSchema = payload.collections[schemaPath].config.fields
    } else {
      fieldSchema = payload.config.globals.find((global) => global.slug === schemaPath)?.fields
    }
  } else if (fieldSchemaMap.has(schemaPath)) {
    fieldSchema = fieldSchemaMap.get(schemaPath)
  }

  if (!fieldSchema) {
    throw new Error(`Could not find field schema for given path "${schemaPath}"`)
  }

  let docPreferences = docPreferencesFromArgs
  let data = dataFromArgs

  const promises: {
    data?: Promise<void>
    preferences?: Promise<void>
  } = {}

  // If the request does not include doc preferences,
  // we should fetch them. This is useful for DocumentInfoProvider
  // as it reduces the amount of client-side fetches necessary
  // when we fetch data for the Edit View
  if (!docPreferences) {
    let preferencesKey

    if (collectionSlug && id) {
      preferencesKey = `collection-${collectionSlug}-${id}`
    }

    if (globalSlug) {
      preferencesKey = `global-${globalSlug}`
    }

    if (preferencesKey) {
      const fetchPreferences = async () => {
        const preferencesResult = (await payload.find({
          collection: 'payload-preferences',
          depth: 0,
          limit: 1,
          where: {
            and: [
              {
                key: {
                  equals: preferencesKey,
                },
              },
              {
                'user.relationTo': {
                  equals: user.collection,
                },
              },
              {
                'user.value': {
                  equals: user.id,
                },
              },
            ],
          },
        })) as unknown as { docs: { value: DocumentPreferences }[] }

        if (preferencesResult?.docs?.[0]?.value) {
          docPreferences = preferencesResult.docs[0].value
        }
      }

      promises.preferences = fetchPreferences()
    }
  }

  // If there is a form state,
  // then we can deduce data from that form state
  if (formState) {
    data = reduceFieldsToValues(formState, true)
  }

  // If we do not have data at this point,
  // we can fetch it. This is useful for DocumentInfoProvider
  // to reduce the amount of fetches required
  if (!data) {
    const fetchData = async () => {
      let resolvedData: Record<string, unknown> | TypeWithID

      if (collectionSlug && id) {
        resolvedData = await payload.findByID({
          id,
          collection: collectionSlug,
          depth: 0,
          draft: true,
          fallbackLocale: null,
          locale,
          overrideAccess: false,
          user,
        })
      }

      if (globalSlug && schemaPath === globalSlug) {
        resolvedData = await payload.findGlobal({
          slug: globalSlug,
          depth: 0,
          draft: true,
          fallbackLocale: null,
          locale,
          overrideAccess: false,
          user,
        })
      }

      data = resolvedData
    }

    promises.data = fetchData()
  }

  if (Object.keys(promises) && Object.keys(promises).length > 0) {
    await Promise.all(Object.values(promises))
  }

  const result = await buildStateFromSchema({
    id,
    collectionSlug,
    data,
    fieldSchema,
    operation,
    preferences: docPreferences || { fields: {} },
    req,
  })

  // Maintain form state of auth / upload fields
  if (collectionSlug && formState) {
    if (payload.collections[collectionSlug]?.config?.upload && formState.file) {
      result.file = formState.file
    }
  }

  if (returnLockStatus && user && (id || globalSlug)) {
    let lockedDocumentQuery

    if (collectionSlug) {
      lockedDocumentQuery = {
        and: [
          { 'document.relationTo': { equals: collectionSlug } },
          { 'document.value': { equals: id } },
        ],
      }
    } else if (globalSlug) {
      lockedDocumentQuery = {
        globalSlug: { equals: globalSlug },
      }
    }

    if (lockedDocumentQuery) {
      const lockedDocument = await payload.find({
        collection: 'payload-locked-documents',
        depth: 1,
        limit: 1,
        pagination: false,
        where: lockedDocumentQuery,
      })

      if (lockedDocument.docs && lockedDocument.docs.length > 0) {
        const lockedState = {
          isLocked: true,
          user: lockedDocument.docs[0]?.user?.value,
        }

        if (updateLastEdited) {
          await payload.db.updateOne({
            id: lockedDocument.docs[0].id,
            collection: 'payload-locked-documents',
            data: {},
            req,
          })
        }

        return { lockedState, state: result }
      } else {
        // If no lock document exists, create it
        await payload.db.create({
          collection: 'payload-locked-documents',
          data: {
            document: collectionSlug
              ? {
                  relationTo: [collectionSlug],
                  value: id,
                }
              : undefined,
            globalSlug: globalSlug ? globalSlug : undefined,
            user: {
              relationTo: [user.collection],
              value: user.id,
            },
          },
          req,
        })

        const lockedState = {
          isLocked: true,
          user,
        }

        return { lockedState, state: result }
      }
    }
  }

  return { state: result }
}