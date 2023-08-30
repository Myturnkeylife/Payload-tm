import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useModal } from '@faceless-ui/modal';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { DocumentDrawerProps } from './types.js';
import DefaultEdit from '../../views/collections/Edit/Default.js';
import X from '../../icons/X/index.js';
import { Fields } from '../../forms/Form/types.js';
import buildStateFromSchema from '../../forms/Form/buildStateFromSchema/index.js';
import { getTranslation } from '../../../../utilities/getTranslation.js';
import Button from '../Button/index.js';
import { useConfig } from '../../utilities/Config/index.js';
import { useLocale } from '../../utilities/Locale/index.js';
import { useAuth } from '../../utilities/Auth/index.js';
import { DocumentInfoProvider, useDocumentInfo } from '../../utilities/DocumentInfo/index.js';
import RenderCustomComponent from '../../utilities/RenderCustomComponent/index.js';
import usePayloadAPI from '../../../hooks/usePayloadAPI.js';
import formatFields from '../../views/collections/Edit/formatFields.js';
import { useRelatedCollections } from '../../forms/field-types/Relationship/AddNew/useRelatedCollections.js';
import IDLabel from '../IDLabel/index.js';
import { baseClass } from './index.js';
import { CollectionPermission } from '../../../../auth/types.js';

const Content: React.FC<DocumentDrawerProps> = ({
  collectionSlug,
  drawerSlug,
  customHeader,
  onSave,
}) => {
  const { serverURL, routes: { api } } = useConfig();
  const { toggleModal, modalState, closeModal } = useModal();
  const { code: locale } = useLocale();
  const { permissions, user } = useAuth();
  const [internalState, setInternalState] = useState<Fields>();
  const { t, i18n } = useTranslation(['fields', 'general']);
  const hasInitializedState = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [collectionConfig] = useRelatedCollections(collectionSlug);
  const { docPermissions, id, getDocPreferences } = useDocumentInfo();

  const [fields, setFields] = useState(() => formatFields(collectionConfig, true));

  // no need to an additional requests when creating new documents
  const initialID = useRef(id);
  const [{ data, isLoading: isLoadingDocument, isError }] = usePayloadAPI(
    (initialID.current ? `${serverURL}${api}/${collectionSlug}/${initialID.current}` : null),
    { initialParams: { 'fallback-locale': 'null', depth: 0, draft: 'true' } },
  );

  useEffect(() => {
    setFields(formatFields(collectionConfig, true));
  }, [collectionSlug, collectionConfig]);

  useEffect(() => {
    if (isLoadingDocument || hasInitializedState.current) {
      return;
    }

    const awaitInitialState = async () => {
      const preferences = await getDocPreferences();
      const state = await buildStateFromSchema({
        fieldSchema: fields,
        preferences,
        data,
        user,
        operation: id ? 'update' : 'create',
        id,
        locale,
        t: t as any,
      });
      setInternalState(state);
    };

    awaitInitialState();
    hasInitializedState.current = true;
  }, [data, fields, id, user, locale, isLoadingDocument, t, getDocPreferences]);

  useEffect(() => {
    setIsOpen(Boolean(modalState[drawerSlug]?.isOpen));
  }, [modalState, drawerSlug]);

  useEffect(() => {
    if (isOpen && !isLoadingDocument && isError) {
      closeModal(drawerSlug);
      toast.error(data.errors?.[0].message || t('error:unspecific'));
    }
  }, [isError, t, isOpen, data, drawerSlug, closeModal, isLoadingDocument]);

  if (isError) return null;

  const isEditing = Boolean(id);
  const apiURL = id ? `${serverURL}${api}/${collectionSlug}/${id}?locale=${locale}` : null;
  const action = `${serverURL}${api}/${collectionSlug}${id ? `/${id}` : ''}?locale=${locale}&depth=0&fallback-locale=null`;
  const hasSavePermission = (isEditing && docPermissions?.update?.permission) || (!isEditing && (docPermissions as CollectionPermission)?.create?.permission);
  const isLoading = !internalState || !docPermissions || isLoadingDocument;

  return (
    <RenderCustomComponent
      DefaultComponent={DefaultEdit}
      CustomComponent={collectionConfig.admin?.components?.views?.Edit}
      componentProps={{
        isLoading,
        data,
        id,
        collection: collectionConfig,
        permissions: permissions.collections[collectionConfig.slug],
        isEditing,
        apiURL,
        onSave,
        internalState,
        hasSavePermission,
        action,
        disableEyebrow: true,
        disableActions: true,
        me: true,
        disableLeaveWithoutSaving: true,
        customHeader: (
          <div className={`${baseClass}__header`}>
            <div className={`${baseClass}__header-content`}>
              <h2 className={`${baseClass}__header-text`}>
                {!customHeader ? t(!id ? 'fields:addNewLabel' : 'general:editLabel', { label: getTranslation(collectionConfig.labels.singular, i18n) }) : customHeader}
              </h2>
              <Button
                buttonStyle="none"
                className={`${baseClass}__header-close`}
                onClick={() => toggleModal(drawerSlug)}
                aria-label={t('general:close')}
              >
                <X />
              </Button>
            </div>
            {id && (
              <IDLabel id={id.toString()} />
            )}
          </div>
        ),
      }}
    />
  );
};

// First provide the document context using `DocumentInfoProvider`
// this is so we can utilize the `useDocumentInfo` hook in the `Content` component
// this drawer is used for both creating and editing documents
// this means that the `id` may be unknown until the document is created
export const DocumentDrawerContent: React.FC<DocumentDrawerProps> = (props) => {
  const { collectionSlug, id: idFromProps, onSave: onSaveFromProps } = props;
  const [collectionConfig] = useRelatedCollections(collectionSlug);
  const [id, setId] = useState<string | null>(idFromProps);

  const onSave = useCallback<DocumentDrawerProps['onSave']>((args) => {
    setId(args.doc.id);

    if (typeof onSaveFromProps === 'function') {
      onSaveFromProps({
        ...args,
        collectionConfig,
      });
    }
  }, [onSaveFromProps, collectionConfig]);

  return (
    <DocumentInfoProvider
      collection={collectionConfig}
      id={id}
    >
      <Content
        {...props}
        onSave={onSave}
      />
    </DocumentInfoProvider>
  );
};
