/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    posts: Post;
    point: Point;
    relation: Relation;
    dummy: Dummy;
    'custom-id': CustomId;
    'custom-id-number': CustomIdNumber;
    drafts: Draft;
    'error-on-hooks': ErrorOnHook;
    endpoints: Endpoint;
    users: User;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    posts: PostsSelect<false> | PostsSelect<true>;
    point: PointSelect<false> | PointSelect<true>;
    relation: RelationSelect<false> | RelationSelect<true>;
    dummy: DummySelect<false> | DummySelect<true>;
    'custom-id': CustomIdSelect<false> | CustomIdSelect<true>;
    'custom-id-number': CustomIdNumberSelect<false> | CustomIdNumberSelect<true>;
    drafts: DraftsSelect<false> | DraftsSelect<true>;
    'error-on-hooks': ErrorOnHooksSelect<false> | ErrorOnHooksSelect<true>;
    endpoints: EndpointsSelect<false> | EndpointsSelect<true>;
    users: UsersSelect<false> | UsersSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: string;
  title?: string | null;
  description?: string | null;
  number?: number | null;
  fakeLocalization?: string | null;
  relationField?: (string | null) | Relation;
  relationHasManyField?: (string | Relation)[] | null;
  relationMultiRelationTo?:
    | ({
        relationTo: 'relation';
        value: string | Relation;
      } | null)
    | ({
        relationTo: 'dummy';
        value: string | Dummy;
      } | null);
  relationMultiRelationToHasMany?:
    | (
        | {
            relationTo: 'relation';
            value: string | Relation;
          }
        | {
            relationTo: 'dummy';
            value: string | Dummy;
          }
      )[]
    | null;
  restrictedField?: string | null;
  D1?: {
    D2?: {
      D3?: {
        D4?: string | null;
      };
    };
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "relation".
 */
export interface Relation {
  id: string;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "dummy".
 */
export interface Dummy {
  id: string;
  title?: string | null;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "point".
 */
export interface Point {
  id: string;
  /**
   * @minItems 2
   * @maxItems 2
   */
  point?: [number, number] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "custom-id".
 */
export interface CustomId {
  id: string;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "custom-id-number".
 */
export interface CustomIdNumber {
  id: number;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "drafts".
 */
export interface Draft {
  id: string;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "error-on-hooks".
 */
export interface ErrorOnHook {
  id: string;
  text?: string | null;
  errorBeforeChange?: boolean | null;
  errorAfterDelete?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "endpoints".
 */
export interface Endpoint {
  id: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'posts';
        value: string | Post;
      } | null)
    | ({
        relationTo: 'point';
        value: string | Point;
      } | null)
    | ({
        relationTo: 'relation';
        value: string | Relation;
      } | null)
    | ({
        relationTo: 'dummy';
        value: string | Dummy;
      } | null)
    | ({
        relationTo: 'custom-id';
        value: string | CustomId;
      } | null)
    | ({
        relationTo: 'custom-id-number';
        value: number | CustomIdNumber;
      } | null)
    | ({
        relationTo: 'drafts';
        value: string | Draft;
      } | null)
    | ({
        relationTo: 'error-on-hooks';
        value: string | ErrorOnHook;
      } | null)
    | ({
        relationTo: 'endpoints';
        value: string | Endpoint;
      } | null)
    | ({
        relationTo: 'users';
        value: string | User;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts_select".
 */
export interface PostsSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  number?: T;
  fakeLocalization?: T;
  relationField?: T;
  relationHasManyField?: T;
  relationMultiRelationTo?: T;
  relationMultiRelationToHasMany?: T;
  restrictedField?: T;
  D1?:
    | T
    | {
        D2?:
          | T
          | {
              D3?:
                | T
                | {
                    D4?: T;
                  };
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "point_select".
 */
export interface PointSelect<T extends boolean = true> {
  point?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "relation_select".
 */
export interface RelationSelect<T extends boolean = true> {
  name?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "dummy_select".
 */
export interface DummySelect<T extends boolean = true> {
  title?: T;
  name?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "custom-id_select".
 */
export interface CustomIdSelect<T extends boolean = true> {
  id?: T;
  name?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "custom-id-number_select".
 */
export interface CustomIdNumberSelect<T extends boolean = true> {
  id?: T;
  name?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "drafts_select".
 */
export interface DraftsSelect<T extends boolean = true> {
  name?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "error-on-hooks_select".
 */
export interface ErrorOnHooksSelect<T extends boolean = true> {
  text?: T;
  errorBeforeChange?: T;
  errorAfterDelete?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "endpoints_select".
 */
export interface EndpointsSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  // @ts-ignore 
  export interface GeneratedTypes extends Config {}
}