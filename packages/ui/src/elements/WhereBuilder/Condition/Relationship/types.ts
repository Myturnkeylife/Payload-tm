import type { I18nClient } from '@payloadcms/translations'
import type { PaginatedDocs } from 'payload/database'
import type { ClientCollectionConfig, RelationshipField } from 'payload/types'

export type Props = {
  disabled?: boolean
  onChange: (val: unknown) => void
  value: unknown
} & RelationshipField

export type Option = {
  label: string
  options?: Option[]
  relationTo?: string
  value: string
}

type CLEAR = {
  i18n: I18nClient
  required: boolean
  type: 'CLEAR'
}

type ADD = {
  collection: ClientCollectionConfig
  data: PaginatedDocs<any>
  hasMultipleRelations: boolean
  i18n: I18nClient
  relation: string
  type: 'ADD'
}

export type Action = ADD | CLEAR

export type ValueWithRelation = {
  relationTo: string
  value: string
}

export type GetResults = (args: {
  lastFullyLoadedRelation?: number
  lastLoadedPage?: number
  search?: string
}) => Promise<void>
