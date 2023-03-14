/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    posts: Post;
    restricted: Restricted;
    'read-only-collection': ReadOnlyCollection;
    'restricted-versions': RestrictedVersion;
    'sibling-data': SiblingDatum;
    'rely-on-request-headers': RelyOnRequestHeader;
    'doc-level-access': DocLevelAccess;
    'hidden-fields': HiddenField;
  };
  globals: {};
}
export interface User {
  id: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
}
export interface Post {
  id: string;
  restrictedField?: string;
  group?: {
    restrictedGroupText?: string;
  };
  restrictedRowText?: string;
  restrictedCollapsibleText?: string;
  createdAt: string;
  updatedAt: string;
}
export interface Restricted {
  id: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
export interface ReadOnlyCollection {
  id: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
export interface RestrictedVersion {
  id: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
export interface SiblingDatum {
  id: string;
  array?: {
    allowPublicReadability?: boolean;
    text?: string;
    id?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
export interface RelyOnRequestHeader {
  id: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}
export interface DocLevelAccess {
  id: string;
  approvedForRemoval?: boolean;
  approvedTitle?: string;
  lockTitle?: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface HiddenField {
  id: string;
  title?: string;
  partiallyHidden?: {
    name?: string;
    value?: string;
    id?: string;
  }[];
  createdAt: string;
  updatedAt: string;
}
