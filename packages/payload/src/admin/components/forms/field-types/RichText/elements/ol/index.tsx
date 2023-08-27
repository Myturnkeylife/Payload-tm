import React from 'react';
import ListButton from '../ListButton.js';
import OLIcon from '../../../../../icons/OrderedList.js';

import './index.scss';

const OL = ({ attributes, children }) => (
  <ol
    className="rich-text-ol"
    {...attributes}
  >
    {children}
  </ol>
);

const ol = {
  Button: () => (
    <ListButton format="ol">
      <OLIcon />
    </ListButton>
  ),
  Element: OL,
};

export default ol;
