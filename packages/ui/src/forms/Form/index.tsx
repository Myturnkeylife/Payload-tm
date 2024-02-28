'use client'
import type { Field } from 'payload/types'

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import isDeepEqual from 'deep-equal'
import { useRouter } from 'next/navigation'
import { serialize } from 'object-to-formdata'
import { wait } from 'payload/utilities'
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import type {
  Context as FormContextType,
  FormState,
  GetDataByPath,
  Props,
  SubmitOptions,
} from './types'

import useDebounce from '../../hooks/useDebounce'
import { useDebouncedEffect } from '../../hooks/useDebouncedEffect'
import useThrottledEffect from '../../hooks/useThrottledEffect'
import { useAuth } from '../../providers/Auth'
import { useConfig } from '../../providers/Config'
import { useDocumentInfo } from '../../providers/DocumentInfo'
import { useLocale } from '../../providers/Locale'
import { useOperation } from '../../providers/OperationProvider'
import { useTranslation } from '../../providers/Translation'
import { requests } from '../../utilities/api'
import {
  FormContext,
  FormFieldsContext,
  FormWatchContext,
  ModifiedContext,
  ProcessingContext,
  SubmittedContext,
} from './context'
import errorMessages from './errorMessages'
import { fieldReducer } from './fieldReducer'
import getDataByPathFunc from './getDataByPath'
import getSiblingDataFunc from './getSiblingData'
import initContextState from './initContextState'
import { mergeServerFormState } from './mergeServerFormState'
import reduceFieldsToValues from './reduceFieldsToValues'

const baseClass = 'form'

