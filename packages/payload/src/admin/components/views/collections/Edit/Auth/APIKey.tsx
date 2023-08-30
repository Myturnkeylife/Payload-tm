import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import { text } from '../../../../../../fields/validations.js';
import CopyToClipboard from '../../../../elements/CopyToClipboard/index.js';
import GenerateConfirmation from '../../../../elements/GenerateConfirmation/index.js';
import { useFormFields } from '../../../../forms/Form/context.js';
import Label from '../../../../forms/Label/index.js';
import useField from '../../../../forms/useField/index.js';

const path = 'apiKey';
const baseClass = 'api-key';

const APIKey: React.FC<{readOnly?: boolean}> = ({ readOnly }) => {
  const [initialAPIKey, setInitialAPIKey] = useState(null);
  const [highlightedField, setHighlightedField] = useState(false);
  const { t } = useTranslation();

  const apiKey = useFormFields(([fields]) => fields[path]);
  const validate = (val) => text(val, { data: {}, maxLength: 48, minLength: 24, siblingData: {}, t });

  const apiKeyValue = apiKey?.value;

  const APIKeyLabel = useMemo(() => (
    <div className={`${baseClass}__label`}>
      <span>
        API Key
      </span>
      <CopyToClipboard value={apiKeyValue as string} />
    </div>
  ), [apiKeyValue]);

  const fieldType = useField({
    path: 'apiKey',
    validate,
  });

  const highlightField = () => {
    if (highlightedField) {
      setHighlightedField(false);
    }
    setTimeout(() => {
      setHighlightedField(true);
    }, 1);
  };

  const {
    setValue,
    value,
  } = fieldType;

  useEffect(() => {
    setInitialAPIKey(uuidv4());
  }, []);

  useEffect(() => {
    if (!apiKeyValue) {
      setValue(initialAPIKey);
    }
  }, [apiKeyValue, setValue, initialAPIKey]);

  useEffect(() => {
    if (highlightedField) {
      setTimeout(() => {
        setHighlightedField(false);
      }, 10000);
    }
  }, [highlightedField]);

  const classes = [
    'field-type',
    'api-key',
    'read-only',
  ].filter(Boolean).join(' ');

  return (
    <React.Fragment>
      <div className={classes}>
        <Label
          htmlFor={path}
          label={APIKeyLabel}
        />
        <input
          className={highlightedField ? 'highlight' : undefined}
          disabled
          id="apiKey"
          name="apiKey"
          type="text"
          value={value as string || ''}
        />
      </div>
      {!readOnly && (
        <GenerateConfirmation
          highlightField={highlightField}
          setKey={() => setValue(uuidv4())}
        />
      )}
    </React.Fragment>
  );
};

export default APIKey;
