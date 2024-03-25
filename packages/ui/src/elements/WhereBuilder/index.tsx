import { getTranslation } from '@payloadcms/translations'
import { FieldLabel } from '@payloadcms/ui/forms/FieldLabel'
import { useComponentMap } from '@payloadcms/ui/providers/ComponentMap'
import React, { useState } from 'react'

import type {
  CollectionComponentMap,
  FieldMap,
} from '../../providers/ComponentMap/buildComponentMap/types.js'
import type { WhereBuilderProps } from './types.js'

import { useListQuery } from '../../providers/ListQuery/index.js'
import { useSearchParams } from '../../providers/SearchParams/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { Button } from '../Button/index.js'
import { Condition } from './Condition/index.js'
import fieldTypes from './field-types.js'
import './index.scss'
import { transformWhereQuery } from './transformWhereQuery.js'
import validateWhereQuery from './validateWhereQuery.js'

const baseClass = 'where-builder'

const reduceFields = (fieldMap: FieldMap, i18n) =>
  fieldMap.reduce((reduced, field) => {
    if (typeof fieldTypes[field.type] === 'object') {
      const operatorKeys = new Set()
      const operators = fieldTypes[field.type].operators.reduce((acc, operator) => {
        if (!operatorKeys.has(operator.value)) {
          operatorKeys.add(operator.value)
          return [
            ...acc,
            {
              ...operator,
              label: i18n.t(`operators:${operator.label}`),
            },
          ]
        }
        return acc
      }, [])

      const formattedField = {
        label: (
          <FieldLabel
            CustomLabel={field.fieldComponentProps.CustomLabel}
            {...field.fieldComponentProps.labelProps}
          />
        ),
        value: field.name,
        ...fieldTypes[field.type],
        operators,
        props: {
          ...field,
        },
      }

      return [...reduced, formattedField]
    }

    return reduced
  }, [])

export { WhereBuilderProps }

/**
 * The WhereBuilder component is used to render the filter controls for a collection's list view.
 * It is part of the {@link ListControls} component which is used to render the controls (search, filter, where).
 */
