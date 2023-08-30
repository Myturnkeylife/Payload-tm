import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RenderFields from '../../RenderFields/index.js';
import withCondition from '../../withCondition/index.js';
import { Props } from './types.js';
import { tabHasName } from '../../../../../fields/config/types.js';
import type { Tab } from '../../../../../fields/config/types.js';
import FieldDescription from '../../FieldDescription/index.js';
import toKebabCase from '../../../../../utilities/toKebabCase.js';
import { useCollapsible } from '../../../elements/Collapsible/provider.js';
import { TabsProvider } from './provider.js';
import { getTranslation } from '../../../../../utilities/getTranslation.js';
import { usePreferences } from '../../../utilities/Preferences/index.js';
import { DocumentPreferences } from '../../../../../preferences/types.js';
import { useDocumentInfo } from '../../../utilities/DocumentInfo/index.js';
import { createNestedFieldPath } from '../../Form/createNestedFieldPath.js';
import { WatchChildErrors } from '../../WatchChildErrors/index.js';
import { ErrorPill } from '../../../elements/ErrorPill/index.js';
import { useFormSubmitted } from '../../Form/context.js';

import './index.scss';

const baseClass = 'tabs-field';

type TabProps = {
  isActive?: boolean;
  setIsActive: () => void;
  tab: Tab;
  parentPath: string
}
const Tab: React.FC<TabProps> = ({ tab, isActive, setIsActive, parentPath }) => {
  const { i18n } = useTranslation();
  const [errorCount, setErrorCount] = useState(undefined);
  const hasName = tabHasName(tab);
  const submitted = useFormSubmitted();

  const pathSegments = [];
  if (parentPath) pathSegments.push(parentPath);
  if (hasName) pathSegments.push(tab.name);
  const path = pathSegments.join('.');
  const tabHasErrors = submitted && errorCount > 0;

  return (
    <React.Fragment>
      <WatchChildErrors
        setErrorCount={setErrorCount}
        path={path}
        fieldSchema={hasName ? undefined : tab.fields}
      />
      <button
        type="button"
        className={[
          `${baseClass}__tab-button`,
          tabHasErrors && `${baseClass}__tab-button--has-error`,
          isActive && `${baseClass}__tab-button--active`,
        ].filter(Boolean).join(' ')}
        onClick={setIsActive}
      >
        {tab.label ? getTranslation(tab.label, i18n) : (hasName && tab.name)}
        {tabHasErrors && (
          <ErrorPill count={errorCount} />
        )}
      </button>
    </React.Fragment>
  );
};

const TabsField: React.FC<Props> = (props) => {
  const {
    tabs,
    fieldTypes,
    path,
    permissions,
    indexPath,
    admin: {
      readOnly,
      className,
    },
  } = props;

  const { getPreference, setPreference } = usePreferences();
  const { preferencesKey } = useDocumentInfo();
  const { i18n } = useTranslation();

  const isWithinCollapsible = useCollapsible();
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const tabsPrefKey = `tabs-${indexPath}`;

  useEffect(() => {
    const getInitialPref = async () => {
      const existingPreferences: DocumentPreferences = await getPreference(preferencesKey);
      const initialIndex = path ? existingPreferences?.fields?.[path]?.tabIndex : existingPreferences?.fields?.[tabsPrefKey]?.tabIndex;
      setActiveTabIndex(initialIndex || 0);
    };
    getInitialPref();
  }, [path, indexPath, getPreference, preferencesKey, tabsPrefKey]);

  const handleTabChange = useCallback(async (incomingTabIndex: number) => {
    setActiveTabIndex(incomingTabIndex);

    const existingPreferences: DocumentPreferences = await getPreference(preferencesKey);

    setPreference(preferencesKey, {
      ...existingPreferences,
      ...path ? {
        fields: {
          ...existingPreferences?.fields || {},
          [path]: {
            ...existingPreferences?.fields?.[path],
            tabIndex: incomingTabIndex,
          },
        },
      } : {
        fields: {
          ...existingPreferences?.fields,
          [tabsPrefKey]: {
            ...existingPreferences?.fields?.[tabsPrefKey],
            tabIndex: incomingTabIndex,
          },
        },
      },
    });
  }, [preferencesKey, getPreference, setPreference, path, tabsPrefKey]);

  const activeTabConfig = tabs[activeTabIndex];

  return (
    <div className={[
      className,
      baseClass,
      isWithinCollapsible && `${baseClass}--within-collapsible`,
    ].filter(Boolean).join(' ')}
    >
      <TabsProvider>
        <div className={`${baseClass}__tabs-wrap`}>
          <div className={`${baseClass}__tabs`}>
            {tabs.map((tab, tabIndex) => {
              return (
                <Tab
                  key={tabIndex}
                  setIsActive={() => handleTabChange(tabIndex)}
                  isActive={activeTabIndex === tabIndex}
                  parentPath={path}
                  tab={tab}
                />
              );
            })}
          </div>
        </div>
        <div className={`${baseClass}__content-wrap`}>
          {activeTabConfig && (
            <React.Fragment>
              <div
                className={[
                  `${baseClass}__tab`,
                  activeTabConfig.label && `${baseClass}__tab-${toKebabCase(getTranslation(activeTabConfig.label, i18n))}`,
                ].filter(Boolean).join(' ')}
              >
                <FieldDescription
                  className={`${baseClass}__description`}
                  description={activeTabConfig.description}
                />
                <RenderFields
                  key={String(activeTabConfig.label)}
                  forceRender
                  readOnly={readOnly}
                  permissions={tabHasName(activeTabConfig) ? permissions[activeTabConfig.name].fields : permissions}
                  fieldTypes={fieldTypes}
                  fieldSchema={activeTabConfig.fields.map((field) => {
                    const pathSegments = [];

                    if (path) pathSegments.push(path);
                    if (tabHasName(activeTabConfig)) pathSegments.push(activeTabConfig.name);

                    return {
                      ...field,
                      path: createNestedFieldPath(pathSegments.join('.'), field),
                    };
                  })}
                  indexPath={indexPath}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </TabsProvider>
    </div>
  );
};

export default withCondition(TabsField);
