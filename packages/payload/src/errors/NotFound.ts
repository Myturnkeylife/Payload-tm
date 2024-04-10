import type { TFunction } from '@payloadcms/translations'

import { en } from '@payloadcms/translations/languages/en'
import httpStatus from 'http-status'

import APIError from './APIError.js'

class NotFound extends APIError {
  constructor(t?: TFunction) {
    super(t ? t('general:notFound') : en.translations.general.notFound, httpStatus.NOT_FOUND)
  }
}

export default NotFound
