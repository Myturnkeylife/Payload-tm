import React from 'react';
import { Props } from './types.js';

import Chevron from '../../../icons/Chevron/index.js';

import './index.scss';

const baseClass = 'clickable-arrow';

const ClickableArrow: React.FC<Props> = (props) => {
  const {
    updatePage,
    isDisabled = false,
    direction = 'right',
  } = props;

  const classes = [
    baseClass,
    isDisabled && `${baseClass}--is-disabled`,
    direction && `${baseClass}--${direction}`,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={isDisabled}
      onClick={!isDisabled ? updatePage : undefined}
      type="button"
    >
      <Chevron />
    </button>
  );
};

export default ClickableArrow;
