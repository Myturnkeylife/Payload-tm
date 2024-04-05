'use client'
import { useCallback, useMemo, useRef } from 'react'

import type { UPDATE } from '../Form/types.js'
import type { FieldType, Options } from './types.js'

export type { FieldType, Options }

import useThrottledEffect from '../../hooks/useThrottledEffect.js'
import { useAuth } from '../../providers/Auth/index.js'
import { useConfig } from '../../providers/Config/index.js'
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js'
import { useOperation } from '../../providers/Operation/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { useFieldProps } from '../FieldPropsProvider/index.js'
import {
  useForm,
  useFormFields,
  useFormModified,
  useFormProcessing,
  useFormSubmitted,
} from '../Form/context.js'

/**
 * Get and set the value of a form field.
 *
 * @see https://payloadcms.com/docs/admin/hooks#usefield
 */
export const useField = <T,>(options: Options): FieldType<T> => {
  const { disableFormData = false, hasRows, validate } = options

  const { path: pathFromContext, permissions, readOnly, schemaPath } = useFieldProps()

  // Prioritize passed in path over context path. If the context path should be prioritized (which is the case for top-level useField calls in fields), it should be passed in as the options path.
  const path = options.path || pathFromContext

  const submitted = useFormSubmitted()
  const processing = useFormProcessing()
  const { user } = useAuth()
  const { id } = useDocumentInfo()
  const operation = useOperation()

  const { dispatchField, field } = useFormFields(([fields, dispatch]) => ({
    dispatchField: dispatch,
    field: (fields && fields?.[path]) || null,
  }))

  const { t } = useTranslation()
  const config = useConfig()

  const { getData, getDataByPath, getSiblingData, setModified } = useForm()
  const modified = useFormModified()

  const filterOptions = field?.filterOptions
  const value = field?.value as T
  const initialValue = field?.initialValue as T
  const valid = typeof field?.valid === 'boolean' ? field.valid : true
  const showError = valid === false && submitted

  const prevValid = useRef(valid)

  // Method to return from `useField`, used to
  // update field values from field component(s)
  const setValue = useCallback(
    (e, disableModifyingForm = false) => {
      const val = e && e.target ? e.target.value : e

      dispatchField({
        type: 'UPDATE',
        disableFormData: disableFormData || (hasRows && val > 0),
        path,
        value: val,
      })

      if (!disableModifyingForm) {
        if (typeof setModified === 'function') {
          // Only update setModified to true if the form is not already set to modified. Otherwise the following could happen:
          // 1. Text field: someone types in it in an unmodified form
          // 2. After setTimeout triggers setModified(true): form is set to modified. Save Button becomes available. Good!
          // 3. Type something in text field
          // 4. Click on save button before setTimeout in useField has finished (so setModified(true) has not been run yet)
          // 5. Form is saved, setModified(false) is set in the Form/index.tsx `submit` function, "saved successfully" toast appears
          // 6. setModified(true) inside the timeout is run, form is set to modified again, even though it was already saved and thus set to unmodified. Bad! This should have happened before the form is saved. Now the form should be unmodified and stay that way
          //    until a NEW change happens. Due to this, the "Leave without saving" modal appears even though it should not when leaving the page fast immediately after saving the document.
          // This is only an issue for forms which have already been set to modified true, as that causes the save button to be enabled. If we prevent this setTimeout to be run
          // for already-modified forms first place (which is unnecessary), we can avoid this issue. As for unmodified forms, this race issue will not happen, because you cannot click the save button faster
          // than the timeout in useField is run. That's because the save button won't even be enabled for clicking until the setTimeout in useField has run.
          // This fixes e2e test flakes, as e2e tests were often so fast that they were saving the form before the timeout in useField has run.
          // Specifically, this fixes the 'should not warn about unsaved changes when navigating to lexical editor with blocks node and then leaving the page after making a change and saving' lexical e2e test.
          if (modified === false) {
            // Update modified state after field value comes back
            // to avoid cursor jump caused by state value / DOM mismatch
            setTimeout(() => {
              setModified(true)
            }, 10)
          }
        }
      }
    },
    [setModified, path, dispatchField, disableFormData, hasRows, modified],
  )

  // Store result from hook as ref
  // to prevent unnecessary rerenders
  const result: FieldType<T> = useMemo(
    () => ({
      errorMessage: field?.errorMessage,
      errorPaths: field?.errorPaths || [],
      filterOptions,
      formProcessing: processing,
      formSubmitted: submitted,
      initialValue,
      path,
      permissions,
      readOnly: readOnly || false,
      rows: field?.rows,
      schemaPath,
      setValue,
      showError,
      valid: field?.valid,
      value,
    }),
    [
      field?.errorMessage,
      field?.rows,
      field?.valid,
      field?.errorPaths,
      processing,
      setValue,
      showError,
      submitted,
      value,
      initialValue,
      path,
      schemaPath,
      readOnly,
      permissions,
      filterOptions,
    ],
  )

  // Throttle the validate function
  useThrottledEffect(
    () => {
      const validateField = async () => {
        let valueToValidate = value

        if (field?.rows && Array.isArray(field.rows)) {
          valueToValidate = getDataByPath(path)
        }

        let errorMessage: string | undefined
        let valid: boolean | string = prevValid.current

        const isValid =
          typeof validate === 'function'
            ? await validate(valueToValidate, {
                id,
                config,
                data: getData(),
                operation,
                siblingData: getSiblingData(path),
                t,
                user,
              })
            : true

        if (typeof isValid === 'string') {
          valid = false
          errorMessage = isValid
        } else if (typeof isValid === 'boolean') {
          valid = isValid
          errorMessage = undefined
        }

        // Only dispatch if the validation result has changed
        // This will prevent unnecessary rerenders
        if (valid !== prevValid.current) {
          prevValid.current = valid

          const update: UPDATE = {
            type: 'UPDATE',
            errorMessage,
            path,
            rows: field?.rows,
            valid,
            // validate,
            value,
          }

          if (disableFormData || (hasRows ? typeof value === 'number' && value > 0 : false)) {
            update.disableFormData = true
          }

          if (typeof dispatchField === 'function') {
            dispatchField(update)
          }
        }
      }

      void validateField()
    },
    150,
    [
      value,
      disableFormData,
      dispatchField,
      getData,
      getSiblingData,
      getDataByPath,
      id,
      operation,
      path,
      user,
      validate,
      field?.rows,
    ],
  )

  return result
}
