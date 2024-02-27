import type { TFunction } from '@payloadcms/translations'

import type { User } from 'payload/auth'
import type { Field as FieldSchema, Data, DocumentPreferences } from 'payload/types'
import type { FormState } from '../../Form/types'

import { iterateFields } from './iterateFields'
import { Locale } from 'payload/config'

type Args = {
  data?: Data
  fieldSchema: FieldSchema[] | undefined
  id?: number | string
  locale: Locale['code']
  operation?: 'create' | 'update'
  preferences: {
    [key: string]: unknown
  }
  siblingData?: Data
  t: TFunction
  user?: User | null
}

export type BuildFormStateArgs = {
  id?: string | number
  operation?: 'create' | 'update'
  docPreferences: DocumentPreferences
  formState?: FormState
  data?: Data
  schemaPath: string
}

const buildStateFromSchema = async (args: Args): Promise<FormState> => {
  const { id, data: fullData = {}, fieldSchema, locale, operation, preferences, t, user } = args

  if (fieldSchema) {
    const state: FormState = {}

    await iterateFields({
      id,
      data: fullData,
      fields: fieldSchema,
      fullData,
      locale,
      operation,
      parentPassesCondition: true,
      path: '',
      preferences,
      state,
      t,
      user,
      errorPaths: new Set(),
    })

    return state
  }

  return {}
}

export default buildStateFromSchema
