import type { Validate } from 'payload/types'

import type { Row } from '../Form/types'

export type Options = {
  disableFormData?: boolean
  hasRows?: boolean
  /**
   * If you do not provide a `path` or a `name`, this hook will look for one using the `useFieldPath` hook.
   **/
  path?: string
  validate?: Validate
}

export type FieldType<T> = {
  errorMessage?: string
  formProcessing: boolean
  formSubmitted: boolean
  initialValue?: T
  path: string
  rows?: Row[]
  schemaPath: string
  setValue: (val: unknown, disableModifyingForm?: boolean) => void
  showError: boolean
  valid?: boolean
  value: T
}
