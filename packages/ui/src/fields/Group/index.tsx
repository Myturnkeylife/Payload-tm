'use client'
import type { FieldPermissions } from 'payload/auth'
import type { FieldBase } from 'payload/types'

import { getTranslation } from '@payloadcms/translations'
import { FieldDescription } from '@payloadcms/ui/forms/FieldDescription'
import React, { Fragment } from 'react'

import type { FieldMap } from '../../providers/ComponentMap/buildComponentMap/types.js'
import type { FormFieldBase } from '../shared/index.js'

import { useCollapsible } from '../../elements/Collapsible/provider.js'
import { ErrorPill } from '../../elements/ErrorPill/index.js'
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js'
import { RenderFields } from '../../forms/RenderFields/index.js'
import { WatchChildErrors } from '../../forms/WatchChildErrors/index.js'
import { withCondition } from '../../forms/withCondition/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { useRow } from '../Row/provider.js'
import { useTabs } from '../Tabs/provider.js'
import { fieldBaseClass } from '../shared/index.js'
import './index.scss'
import { GroupProvider, useGroup } from './provider.js'

const baseClass = 'group-field'

export type GroupFieldProps = FormFieldBase & {
  fieldMap: FieldMap
  forceRender?: boolean
  hideGutter?: boolean
  indexPath: string
  label?: FieldBase['label']
  name?: string
  permissions: FieldPermissions
  width?: string
}

const GroupField: React.FC<GroupFieldProps> = (props) => {
  const {
    CustomDescription,
    CustomLabel,
    className,
    descriptionProps,
    fieldMap,
    hideGutter,
    labelProps,
    style,
    width,
  } = props

  const { path, permissions, readOnly, schemaPath } = useFieldProps()
  const { i18n } = useTranslation()
  const isWithinCollapsible = useCollapsible()
  const isWithinGroup = useGroup()
  const isWithinRow = useRow()
  const isWithinTab = useTabs()
  const [errorCount, setErrorCount] = React.useState(undefined)
  const fieldHasErrors = errorCount > 0

  const isTopLevel = !(isWithinCollapsible || isWithinGroup || isWithinRow)

  return (
    <Fragment>
      <WatchChildErrors fieldMap={fieldMap} path={path} setErrorCount={setErrorCount} />
      <div
        className={[
          fieldBaseClass,
          baseClass,
          isTopLevel && `${baseClass}--top-level`,
          isWithinCollapsible && `${baseClass}--within-collapsible`,
          isWithinGroup && `${baseClass}--within-group`,
          isWithinRow && `${baseClass}--within-row`,
          isWithinTab && `${baseClass}--within-tab`,
          !hideGutter && isWithinGroup && `${baseClass}--gutter`,
          fieldHasErrors && `${baseClass}--has-error`,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        id={`field-${path?.replace(/\./g, '__')}`}
        style={{
          ...style,
          width,
        }}
      >
        <GroupProvider>
          <div className={`${baseClass}__wrap`}>
            <div className={`${baseClass}__header`}>
              {(CustomLabel || CustomDescription || labelProps?.label) && (
                <header>
                  {CustomLabel !== undefined ? (
                    CustomLabel
                  ) : labelProps?.label ? (
                    <h3 className={`${baseClass}__title`}>
                      {getTranslation(labelProps.label, i18n)}
                    </h3>
                  ) : null}
                  {CustomDescription !== undefined ? (
                    CustomDescription
                  ) : (
                    <FieldDescription {...(descriptionProps || {})} />
                  )}
                </header>
              )}
              {fieldHasErrors && <ErrorPill count={errorCount} i18n={i18n} withMessage />}
            </div>
            <RenderFields
              fieldMap={fieldMap}
              margins="small"
              path={path}
              permissions={permissions?.fields}
              readOnly={readOnly}
              schemaPath={schemaPath}
            />
          </div>
        </GroupProvider>
      </div>
    </Fragment>
  )
}

export { GroupProvider, useGroup }

export const Group = withCondition(GroupField)
