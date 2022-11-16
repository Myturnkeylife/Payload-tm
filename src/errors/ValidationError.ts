import httpStatus from 'http-status';
import type { i18n as Ii18n } from 'i18next';
import APIError from './APIError';

class ValidationError extends APIError {
  constructor(results: {message: string, field: string}[], i18n?: Ii18n) {
    const message = i18n ? i18n.t('error:followingFieldsInvalid', { count: results.length }) : `The following field${results.length === 1 ? ' is' : 's are'} invalid:`;
    super(
      `${message} ${results.map((f) => f.field).join(', ')}`,
      httpStatus.BAD_REQUEST,
      results,
    );
  }
}

export default ValidationError;
