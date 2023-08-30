import React from 'react';
import { useTranslation } from 'react-i18next';
import { Props } from './types.js';
import { Collapsible } from '../../../elements/Collapsible/index.js';
import RenderFields from '../../RenderFields/index.js';
import SectionTitle from './SectionTitle/index.js';
import Pill from '../../../elements/Pill/index.js';
import HiddenInput from '../HiddenInput/index.js';
import { getTranslation } from '../../../../../utilities/getTranslation.js';
import { createNestedFieldPath } from '../../Form/createNestedFieldPath.js';
import { RowActions } from './RowActions.js';
import type { UseDraggableSortableReturn } from '../../../elements/DraggableSortable/useDraggableSortable/types.js';
import type { Row } from '../../Form/types.js';
import type { Block } from '../../../../../fields/config/types.js';
import { useFormSubmitted } from '../../Form/context.js';
import { ErrorPill } from '../../../elements/ErrorPill/index.js';

const baseClass = 'blocks-field';

type BlockFieldProps = UseDraggableSortableReturn & Pick<Props, 'path' | 'labels' | 'blocks' | 'fieldTypes' | 'indexPath' | 'permissions'> & {
  addRow: (rowIndex: number, blockType: string) => void
  duplicateRow: (rowIndex: number) => void
  removeRow: (rowIndex: number) => void
  moveRow: (fromIndex: number, toIndex: number) => void
  setCollapse: (id: string, collapsed: boolean) => void
  rowIndex: number
  row: Row
  readOnly: boolean
  rowCount: number
  blockToRender: Block
  hasMaxRows?: boolean
}
export const BlockRow: React.FC<BlockFieldProps> = ({
  path: parentPath,
  addRow,
  removeRow,
  moveRow,
  duplicateRow,
  setCollapse,
  transform,
  listeners,
  attributes,
  setNodeRef,
  row,
  rowIndex,
  rowCount,
  indexPath,
  readOnly,
  labels,
  fieldTypes,
  permissions,
  blocks,
  blockToRender,
  hasMaxRows,
}) => {
  const path = `${parentPath}.${rowIndex}`;
  const { i18n } = useTranslation();
  const hasSubmitted = useFormSubmitted();

  const childErrorPathsCount = row.childErrorPaths?.size;
  const fieldHasErrors = hasSubmitted && childErrorPathsCount > 0;

  const classNames = [
    `${baseClass}__row`,
    fieldHasErrors ? `${baseClass}__row--has-errors` : `${baseClass}__row--no-errors`,
  ].filter(Boolean).join(' ');

  return (
    <div
      key={`${parentPath}-row-${rowIndex}`}
      id={`${parentPath.split('.').join('-')}-row-${rowIndex}`}
      ref={setNodeRef}
      style={{
        transform,
      }}
    >
      <Collapsible
        collapsed={row.collapsed}
        onToggle={(collapsed) => setCollapse(row.id, collapsed)}
        className={classNames}
        collapsibleStyle={fieldHasErrors ? 'error' : 'default'}
        key={row.id}
        dragHandleProps={{
          id: row.id,
          attributes,
          listeners,
        }}
        header={(
          <div className={`${baseClass}__block-header`}>
            <span className={`${baseClass}__block-number`}>
              {String(rowIndex + 1).padStart(2, '0')}
            </span>
            <Pill
              pillStyle="white"
              className={`${baseClass}__block-pill ${baseClass}__block-pill-${row.blockType}`}
            >
              {getTranslation(blockToRender.labels.singular, i18n)}
            </Pill>
            <SectionTitle
              path={`${path}.blockName`}
              readOnly={readOnly}
            />
            {fieldHasErrors && (
              <ErrorPill
                count={childErrorPathsCount}
                withMessage
              />
            )}
          </div>
        )}
        actions={!readOnly ? (
          <RowActions
            addRow={addRow}
            removeRow={removeRow}
            moveRow={moveRow}
            duplicateRow={duplicateRow}
            rowCount={rowCount}
            rowIndex={rowIndex}
            blockType={row.blockType}
            blocks={blocks}
            labels={labels}
            hasMaxRows={hasMaxRows}
          />
        ) : undefined}
      >
        <HiddenInput
          name={`${path}.id`}
          value={row.id}
        />
        <RenderFields
          className={`${baseClass}__fields`}
          readOnly={readOnly}
          fieldTypes={fieldTypes}
          permissions={permissions?.blocks?.[row.blockType]?.fields}
          fieldSchema={blockToRender.fields.map((field) => ({
            ...field,
            path: createNestedFieldPath(path, field),
          }))}
          indexPath={indexPath}
        />
      </Collapsible>
    </div>
  );
};
