'use client'
import { useModal } from '@faceless-ui/modal'
import { getTranslation } from '@payloadcms/translations'
import React, { useCallback, useState } from 'react'

import type { FormState } from '../..'
import type { Props } from './types'

import { FieldPathProvider, getFormState, useComponentMap } from '../..'
import Form from '../../forms/Form'
import { useForm } from '../../forms/Form/context'
import RenderFields from '../../forms/RenderFields'
import FormSubmit from '../../forms/Submit'
import { X } from '../../icons/X'
import { useAuth } from '../../providers/Auth'
import { useConfig } from '../../providers/Config'
import { OperationContext } from '../../providers/OperationProvider'
import { useSearchParams } from '../../providers/SearchParams'
import { SelectAllStatus, useSelection } from '../../providers/SelectionProvider'
import { useTranslation } from '../../providers/Translation'
import { Drawer, DrawerToggler } from '../Drawer'
import { FieldSelect } from '../FieldSelect'
import './index.scss'

const baseClass = 'edit-many'

const Submit: React.FC<{ action: string; disabled: boolean }> = ({ action, disabled }) => {
  const { submit } = useForm()
  const { t } = useTranslation()

  const save = useCallback(() => {
    submit({
      action,
      method: 'PATCH',
      skipValidation: true,
    })
  }, [action, submit])

  return (
    <FormSubmit className={`${baseClass}__save`} disabled={disabled} onClick={save}>
      {t('general:save')}
    </FormSubmit>
  )
}
const Publish: React.FC<{ action: string; disabled: boolean }> = ({ action, disabled }) => {
  const { submit } = useForm()
  const { t } = useTranslation()

  const save = useCallback(() => {
    submit({
      action,
      method: 'PATCH',
      overrides: {
        _status: 'published',
      },
      skipValidation: true,
    })
  }, [action, submit])

  return (
    <FormSubmit className={`${baseClass}__publish`} disabled={disabled} onClick={save}>
      {t('version:publishChanges')}
    </FormSubmit>
  )
}
const SaveDraft: React.FC<{ action: string; disabled: boolean }> = ({ action, disabled }) => {
  const { submit } = useForm()
  const { t } = useTranslation()

  const save = useCallback(() => {
    submit({
      action,
      method: 'PATCH',
      overrides: {
        _status: 'draft',
      },
      skipValidation: true,
    })
  }, [action, submit])

  return (
    <FormSubmit className={`${baseClass}__draft`} disabled={disabled} onClick={save}>
      {t('version:saveDraft')}
    </FormSubmit>
  )
}
const EditMany: React.FC<Props> = (props) => {
  const { collection: { slug, fields, labels: { plural } } = {}, collection } = props

  const { permissions } = useAuth()
  const { closeModal } = useModal()
  const {
    routes: { api: apiRoute },
    serverURL,
  } = useConfig()
  const { count, getQueryParams, selectAll } = useSelection()
  const { i18n, t } = useTranslation()
  const [selected, setSelected] = useState([])
  const { dispatchSearchParams } = useSearchParams()
  const { componentMap } = useComponentMap()
  const [reducedFieldMap, setReducedFieldMap] = useState([])
  const [initialState, setInitialState] = useState<FormState>()
  const hasInitializedState = React.useRef(false)

  const collectionPermissions = permissions?.collections?.[slug]
  const hasUpdatePermission = collectionPermissions?.update?.permission

  const drawerSlug = `edit-${slug}`

  React.useEffect(() => {
    if (componentMap?.collections?.[slug]?.fieldMap) {
      const fieldMap = componentMap.collections[slug].fieldMap
      const reducedFieldMap = []
      fieldMap.map((field) => {
        selected.map((selectedField) => {
          if (field.name === selectedField.name) {
            reducedFieldMap.push(field)
          }
        })
      })
      setReducedFieldMap(reducedFieldMap)
    }
  }, [componentMap.collections, fields, slug, selected])

  React.useEffect(() => {
    if (!hasInitializedState.current) {
      const getInitialState = async () => {
        const result = await getFormState({
          apiRoute,
          body: {
            collectionSlug: slug,
            data: {},
            operation: 'update',
            schemaPath: slug,
          },
          serverURL,
        })

        setInitialState(result)
        hasInitializedState.current = true
      }

      void getInitialState()
    }
  }, [apiRoute, hasInitializedState, serverURL, slug])

  if (selectAll === SelectAllStatus.None || !hasUpdatePermission) {
    return null
  }

  const onSuccess = () => {
    dispatchSearchParams({
      type: 'set',
      browserHistory: 'replace',
      params: { page: selectAll === SelectAllStatus.AllAvailable ? '1' : undefined },
    })
  }

  return (
    <div className={baseClass}>
      <DrawerToggler
        aria-label={t('general:edit')}
        className={`${baseClass}__toggle`}
        onClick={() => {
          setSelected([])
        }}
        slug={drawerSlug}
      >
        {t('general:edit')}
      </DrawerToggler>
      <Drawer Header={null} slug={drawerSlug}>
        <OperationContext.Provider value="update">
          <div className={`${baseClass}__main`}>
            <div className={`${baseClass}__header`}>
              <h2 className={`${baseClass}__header__title`}>
                {t('general:editingLabel', { count, label: getTranslation(plural, i18n) })}
              </h2>
              <button
                aria-label={t('general:close')}
                className={`${baseClass}__header__close`}
                id={`close-drawer__${drawerSlug}`}
                onClick={() => closeModal(drawerSlug)}
                type="button"
              >
                <X />
              </button>
            </div>
            <FieldPathProvider path="" schemaPath={slug}>
              <Form
                className={`${baseClass}__form`}
                initialState={initialState}
                onSuccess={onSuccess}
              >
                <FieldSelect fields={fields} setSelected={setSelected} />
                {reducedFieldMap.length === 0 ? null : <RenderFields fieldMap={reducedFieldMap} />}
                <div className={`${baseClass}__sidebar-wrap`}>
                  <div className={`${baseClass}__sidebar`}>
                    <div className={`${baseClass}__sidebar-sticky-wrap`}>
                      <div className={`${baseClass}__document-actions`}>
                        {collection.versions ? (
                          <React.Fragment>
                            <Publish
                              action={`${serverURL}${apiRoute}/${slug}${getQueryParams()}`}
                              disabled={selected.length === 0}
                            />
                            <SaveDraft
                              action={`${serverURL}${apiRoute}/${slug}${getQueryParams()}`}
                              disabled={selected.length === 0}
                            />
                          </React.Fragment>
                        ) : (
                          <Submit
                            action={`${serverURL}${apiRoute}/${slug}${getQueryParams()}`}
                            disabled={selected.length === 0}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </FieldPathProvider>
          </div>
        </OperationContext.Provider>
      </Drawer>
    </div>
  )
}

export default EditMany
