'use client'
import type { LexicalEditor } from 'lexical'

import { mergeRegister } from '@lexical/utils'
import { $getSelection } from 'lexical'
import React, { useCallback, useEffect, useState } from 'react'

import type { ToolbarGroupItem } from '../../types.js'

import './index.scss'

const baseClass = 'toolbar-popup__button'

export const ToolbarButton = ({
  children,
  editor,
  item,
}: {
  children: React.JSX.Element
  editor: LexicalEditor
  item: ToolbarGroupItem
}) => {
  const [enabled, setEnabled] = useState<boolean>(true)
  const [active, setActive] = useState<boolean>(false)
  const [className, setClassName] = useState<string>(baseClass)

  const updateStates = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection()
      if (item.isActive) {
        const isActive = item.isActive({ editor, selection })
        if (active !== isActive) {
          setActive(isActive)
        }
      }
      if (item.isEnabled) {
        const isEnabled = item.isEnabled({ editor, selection })
        if (enabled !== isEnabled) {
          setEnabled(isEnabled)
        }
      }
    })
  }, [active, editor, enabled, item])

  useEffect(() => {
    updateStates()
  }, [updateStates])

  useEffect(() => {
    document.addEventListener('mouseup', updateStates)
    return () => {
      document.removeEventListener('mouseup', updateStates)
    }
  }, [updateStates])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updateStates()
      }),
    )
  }, [editor, updateStates])

  useEffect(() => {
    setClassName(
      [
        baseClass,
        enabled === false ? 'disabled' : '',
        active ? 'active' : '',
        item?.key ? `${baseClass}-` + item.key : '',
      ]
        .filter(Boolean)
        .join(' '),
    )
  }, [enabled, active, className, item.key])

  return (
    <button
      className={className}
      onClick={() => {
        if (enabled !== false) {
          item.onSelect({
            editor,
            isActive: active,
          })
        }
      }}
      onMouseDown={(e) => {
        // This fixes a bug where you are unable to click the button if you are in a NESTED editor (editor in blocks field in editor).
        // Thus only happens if you click on the SVG of the button. Clicking on the outside works. Related issue: https://github.com/payloadcms/payload/issues/4025
        // TODO: Find out why exactly it happens and why e.preventDefault() on the mouseDown fixes it. Write that down here, or potentially fix a root cause, if there is any.
        e.preventDefault()
      }}
      type="button"
    >
      {children}
    </button>
  )
}
