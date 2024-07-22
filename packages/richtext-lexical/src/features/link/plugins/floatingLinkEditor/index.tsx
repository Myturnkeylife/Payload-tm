'use client'
import * as React from 'react'
import { createPortal } from 'react-dom'

import type { PluginComponentWithAnchor } from '../../../typesClient.js'
import type { ClientProps } from '../../feature.client.js'

import { LinkEditor } from './LinkEditor/index.js'
import './index.scss'

export const FloatingLinkEditorPlugin: PluginComponentWithAnchor<ClientProps> = (props) => {
  const { anchorElem = document.body } = props

  return createPortal(<LinkEditor anchorElem={anchorElem} />, anchorElem)
}
