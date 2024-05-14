/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    'error-fields': ErrorField;
    uploads: Upload;
    users: User;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "error-fields".
 */
export interface ErrorField {
  id: string;
  parentArray?:
    | {
        childArray: {
          childArrayText: string;
          id?: string | null;
        }[];
        id?: string | null;
      }[]
    | null;
  home: {
    tabText: string;
    text: string;
    array?:
      | {
          requiredArrayText: string;
          arrayText?: string | null;
          group: {
            text: string;
            number: number;
            date: string;
            checkbox: boolean;
          };
          code: string;
          json:
            | {
                [k: string]: unknown;
              }
            | unknown[]
            | string
            | number
            | boolean
            | null;
          email: string;
          /**
           * @minItems 2
           * @maxItems 2
           */
          point: [number, number];
          radio: 'mint' | 'dark_gray';
          relationship: string | User;
          richtext: {
            root: {
              type: string;
              children: {
                type: string;
                version: number;
                [k: string]: unknown;
              }[];
              direction: ('ltr' | 'rtl') | null;
              format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
              indent: number;
              version: number;
            };
            [k: string]: unknown;
          };
          select: 'mint' | 'dark_gray';
          upload: string | Upload;
          text: string;
          textarea: string;
          id?: string | null;
        }[]
      | null;
  };
  tabText: string;
  text: string;
  array?:
    | {
        requiredArrayText: string;
        arrayText?: string | null;
        group: {
          text: string;
          number: number;
          date: string;
          checkbox: boolean;
        };
        code: string;
        json:
          | {
              [k: string]: unknown;
            }
          | unknown[]
          | string
          | number
          | boolean
          | null;
        email: string;
        /**
         * @minItems 2
         * @maxItems 2
         */
        point: [number, number];
        radio: 'mint' | 'dark_gray';
        relationship: string | User;
        richtext: {
          root: {
            type: string;
            children: {
              type: string;
              version: number;
              [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
          };
          [k: string]: unknown;
        };
        select: 'mint' | 'dark_gray';
        upload: string | Upload;
        text: string;
        textarea: string;
        id?: string | null;
      }[]
    | null;
  layout?:
    | {
        tabText: string;
        text: string;
        array?:
          | {
              requiredArrayText: string;
              arrayText?: string | null;
              group: {
                text: string;
                number: number;
                date: string;
                checkbox: boolean;
              };
              code: string;
              json:
                | {
                    [k: string]: unknown;
                  }
                | unknown[]
                | string
                | number
                | boolean
                | null;
              email: string;
              /**
               * @minItems 2
               * @maxItems 2
               */
              point: [number, number];
              radio: 'mint' | 'dark_gray';
              relationship: string | User;
              richtext: {
                root: {
                  type: string;
                  children: {
                    type: string;
                    version: number;
                    [k: string]: unknown;
                  }[];
                  direction: ('ltr' | 'rtl') | null;
                  format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                  indent: number;
                  version: number;
                };
                [k: string]: unknown;
              };
              select: 'mint' | 'dark_gray';
              upload: string | Upload;
              text: string;
              textarea: string;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'block1';
      }[]
    | null;
  group: {
    text: string;
  };
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
 * via the `definition` "uploads".
 */
export interface Upload {
  id: string;
  text?: string | null;
  media?: string | Upload | null;
  richText?: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
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


declare module 'payload' {
  // @ts-ignore 
  export interface GeneratedTypes extends Config {}
}