export const WhereBuilder: React.FC<WhereBuilderProps> = (props) => {
  const { collectionPluralLabel, collectionSlug } = props
  const { i18n, t } = useTranslation()
  const { getComponentMap } = useComponentMap()

  const { fieldMap } = getComponentMap({ collectionSlug }) as CollectionComponentMap
  const [reducedFields] = useState(() => reduceFields(fieldMap, i18n))

  const { searchParams } = useSearchParams()
  const { handleWhereChange } = useListQuery()
  const [shouldUpdateQuery, setShouldUpdateQuery] = React.useState(false)

  // This handles initializing the where conditions from the search query (URL). That way, if you pass in
  // query params to the URL, the where conditions will be initialized from those and displayed in the UI.
  // Example: /admin/collections/posts?where[or][0][and][0][text][equals]=example%20post
  /*
    stored conditions look like this:
    [
      _or_ & _and_ queries have the same shape:
      {
        and: [{
          category: {
            equals: 'category-a'
          }
        }]
      },

      {
        and:[{
          category: {
            equals: 'category-b'
          },
          text: {
            not_equals: 'oranges'
          },
        }]
      }
    ]
  */
  const [conditions, setConditions] = React.useState(() => {
    const whereFromSearch = searchParams.where
    if (whereFromSearch) {
      if (validateWhereQuery(whereFromSearch)) {
        return whereFromSearch.or
      }

      // Transform the where query to be in the right format. This will transform something simple like [text][equals]=example%20post to the right format
      const transformedWhere = transformWhereQuery(whereFromSearch)

      if (validateWhereQuery(transformedWhere)) {
        return transformedWhere.or
      }

      console.warn(`Invalid where query in URL: ${JSON.stringify(whereFromSearch)}`)
    }

    return []
  })

  const addCondition = React.useCallback(({ andIndex, fieldName, orIndex, relation }) => {
    setConditions((prevConditions) => {
      const newConditions = [...prevConditions]
      if (relation === 'and') {
        newConditions[orIndex].and.splice(andIndex, 0, { [fieldName]: {} })
      } else {
        newConditions.push({
          and: [
            {
              [fieldName]: {},
            },
          ],
        })
      }

      return newConditions
    })
  }, [])

  const updateCondition = React.useCallback(
    ({ andIndex, fieldName: fieldNameArg, operator: operatorArg, orIndex, value: valueArg }) => {
      setConditions((prevConditions) => {
        const newConditions = [...prevConditions]
        if (typeof newConditions[orIndex].and[andIndex] === 'object') {
          const [existingFieldName, existingCondition] = Object.entries(
            newConditions[orIndex].and[andIndex],
          )?.[0] || [fieldNameArg, operatorArg]
          const fieldName = existingFieldName || fieldNameArg
          const operator = operatorArg || Object.keys(existingCondition)?.[0] || undefined
          const value = valueArg ?? (operator ? newConditions[orIndex].and[andIndex][operator] : '')

          if (fieldName) {
            newConditions[orIndex].and[andIndex] = {
              [fieldName]: operator ? { [operator]: value } : {},
            }
          }

          if (fieldName && operator && ![null, undefined].includes(value)) {
            setShouldUpdateQuery(true)
          }
        }

        return newConditions
      })
    },
    [],
  )

  const removeCondition = React.useCallback(({ andIndex, orIndex }) => {
    setConditions((prevConditions) => {
      const newConditions = [...prevConditions]
      newConditions[orIndex].and.splice(andIndex, 1)

      if (newConditions[orIndex].and.length === 0) {
        newConditions.splice(orIndex, 1)
      }

      return newConditions
    })
    setShouldUpdateQuery(true)
  }, [])

  React.useEffect(() => {
    if (shouldUpdateQuery) {
      handleWhereChange({ or: conditions })
      setShouldUpdateQuery(false)
    }
  }, [conditions, handleWhereChange, shouldUpdateQuery])

  return (
    <div className={baseClass}>
      {conditions.length > 0 && (
        <React.Fragment>
          <div className={`${baseClass}__label`}>
            {t('general:filterWhere', { label: getTranslation(collectionPluralLabel, i18n) })}
          </div>
          <ul className={`${baseClass}__or-filters`}>
            {conditions.map((or, orIndex) => (
              <li key={orIndex}>
                {orIndex !== 0 && <div className={`${baseClass}__label`}>{t('general:or')}</div>}
                <ul className={`${baseClass}__and-filters`}>
                  {Array.isArray(or?.and) &&
                    or.and.map((_, andIndex) => {
                      const fieldName = Object.keys(conditions[orIndex].and[andIndex])[0]
                      const operator =
                        Object.keys(conditions[orIndex].and[andIndex]?.[fieldName] || {})?.[0] ||
                        undefined
                      const initialValue =
                        conditions[orIndex].and[andIndex]?.[fieldName]?.[operator] || ''

                      return (
                        <li key={andIndex}>
                          {andIndex !== 0 && (
                            <div className={`${baseClass}__label`}>{t('general:and')}</div>
                          )}
                          <Condition
                            addCondition={addCondition}
                            andIndex={andIndex}
                            fieldName={fieldName}
                            fields={reducedFields}
                            initialValue={initialValue}
                            key={andIndex}
                            operator={operator}
                            orIndex={orIndex}
                            removeCondition={removeCondition}
                            updateCondition={updateCondition}
                          />
                        </li>
                      )
                    })}
                </ul>
              </li>
            ))}
          </ul>
          <Button
            buttonStyle="icon-label"
            className={`${baseClass}__add-or`}
            icon="plus"
            iconPosition="left"
            iconStyle="with-border"
            onClick={() => {
              addCondition({
                andIndex: 0,
                fieldName: reducedFields[0].value,
                orIndex: conditions.length,
                relation: 'or',
              })
            }}
          >
            {t('general:or')}
          </Button>
        </React.Fragment>
      )}
      {conditions.length === 0 && (
        <div className={`${baseClass}__no-filters`}>
          <div className={`${baseClass}__label`}>{t('general:noFiltersSet')}</div>
          <Button
            buttonStyle="icon-label"
            className={`${baseClass}__add-first-filter`}
            icon="plus"
            iconPosition="left"
            iconStyle="with-border"
            onClick={() => {
              if (reducedFields.length > 0) {
                addCondition({
                  andIndex: 0,
                  fieldName: reducedFields[0].value,
                  orIndex: conditions.length,
                  relation: 'or',
                })
              }
            }}
          >
            {t('general:addFilter')}
          </Button>
        </div>
      )}
    </div>
  )
}
