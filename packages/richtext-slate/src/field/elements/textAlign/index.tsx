import React from 'react'

import type { RichTextCustomElement } from '../../..'

import AlignCenterIcon from '../../icons/AlignCenter'
import AlignLeftIcon from '../../icons/AlignLeft'
import AlignRightIcon from '../../icons/AlignRight'
import ElementButton from '../Button'

const alignment: RichTextCustomElement = {
  name: 'alignment',
  Button: () => {
    return (
      <React.Fragment>
        <ElementButton format="left" type="textAlign">
          <AlignLeftIcon />
        </ElementButton>
        <ElementButton format="center" type="textAlign">
          <AlignCenterIcon />
        </ElementButton>
        <ElementButton format="right" type="textAlign">
          <AlignRightIcon />
        </ElementButton>
      </React.Fragment>
    )
  },
  Element: () => null,
}

export default alignment
