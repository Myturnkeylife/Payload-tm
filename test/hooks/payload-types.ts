/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    'hooks-users': HooksUserAuthOperations;
  };
  collections: {
    'before-validate': BeforeValidate;
    afterOperation: AfterOperation;
    'context-hooks': ContextHook;
    transforms: Transform;
    hooks: Hook;
    'nested-after-read-hooks': NestedAfterReadHook;
    'chaining-hooks': ChainingHook;
    relations: Relation;
    'hooks-users': HooksUser;
    'data-hooks': DataHook;
    'infinity-loop': InfinityLoop;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    'before-validate': BeforeValidateSelect<false> | BeforeValidateSelect<true>;
    afterOperation: AfterOperationSelect<false> | AfterOperationSelect<true>;
    'context-hooks': ContextHooksSelect<false> | ContextHooksSelect<true>;
    transforms: TransformsSelect<false> | TransformsSelect<true>;
    hooks: HooksSelect<false> | HooksSelect<true>;
    'nested-after-read-hooks': NestedAfterReadHooksSelect<false> | NestedAfterReadHooksSelect<true>;
    'chaining-hooks': ChainingHooksSelect<false> | ChainingHooksSelect<true>;
    relations: RelationsSelect<false> | RelationsSelect<true>;
    'hooks-users': HooksUsersSelect<false> | HooksUsersSelect<true>;
    'data-hooks': DataHooksSelect<false> | DataHooksSelect<true>;
    'infinity-loop': InfinityLoopSelect<false> | InfinityLoopSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    'data-hooks-global': DataHooksGlobal;
  };
  globalsSelect: {
    'data-hooks-global': DataHooksGlobalSelect<false> | DataHooksGlobalSelect<true>;
  };
  locale: null;
  user: HooksUser & {
    collection: 'hooks-users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface HooksUserAuthOperations {
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
 * via the `definition` "before-validate".
 */
export interface BeforeValidate {
  id: string;
  title?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "afterOperation".
 */
export interface AfterOperation {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "context-hooks".
 */
export interface ContextHook {
  id: string;
  value?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "transforms".
 */
export interface Transform {
  id: string;
  /**
   * @minItems 2
   * @maxItems 2
   */
  transform?: [number, number] | null;
  /**
   * @minItems 2
   * @maxItems 2
   */
  localizedTransform?: [number, number] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hooks".
 */
export interface Hook {
  id: string;
  fieldBeforeValidate?: boolean | null;
  fieldBeforeChange?: boolean | null;
  fieldAfterChange?: boolean | null;
  fieldAfterRead?: boolean | null;
  collectionBeforeValidate?: boolean | null;
  collectionBeforeChange?: boolean | null;
  collectionAfterChange?: boolean | null;
  collectionBeforeRead?: boolean | null;
  collectionAfterRead?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nested-after-read-hooks".
 */
export interface NestedAfterReadHook {
  id: string;
  text?: string | null;
  group?: {
    array?:
      | {
          input?: string | null;
          afterRead?: string | null;
          shouldPopulate?: (string | null) | Relation;
          id?: string | null;
        }[]
      | null;
    subGroup?: {
      afterRead?: string | null;
      shouldPopulate?: (string | null) | Relation;
    };
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "relations".
 */
export interface Relation {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "chaining-hooks".
 */
export interface ChainingHook {
  id: string;
  text?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hooks-users".
 */
export interface HooksUser {
  id: string;
  roles: ('admin' | 'user')[];
  afterLoginHook?: boolean | null;
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
 * via the `definition` "data-hooks".
 */
export interface DataHook {
  id: string;
  field_collectionAndField?: string | null;
  collection_beforeOperation_collection?: string | null;
  collection_beforeChange_collection?: string | null;
  collection_afterChange_collection?: string | null;
  collection_beforeRead_collection?: string | null;
  collection_afterRead_collection?: string | null;
  collection_afterOperation_collection?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "infinity-loop".
 */
export interface InfinityLoop {
  id: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'before-validate';
        value: string | BeforeValidate;
      } | null)
    | ({
        relationTo: 'afterOperation';
        value: string | AfterOperation;
      } | null)
    | ({
        relationTo: 'context-hooks';
        value: string | ContextHook;
      } | null)
    | ({
        relationTo: 'transforms';
        value: string | Transform;
      } | null)
    | ({
        relationTo: 'hooks';
        value: string | Hook;
      } | null)
    | ({
        relationTo: 'nested-after-read-hooks';
        value: string | NestedAfterReadHook;
      } | null)
    | ({
        relationTo: 'chaining-hooks';
        value: string | ChainingHook;
      } | null)
    | ({
        relationTo: 'relations';
        value: string | Relation;
      } | null)
    | ({
        relationTo: 'hooks-users';
        value: string | HooksUser;
      } | null)
    | ({
        relationTo: 'data-hooks';
        value: string | DataHook;
      } | null)
    | ({
        relationTo: 'infinity-loop';
        value: string | InfinityLoop;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'hooks-users';
    value: string | HooksUser;
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
    relationTo: 'hooks-users';
    value: string | HooksUser;
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
 * via the `definition` "before-validate_select".
 */
export interface BeforeValidateSelect<T extends boolean = true> {
  title?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "afterOperation_select".
 */
export interface AfterOperationSelect<T extends boolean = true> {
  title?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "context-hooks_select".
 */
export interface ContextHooksSelect<T extends boolean = true> {
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "transforms_select".
 */
export interface TransformsSelect<T extends boolean = true> {
  transform?: T;
  localizedTransform?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hooks_select".
 */
export interface HooksSelect<T extends boolean = true> {
  fieldBeforeValidate?: T;
  fieldBeforeChange?: T;
  fieldAfterChange?: T;
  fieldAfterRead?: T;
  collectionBeforeValidate?: T;
  collectionBeforeChange?: T;
  collectionAfterChange?: T;
  collectionBeforeRead?: T;
  collectionAfterRead?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nested-after-read-hooks_select".
 */
export interface NestedAfterReadHooksSelect<T extends boolean = true> {
  text?: T;
  group?:
    | T
    | {
        array?:
          | T
          | {
              input?: T;
              afterRead?: T;
              shouldPopulate?: T;
              id?: T;
            };
        subGroup?:
          | T
          | {
              afterRead?: T;
              shouldPopulate?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "chaining-hooks_select".
 */
export interface ChainingHooksSelect<T extends boolean = true> {
  text?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "relations_select".
 */
export interface RelationsSelect<T extends boolean = true> {
  title?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hooks-users_select".
 */
export interface HooksUsersSelect<T extends boolean = true> {
  roles?: T;
  afterLoginHook?: T;
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
 * via the `definition` "data-hooks_select".
 */
export interface DataHooksSelect<T extends boolean = true> {
  field_collectionAndField?: T;
  collection_beforeOperation_collection?: T;
  collection_beforeChange_collection?: T;
  collection_afterChange_collection?: T;
  collection_beforeRead_collection?: T;
  collection_afterRead_collection?: T;
  collection_afterOperation_collection?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "infinity-loop_select".
 */
export interface InfinityLoopSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
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
 * via the `definition` "data-hooks-global".
 */
export interface DataHooksGlobal {
  id: string;
  field_globalAndField?: string | null;
  global_beforeChange_global?: string | null;
  global_afterChange_global?: string | null;
  global_beforeRead_global?: string | null;
  global_afterRead_global?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "data-hooks-global_select".
 */
export interface DataHooksGlobalSelect<T extends boolean = true> {
  field_globalAndField?: T;
  global_beforeChange_global?: T;
  global_afterChange_global?: T;
  global_beforeRead_global?: T;
  global_afterRead_global?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
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