const Form: React.FC<Props> = (props) => {
  const { id, getDocPreferences } = useDocumentInfo()

  const {
    action,
    children,
    className,
    disableSuccessStatus,
    disabled,
    // fields: fieldsFromProps = collection?.fields || global?.fields,
    beforeSubmit,
    handleResponse,
    initialState, // fully formed initial field state
    onChange,
    onSubmit,
    onSuccess,
    redirect,
    submitted: submittedFromProps,
    waitForAutocomplete,
  } = props

  const method = 'method' in props ? props.method : undefined

  const { push } = useRouter()

  const { code: locale } = useLocale()
  const { i18n, t } = useTranslation()
  const { refreshCookie, user } = useAuth()
  const operation = useOperation()

  const config = useConfig()

  const [modified, setModified] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const contextRef = useRef({} as FormContextType)

  const fieldsReducer = useReducer(fieldReducer, {}, () => initialState)
  /**
   * `fields` is the current, up-to-date state/data of all fields in the form. It can be modified by using dispatchFields,
   * which calls the fieldReducer, which then updates the state.
   */
  const [fields, dispatchFields] = fieldsReducer

  const prevFormState = useRef<FormState>(null)

  contextRef.current.fields = fields

  const validateForm = useCallback(async () => {
    const validatedFieldState = {}
    let isValid = true

    const dataFromContext = contextRef.current.getData()
    const data = dataFromContext

    const validationPromises = Object.entries(contextRef.current.fields).map(
      async ([path, field]) => {
        const validatedField = {
          ...field,
          valid: true,
        }

        if (field.passesCondition !== false) {
          let validationResult: boolean | string = true

          if (typeof field.validate === 'function') {
            let valueToValidate = field.value

            if (field?.rows && Array.isArray(field.rows)) {
              valueToValidate = contextRef.current.getDataByPath(path)
            }

            validationResult = await field.validate(valueToValidate, {
              id,
              config,
              data,
              operation,
              siblingData: contextRef.current.getSiblingData(path),
              t,
              user,
            })
          }

          if (typeof validationResult === 'string') {
            validatedField.errorMessage = validationResult
            validatedField.valid = false
            isValid = false
          }
        }

        validatedFieldState[path] = validatedField
      },
    )

    await Promise.all(validationPromises)

    if (!isDeepEqual(contextRef.current.fields, validatedFieldState)) {
      dispatchFields({ type: 'REPLACE_STATE', state: validatedFieldState })
    }

    return isValid
  }, [id, user, operation, t, dispatchFields, config])

  const submit = useCallback(
    async (options: SubmitOptions = {}, e): Promise<void> => {
      const {
        action: actionToUse = action,
        method: methodToUse = method,
        overrides = {},
        skipValidation,
      } = options

      if (disabled) {
        if (e) {
          e.preventDefault()
        }
        return
      }

      if (e) {
        e.stopPropagation()
        e.preventDefault()
      }

      setProcessing(true)
      setSubmitted(true)

      if (waitForAutocomplete) await wait(100)

      // Execute server side validations
      if (Array.isArray(beforeSubmit)) {
        let revalidatedFormState: FormState

        await beforeSubmit.reduce(async (priorOnChange, beforeSubmitFn) => {
          await priorOnChange

          const result = await beforeSubmitFn({
            formState: fields,
          })

          revalidatedFormState = result
        }, Promise.resolve())

        const isValid = Object.entries(revalidatedFormState).every(([, field]) => field.valid)

        if (!isValid) {
          setProcessing(false)
          return dispatchFields({ type: 'REPLACE_STATE', state: revalidatedFormState })
        }
      }

      const isValid = skipValidation ? true : await contextRef.current.validateForm()

      // If not valid, prevent submission
      if (!isValid) {
        toast.error(t('error:correctInvalidFields'))
        setProcessing(false)

        return
      }

      // If submit handler comes through via props, run that
      if (onSubmit) {
        const data = {
          ...reduceFieldsToValues(fields, true),
          ...overrides,
        }

        onSubmit(fields, data)
      }

      const formData = contextRef.current.createFormData(overrides)

      try {
        let res

        if (typeof actionToUse === 'string') {
          res = await requests[methodToUse.toLowerCase()](actionToUse, {
            body: formData,
            headers: {
              'Accept-Language': i18n.language,
            },
          })
        } else if (typeof actionToUse === 'function') {
          res = await actionToUse(formData)
        }

        setModified(false)

        if (typeof handleResponse === 'function') {
          handleResponse(res)
          return
        }

        setProcessing(false)

        const contentType = res.headers.get('content-type')
        const isJSON = contentType && contentType.indexOf('application/json') !== -1

        let json: any = {}

        if (isJSON) json = await res.json()

        if (res.status < 400) {
          setSubmitted(false)

          if (typeof onSuccess === 'function') onSuccess(json)

          if (redirect) {
            // const destination = {
            //   pathname: redirect,
            //   state: {},
            // }

            // if (typeof json === 'object' && json.message && !disableSuccessStatus) {
            //   destination.state = {
            //     status: [
            //       {
            //         message: json.message,
            //         type: 'success',
            //       },
            //     ],
            //   }
            // }

            push(redirect)
          } else if (!disableSuccessStatus) {
            toast.success(json.message || t('general:submissionSuccessful'), { autoClose: 3000 })
          }
        } else {
          contextRef.current = { ...contextRef.current } // triggers rerender of all components that subscribe to form
          if (json.message) {
            toast.error(json.message)

            return
          }

          if (Array.isArray(json.errors)) {
            const [fieldErrors, nonFieldErrors] = json.errors.reduce(
              ([fieldErrs, nonFieldErrs], err) => {
                const newFieldErrs = []
                const newNonFieldErrs = []

                if (err?.message) {
                  newNonFieldErrs.push(err)
                }

                if (Array.isArray(err?.data)) {
                  err.data.forEach((dataError) => {
                    if (dataError?.field) {
                      newFieldErrs.push(dataError)
                    } else {
                      newNonFieldErrs.push(dataError)
                    }
                  })
                }

                return [
                  [...fieldErrs, ...newFieldErrs],
                  [...nonFieldErrs, ...newNonFieldErrs],
                ]
              },
              [[], []],
            )

            fieldErrors.forEach((err) => {
              dispatchFields({
                type: 'UPDATE',
                ...(contextRef.current?.fields?.[err.field] || {}),
                errorMessage: err.message,
                path: err.field,
                valid: false,
              })
            })

            nonFieldErrors.forEach((err) => {
              toast.error(err.message || t('error:unknown'))
            })

            return
          }

          const message = errorMessages?.[res.status] || res?.statusText || t('error:unknown')

          toast.error(message)
        }
      } catch (err) {
        setProcessing(false)

        toast.error(err)
      }
    },
    [
      action,
      disableSuccessStatus,
      disabled,
      dispatchFields,
      fields,
      handleResponse,
      method,
      onSubmit,
      onSuccess,
      redirect,
      push,
      t,
      i18n,
      waitForAutocomplete,
      beforeSubmit,
    ],
  )

  const getFields = useCallback(() => contextRef.current.fields, [])

  const getField = useCallback((path: string) => contextRef.current.fields[path], [])

  const getData = useCallback(() => reduceFieldsToValues(contextRef.current.fields, true), [])

  const getSiblingData = useCallback(
    (path: string) => getSiblingDataFunc(contextRef.current.fields, path),
    [],
  )
  const getDataByPath = useCallback<GetDataByPath>(
    (path: string) => getDataByPathFunc(contextRef.current.fields, path),
    [],
  )

  const createFormData = useCallback((overrides: any = {}) => {
    const data = reduceFieldsToValues(contextRef.current.fields, true)

    const file = data?.file

    if (file) {
      delete data.file
    }

    const dataWithOverrides = {
      ...data,
      ...overrides,
    }

    const dataToSerialize = {
      _payload: JSON.stringify(dataWithOverrides),
      file,
    }

    // nullAsUndefineds is important to allow uploads and relationship fields to clear themselves
    const formData = serialize(dataToSerialize, { indices: true, nullsAsUndefineds: false })

    return formData
  }, [])

  const reset = useCallback(
    async (fieldSchema: Field[], data: unknown) => {
      const preferences = await getDocPreferences()
      // const state = await buildStateFromSchema({
      //   id,
      //   // TODO: fix this
      //   // @ts-ignore-next-line
      //   config,
      //   data,
      //   fieldSchema,
      //   locale,
      //   operation,
      //   preferences,
      //   t,
      //   user,
      // })
      contextRef.current = { ...initContextState } as FormContextType
      setModified(false)
      // dispatchFields({ state, type: 'REPLACE_STATE' })
    },
    [getDocPreferences],
  )

  const replaceState = useCallback(
    (state: FormState) => {
      contextRef.current = { ...initContextState } as FormContextType
      setModified(false)
      dispatchFields({ type: 'REPLACE_STATE', state })
    },
    [dispatchFields],
  )

  contextRef.current.submit = submit
  contextRef.current.getFields = getFields
  contextRef.current.getField = getField
  contextRef.current.getData = getData
  contextRef.current.getSiblingData = getSiblingData
  contextRef.current.getDataByPath = getDataByPath
  contextRef.current.validateForm = validateForm
  contextRef.current.createFormData = createFormData
  contextRef.current.setModified = setModified
  contextRef.current.setProcessing = setProcessing
  contextRef.current.setSubmitted = setSubmitted
  contextRef.current.disabled = disabled
  contextRef.current.formRef = formRef
  contextRef.current.reset = reset
  contextRef.current.replaceState = replaceState
  contextRef.current.dispatchFields = dispatchFields

  useEffect(() => {
    if (typeof submittedFromProps === 'boolean') setSubmitted(submittedFromProps)
  }, [submittedFromProps])

  useEffect(() => {
    if (initialState) {
      contextRef.current = { ...initContextState } as FormContextType
      dispatchFields({ type: 'REPLACE_STATE', state: initialState })
    }
  }, [initialState, dispatchFields])

  useThrottledEffect(
    () => {
      refreshCookie()
    },
    15000,
    [fields],
  )

  useEffect(() => {
    contextRef.current = { ...contextRef.current } // triggers rerender of all components that subscribe to form
    setModified(false)
  }, [locale])

  const classes = [className, baseClass].filter(Boolean).join(' ')

  useDebouncedEffect(
    () => {
      const executeOnChange = async () => {
        if (Array.isArray(onChange)) {
          let revalidatedFormState: FormState

          await onChange.reduce(async (priorOnChange, onChangeFn) => {
            await priorOnChange

            const result = await onChangeFn({
              formState: fields,
            })

            revalidatedFormState = result
          }, Promise.resolve())

          const { changed, newState } = mergeServerFormState(fields, revalidatedFormState)

          if (changed) {
            dispatchFields({ type: 'REPLACE_STATE', optimize: false, state: newState })
          }
        }
      }

      executeOnChange() // eslint-disable-line @typescript-eslint/no-floating-promises
    },
    150,
    [fields, dispatchFields, onChange],
  )

  return (
    <form
      action={action}
      className={classes}
      method={method}
      noValidate
      onSubmit={(e) => contextRef.current.submit({}, e)}
      ref={formRef}
    >
      <FormContext.Provider value={contextRef.current}>
        <FormWatchContext.Provider
          value={{
            fields,
            ...contextRef.current,
          }}
        >
          <SubmittedContext.Provider value={submitted}>
            <ProcessingContext.Provider value={processing}>
              <ModifiedContext.Provider value={modified}>
                <FormFieldsContext.Provider value={fieldsReducer}>
                  {children}
                </FormFieldsContext.Provider>
              </ModifiedContext.Provider>
            </ProcessingContext.Provider>
          </SubmittedContext.Provider>
        </FormWatchContext.Provider>
      </FormContext.Provider>
    </form>
  )
}

export default Form
