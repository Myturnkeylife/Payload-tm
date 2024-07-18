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
    'api-keys': ApiKeyAuthOperations;
    'public-users': PublicUserAuthOperations;
  };
  collections: {
    users: User;
    'api-keys': ApiKey;
    'public-users': PublicUser;
    relationsCollection: RelationsCollection;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
  locale: null;
  user:
    | (User & {
        collection: 'users';
      })
    | (ApiKey & {
        collection: 'api-keys';
      })
    | (PublicUser & {
        collection: 'public-users';
      });
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
  };
  login: {
    password: string;
    email: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
}
export interface ApiKeyAuthOperations {
  forgotPassword: {
    email: string;
  };
  login: {
    password: string;
    email: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
}
export interface PublicUserAuthOperations {
  forgotPassword: {
    email: string;
  };
  login: {
    password: string;
    email: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  adminOnlyField?: string | null;
  roles: ('admin' | 'editor' | 'moderator' | 'user' | 'viewer')[];
  namedSaveToJWT?: string | null;
  group?: {
    liftedSaveToJWT?: string | null;
  };
  groupSaveToJWT?: {
    saveToJWTString?: string | null;
    saveToJWTFalse?: string | null;
  };
  saveToJWTTab?: {
    test?: string | null;
  };
  tabSaveToJWTString?: {
    includedByDefault?: string | null;
  };
  tabLiftedSaveToJWT?: string | null;
  unnamedTabSaveToJWTString?: string | null;
  unnamedTabSaveToJWTFalse?: string | null;
  custom?: string | null;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
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
 * via the `definition` "api-keys".
 */
export interface ApiKey {
  id: string;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "public-users".
 */
export interface PublicUser {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  _verified?: boolean | null;
  _verificationToken?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "relationsCollection".
 */
export interface RelationsCollection {
  id: string;
  rel?: (string | null) | User;
  text?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user:
    | {
        relationTo: 'users';
        value: string | User;
      }
    | {
        relationTo: 'api-keys';
        value: string | ApiKey;
      }
    | {
        relationTo: 'public-users';
        value: string | PublicUser;
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
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  // @ts-ignore
  export interface GeneratedTypes extends Config {}
}
