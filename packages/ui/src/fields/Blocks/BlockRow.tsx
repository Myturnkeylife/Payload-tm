'use client'
import type { FieldPermissions, Labels, Row } from 'payload'

import { getTranslation } from '@payloadcms/translations'
import React from 'react'

import type { UseDraggableSortableReturn } from '../../elements/DraggableSortable/useDraggableSortable/types.js'
import type { ReducedBlock } from '../../providers/ComponentMap/buildComponentMap/types.js'

import { Collapsible } from '../../elements/Collapsible/index.js'
import { ErrorPill } from '../../elements/ErrorPill/index.js'
import { Pill } from '../../elements/Pill/index.js'
import { useFormSubmitted } from '../../forms/Form/context.js'
import { RenderFields } from '../../forms/RenderFields/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { RowActions } from './RowActions.js'
import { SectionTitle } from './SectionTitle/index.js'

const baseClass = 'blocks-field'

type BlockFieldProps = {
  addRow: (rowIndex: number, blockType: string) => Promise<void> | void
  block: ReducedBlock
  blocks: ReducedBlock[]
  duplicateRow: (rowIndex: number) => void
  errorCount: number
  forceRender?: boolean
  hasMaxRows?: boolean
  indexPath: string
  isSortable?: boolean
  labels: Labels
  moveRow: (fromIndex: number, toIndex: number) => void
  path: string
  permissions: FieldPermissions
  readOnly: boolean
  removeRow: (rowIndex: number) => void
  row: Row
  rowCount: number
  rowIndex: number
  schemaPath: string
  setCollapse: (id: string, collapsed: boolean) => void
} & UseDraggableSortableReturn

export const BlockRow: React.FC<BlockFieldProps> = ({
  addRow,
  attributes,
  block,
  blocks,
  duplicateRow,
  errorCount,
  forceRender,
  hasMaxRows,
  isSortable,
  labels,
  listeners,
  moveRow,
  path: parentPath,
  permissions,
  readOnly,
  removeRow,
  row,
  rowCount,
  rowIndex,
  schemaPath,
  setCollapse,
  setNodeRef,
  transform,
}) => {
  const path = `${parentPath}.${rowIndex}`
  const { i18n } = useTranslation()
  const hasSubmitted = useFormSubmitted()

  const fieldHasErrors = hasSubmitted && errorCount > 0

  const classNames = [
    `${baseClass}__row`,
    fieldHasErrors ? `${baseClass}__row--has-errors` : `${baseClass}__row--no-errors`,
  ]
    .filter(Boolean)
    .join(' ')

  const LabelComponent = block?.LabelComponent

  return (
    <div
      id={`${parentPath.split('.').join('-')}-row-${rowIndex}`}
      key={`${parentPath}-row-${rowIndex}`}
      ref={setNodeRef}
      style={{
        transform,
      }}
    >
      <Collapsible
        actions={
          !readOnly ? (
            <RowActions
              addRow={addRow}
              blockType={row.blockType}
              blocks={blocks}
              duplicateRow={duplicateRow}
              fieldMap={block.fieldMap}
              hasMaxRows={hasMaxRows}
              isSortable={isSortable}
              labels={labels}
              moveRow={moveRow}
              removeRow={removeRow}
              rowCount={rowCount}
              rowIndex={rowIndex}
            />
          ) : undefined
        }
        className={classNames}
        collapsibleStyle={fieldHasErrors ? 'error' : 'default'}
        dragHandleProps={
          isSortable
            ? {
                id: row.id,
                attributes,
                listeners,
              }
            : undefined
        }
        header={
          LabelComponent ? (
            <LabelComponent blockKind={'block'} formData={row} />
          ) : (
            <div className={`${baseClass}__block-header`}>
              <span className={`${baseClass}__block-number`}>
                {String(rowIndex + 1).padStart(2, '0')}
              </span>
              <Pill
                className={`${baseClass}__block-pill ${baseClass}__block-pill-${row.blockType}`}
                pillStyle="white"
              >
                {getTranslation(block.labels.singular, i18n)}
              </Pill>
              <SectionTitle path={`${path}.blockName`} readOnly={readOnly} />
              {fieldHasErrors && <ErrorPill count={errorCount} i18n={i18n} withMessage />}
            </div>
          )
        }
        isCollapsed={row.collapsed}
        key={row.id}
        onToggle={(collapsed) => setCollapse(row.id, collapsed)}
      >
        <RenderFields
          className={`${baseClass}__fields`}
          fieldMap={block.fieldMap}
          forceRender={forceRender}
          margins="small"
          path={path}
          permissions={permissions?.blocks?.[block.slug]?.fields}
          readOnly={readOnly}
          schemaPath={`${schemaPath}.${block.slug}`}
        />
      </Collapsible>
    </div>
  )
}
