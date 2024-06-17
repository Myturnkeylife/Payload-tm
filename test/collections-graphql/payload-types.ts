/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User
    point: Point
    posts: Post
    'custom-ids': CustomId
    relation: Relation
    dummy: Dummy
    'error-on-hooks': ErrorOnHook
    'payload-api-test-ones': PayloadApiTestOne
    'payload-api-test-twos': PayloadApiTestTwo
    'content-type': ContentType
    'cyclical-relationship': CyclicalRelationship
    media: Media
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  globals: {}
  locale: 'en' | 'es'
  user: User & {
    collection: 'users'
  }
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "point".
 */
export interface Point {
  id: string
  /**
   * @minItems 2
   * @maxItems 2
   */
  point?: [number, number] | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: string
  title?: string | null
  description?: string | null
  number?: number | null
  min?: number | null
  relationField?: (string | null) | Relation
  relationToCustomID?: (number | null) | CustomId
  relationHasManyField?: (string | Relation)[] | null
  relationMultiRelationTo?:
    | ({
        relationTo: 'relation'
        value: string | Relation
      } | null)
    | ({
        relationTo: 'dummy'
        value: string | Dummy
      } | null)
  relationMultiRelationToHasMany?:
    | (
        | {
            relationTo: 'relation'
            value: string | Relation
          }
        | {
            relationTo: 'dummy'
            value: string | Dummy
          }
      )[]
    | null
  A1?: {
    A2?: string | null
  }
  B1?: {
    B2?: string | null
  }
  C1?: {
    C2Text?: string | null
    C2?: {
      C3?: string | null
    }
  }
  D1?: {
    D2?: {
      D3?: {
        D4?: string | null
      }
    }
  }
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "relation".
 */
export interface Relation {
  id: string
  name?: string | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "custom-ids".
 */
export interface CustomId {
  id: number
  title?: string | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "dummy".
 */
export interface Dummy {
  id: string
  name?: string | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "error-on-hooks".
 */
export interface ErrorOnHook {
  id: string
  title?: string | null
  errorBeforeChange?: boolean | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-api-test-ones".
 */
export interface PayloadApiTestOne {
  id: string
  payloadAPI?: string | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-api-test-twos".
 */
export interface PayloadApiTestTwo {
  id: string
  payloadAPI?: string | null
  relation?: (string | null) | PayloadApiTestOne
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "content-type".
 */
export interface ContentType {
  id: string
  contentType?: string | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "cyclical-relationship".
 */
export interface CyclicalRelationship {
  id: string
  title?: string | null
  relationToSelf?: (string | null) | CyclicalRelationship
  media?: string | Media | null
  updatedAt: string
  createdAt: string
  _status?: ('draft' | 'published') | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string
  title?: string | null
  updatedAt: string
  createdAt: string
  url?: string | null
  thumbnailURL?: string | null
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

declare module 'payload' {
  // @ts-ignore
  export interface GeneratedTypes extends Config {}
}
