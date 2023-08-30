import React, { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { components as SelectComponents, SingleValueProps } from 'react-select';
import { useDocumentDrawer } from '../../../../../elements/DocumentDrawer/index.js';
import Tooltip from '../../../../../elements/Tooltip/index.js';
import Edit from '../../../../../icons/Edit/index.js';
import { useAuth } from '../../../../../utilities/Auth/index.js';
import { Option } from '../../types.js';
import './index.scss';

const baseClass = 'relationship--single-value';

export const SingleValue: React.FC<SingleValueProps<Option>> = (props) => {
  const {
    data: {
      value,
      relationTo,
      label,
    },
    children,
    selectProps: {
      // @ts-ignore // TODO: Fix types
      customProps: {
        // @ts-ignore // TODO: Fix types
        setDrawerIsOpen,
        // @ts-ignore // TODO: Fix types
        onSave,
      } = {},
    } = {},
  } = props;

  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useTranslation('general');
  const { permissions } = useAuth();
  const hasReadPermission = Boolean(permissions?.collections?.[relationTo]?.read?.permission);

  const [DocumentDrawer, DocumentDrawerToggler, { isDrawerOpen }] = useDocumentDrawer({
    id: value.toString(),
    collectionSlug: relationTo,
  });

  useEffect(() => {
    if (typeof setDrawerIsOpen === 'function') {
      setDrawerIsOpen(isDrawerOpen);
    }
  }, [isDrawerOpen, setDrawerIsOpen]);

  return (
    <SelectComponents.SingleValue
      {...props}
      className={baseClass}
    >
      <div className={`${baseClass}__label`}>
        <div className={`${baseClass}__label-text`}>
          <div className={`${baseClass}__text`}>
            {children}
          </div>
          {relationTo && hasReadPermission && (
            <Fragment>
              <DocumentDrawerToggler
                className={`${baseClass}__drawer-toggler`}
                aria-label={t('editLabel', { label })}
                onTouchEnd={(e) => e.stopPropagation()} // prevents react-select dropdown from opening
                onMouseDown={(e) => e.stopPropagation()} // prevents react-select dropdown from opening
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(false)}
              >
                <Tooltip
                  className={`${baseClass}__tooltip`}
                  show={showTooltip}
                >
                  {t('edit')}
                </Tooltip>
                <Edit />
              </DocumentDrawerToggler>
            </Fragment>
          )}
        </div>
      </div>
      {relationTo && hasReadPermission && (
        <DocumentDrawer onSave={onSave} />
      )}
    </SelectComponents.SingleValue>
  );
};
