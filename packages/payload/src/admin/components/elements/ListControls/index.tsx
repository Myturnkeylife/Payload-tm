import React, { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { useTranslation } from 'react-i18next';
import { useWindowInfo } from '@faceless-ui/window-info';
import { fieldAffectsData } from '../../../../fields/config/types.js';
import SearchFilter from '../SearchFilter/index.js';
import ColumnSelector from '../ColumnSelector/index.js';
import WhereBuilder from '../WhereBuilder/index.js';
import SortComplex from '../SortComplex/index.js';
import Button from '../Button/index.js';
import { Props } from './types.js';
import { useSearchParams } from '../../utilities/SearchParams/index.js';
import validateWhereQuery from '../WhereBuilder/validateWhereQuery.js';
import flattenFields from '../../../../utilities/flattenTopLevelFields.js';
import { getTextFieldsToBeSearched } from './getTextFieldsToBeSearched.js';
import { getTranslation } from '../../../../utilities/getTranslation.js';
import Pill from '../Pill/index.js';
import Chevron from '../../icons/Chevron/index.js';
import EditMany from '../EditMany/index.js';
import DeleteMany from '../DeleteMany/index.js';
import PublishMany from '../PublishMany/index.js';
import UnpublishMany from '../UnpublishMany/index.js';
import { SanitizedCollectionConfig } from '../../../../collections/config/types.js';

import './index.scss';

const baseClass = 'list-controls';

const getUseAsTitle = (collection: SanitizedCollectionConfig) => {
  const {
    admin: {
      useAsTitle,
    },
    fields,
  } = collection;

  const topLevelFields = flattenFields(fields);
  return topLevelFields.find((field) => fieldAffectsData(field) && field.name === useAsTitle);
};

/**
 * The ListControls component is used to render the controls (search, filter, where)
 * for a collection's list view. You can find those directly above the table which lists
 * the collection's documents.
 */
const ListControls: React.FC<Props> = (props) => {
  const {
    collection,
    enableColumns = true,
    enableSort = false,
    handleSortChange,
    handleWhereChange,
    modifySearchQuery = true,
    resetParams,
    collection: {
      fields,
      admin: {
        listSearchableFields,
      },
    },
  } = props;

  const params = useSearchParams();
  const shouldInitializeWhereOpened = validateWhereQuery(params?.where);

  const [titleField, setTitleField] = useState(getUseAsTitle(collection));
  useEffect(() => {
    setTitleField(getUseAsTitle(collection));
  }, [collection]);

  const [textFieldsToBeSearched] = useState(getTextFieldsToBeSearched(listSearchableFields, fields));
  const [visibleDrawer, setVisibleDrawer] = useState<'where' | 'sort' | 'columns'>(shouldInitializeWhereOpened ? 'where' : undefined);
  const { t, i18n } = useTranslation('general');
  const { breakpoints: { s: smallBreak } } = useWindowInfo();

  return (
    <div className={baseClass}>
      <div className={`${baseClass}__wrap`}>
        <SearchFilter
          fieldName={titleField && fieldAffectsData(titleField) ? titleField.name : undefined}
          handleChange={handleWhereChange}
          modifySearchQuery={modifySearchQuery}
          fieldLabel={(titleField && fieldAffectsData(titleField) && getTranslation(titleField.label || titleField.name, i18n)) ?? undefined}
          listSearchableFields={textFieldsToBeSearched}
        />
        <div className={`${baseClass}__buttons`}>
          <div className={`${baseClass}__buttons-wrap`}>
            { !smallBreak && (
              <React.Fragment>
                <EditMany
                  collection={collection}
                  resetParams={resetParams}
                />
                <PublishMany
                  collection={collection}
                  resetParams={resetParams}
                />
                <UnpublishMany
                  collection={collection}
                  resetParams={resetParams}
                />
                <DeleteMany
                  collection={collection}
                  resetParams={resetParams}
                />
              </React.Fragment>
            )}
            {enableColumns && (
              <Pill
                pillStyle="light"
                className={`${baseClass}__toggle-columns ${visibleDrawer === 'columns' ? `${baseClass}__buttons-active` : ''}`}
                onClick={() => setVisibleDrawer(visibleDrawer !== 'columns' ? 'columns' : undefined)}
                aria-expanded={visibleDrawer === 'columns'}
                aria-controls={`${baseClass}-columns`}
                icon={<Chevron />}
              >
                {t('columns')}
              </Pill>
            )}
            <Pill
              pillStyle="light"
              className={`${baseClass}__toggle-where ${visibleDrawer === 'where' ? `${baseClass}__buttons-active` : ''}`}
              onClick={() => setVisibleDrawer(visibleDrawer !== 'where' ? 'where' : undefined)}
              aria-expanded={visibleDrawer === 'where'}
              aria-controls={`${baseClass}-where`}
              icon={<Chevron />}
            >
              {t('filters')}
            </Pill>
            {enableSort && (
              <Button
                className={`${baseClass}__toggle-sort`}
                buttonStyle={visibleDrawer === 'sort' ? undefined : 'secondary'}
                onClick={() => setVisibleDrawer(visibleDrawer !== 'sort' ? 'sort' : undefined)}
                aria-expanded={visibleDrawer === 'sort'}
                aria-controls={`${baseClass}-sort`}
                icon="chevron"
                iconStyle="none"
              >
                {t('sort')}
              </Button>
            )}
          </div>
        </div>
      </div>
      {enableColumns && (
        <AnimateHeight
          className={`${baseClass}__columns`}
          height={visibleDrawer === 'columns' ? 'auto' : 0}
          id={`${baseClass}-columns`}
        >
          <ColumnSelector collection={collection} />
        </AnimateHeight>
      )}
      <AnimateHeight
        className={`${baseClass}__where`}
        height={visibleDrawer === 'where' ? 'auto' : 0}
        id={`${baseClass}-where`}
      >
        <WhereBuilder
          collection={collection}
          modifySearchQuery={modifySearchQuery}
          handleChange={handleWhereChange}
        />
      </AnimateHeight>
      {enableSort && (
        <AnimateHeight
          className={`${baseClass}__sort`}
          height={visibleDrawer === 'sort' ? 'auto' : 0}
          id={`${baseClass}-sort`}
        >
          <SortComplex
            modifySearchQuery={modifySearchQuery}
            collection={collection}
            handleChange={handleSortChange}
          />
        </AnimateHeight>
      )}
    </div>
  );
};

export default ListControls;
