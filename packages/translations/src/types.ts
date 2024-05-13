import type { Locale } from 'date-fns'

import type { ClientTranslationKeys } from './clientKeys.js'
import type { enTranslations } from './languages/en.js'
import type { acceptedLanguages } from './utilities/languages.js'

type DateFNSKeys =
  | 'ar'
  | 'az'
  | 'bg'
  | 'cs'
  | 'de'
  | 'en-US'
  | 'es'
  | 'fa-IR'
  | 'fr'
  | 'hr'
  | 'hu'
  | 'it'
  | 'ja'
  | 'ko'
  | 'nb'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sv'
  | 'th'
  | 'tr'
  | 'uk'
  | 'vi'
  | 'zh-CN'
  | 'zh-TW'

export type Language<TDefaultTranslations = DefaultTranslationsObject> = {
  dateFNSKey: DateFNSKeys
  translations: TDefaultTranslations
}

export type AcceptedLanguages = (typeof acceptedLanguages)[number]

export type SupportedLanguages<TDefaultTranslations = DefaultTranslationsObject> = {
  [key in AcceptedLanguages]?: Language<TDefaultTranslations>
}

/**
 * Type utilities for converting between translation objects ( e.g. general: { createNew: 'Create New' } )  and translations keys ( e.g. general:createNew )
 */

export type NestedKeysUnSanitized<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends object
          ? `${K}:${NestedKeysUnSanitized<T[K]>}` | null
          : `${K}`
        : never
    }[keyof T]
  : ''

// Utility type to strip specific suffixes
export type StripCountVariants<TKey> = TKey extends
  | `${infer Base}_many`
  | `${infer Base}_one`
  | `${infer Base}_other`
  ? Base
  : TKey

export type NestedKeysStripped<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string
        ? T[K] extends object
          ? `${K}:${StripCountVariants<NestedKeysStripped<T[K]>>}` | null
          : `${StripCountVariants<K>}`
        : never
    }[keyof T]
  : ''

export type ReconstructObjectFromTranslationKeys<
  TPath extends string,
  TValue = string,
> = TPath extends `${infer First}:${infer Rest}`
  ? { [K in First]: ReconstructObjectFromTranslationKeys<Rest, TValue> }
  : { [K in TPath]: TValue }

/**
 * Default nested translations object
 */
export type DefaultTranslationsObject = typeof enTranslations

/**
 * All translation keys unSanitized. E.g. 'general:aboutToDeleteCount_many'
 */
export type DefaultTranslationKeysUnSanitized = NestedKeysUnSanitized<DefaultTranslationsObject>

/**
 * All translation keys sanitized. E.g. 'general:aboutToDeleteCount'
 */
export type DefaultTranslationKeys = NestedKeysStripped<DefaultTranslationsObject>

export type TFunction<TTranslationKeys = DefaultTranslationKeys> = (
  key: TTranslationKeys,
  options?: Record<string, any>,
) => string

export type I18n<
  TTranslations = DefaultTranslationsObject,
  TTranslationKeys = DefaultTranslationKeys,
> = {
  dateFNS: Locale
  /** Corresponding dateFNS key */
  dateFNSKey: DateFNSKeys
  /** The fallback language */
  fallbackLanguage: string
  /** The language of the request */
  language: string
  /** Translate function */
  t: TFunction<TTranslationKeys>
  translations: Language<TTranslations>['translations']
}

export type I18nOptions<TTranslations = DefaultTranslationsObject> = {
  fallbackLanguage?: AcceptedLanguages
  supportedLanguages?: SupportedLanguages
  translations?: Partial<{
    [key in AcceptedLanguages]?: Language<TTranslations>['translations']
  }>
}

export type InitTFunction<
  TTranslations = DefaultTranslationsObject,
  TTranslationKeys = DefaultTranslationKeys,
> = (args: {
  config: I18nOptions<TTranslations>
  language?: string
  translations: Language<TTranslations>['translations']
}) => {
  t: TFunction<TTranslationKeys>
  translations: Language<TTranslations>['translations']
}

export type InitI18n =
  | ((args: {
      config: I18nOptions<ReconstructObjectFromTranslationKeys<ClientTranslationKeys>>
      context: 'client'
      language: AcceptedLanguages
    }) => Promise<
      I18n<ReconstructObjectFromTranslationKeys<ClientTranslationKeys>, ClientTranslationKeys>
    >)
  | ((args: { config: I18nOptions; context: 'api'; language: AcceptedLanguages }) => Promise<I18n>)

export type LanguagePreference = {
  language: AcceptedLanguages
  quality?: number
}

export type I18nClient<AdditionalTranslations = {}, AdditionalKeys = ''> = I18n<
  AdditionalTranslations extends object
    ? ReconstructObjectFromTranslationKeys<ClientTranslationKeys> & AdditionalTranslations
    : ReconstructObjectFromTranslationKeys<ClientTranslationKeys>,
  AdditionalKeys extends number | string | symbol
    ? AdditionalKeys | ClientTranslationKeys
    : ClientTranslationKeys
>

export type I18nServer<AdditionalTranslations = {}, AdditionalKeys = ''> = I18n<
  AdditionalTranslations extends object
    ? DefaultTranslationsObject & AdditionalTranslations
    : DefaultTranslationsObject,
  AdditionalKeys extends number | string | symbol
    ? AdditionalKeys | DefaultTranslationKeys
    : DefaultTranslationKeys
>
