'use client'
import React, { useCallback, useEffect } from 'react'

const baseClass = 'toolbar-popup__dropdown'

import type { LexicalEditor } from 'lexical'

import { mergeRegister } from '@lexical/utils'
import { useTranslation } from '@payloadcms/ui/providers/Translation'
import { $getSelection } from 'lexical'

import type { ToolbarGroupItem } from '../../types.js'

import { useEditorFocus } from '../../../../lexical/EditorFocusProvider.js'
import { DropDown, DropDownItem } from './DropDown.js'
import './index.scss'

const ToolbarItem = ({
  active,
  anchorElem,
  editor,
  enabled,
  item,
}: {
  active?: boolean
  anchorElem: HTMLElement
  editor: LexicalEditor
  enabled?: boolean
  item: ToolbarGroupItem
}) => {
  const { i18n } = useTranslation()

  if (item.Component) {
    return (
      item?.Component && (
        <item.Component
          active={active}
          anchorElem={anchorElem}
          editor={editor}
          enabled={enabled}
          item={item}
          key={item.key}
        />
      )
    )
  }

  let title = item.key
  if (item.label) {
    title = typeof item.label === 'function' ? item.label({ i18n }) : item.label
  }
  // Crop title to max. 25 characters
  if (title.length > 25) {
    title = title.substring(0, 25) + '...'
  }

  return (
    <DropDownItem active={active} editor={editor} enabled={enabled} item={item} key={item.key}>
      {item?.ChildComponent && <item.ChildComponent />}
      <span className="text">{title}</span>
    </DropDownItem>
  )
}

export const ToolbarDropdown = ({
  Icon,
  anchorElem,
  classNames,
  editor,
  groupKey,
  items,
  itemsContainerClassNames,
  label,
  maxActiveItems,
  onActiveChange,
}: {
  Icon?: React.FC
  anchorElem: HTMLElement
  classNames?: string[]
  editor: LexicalEditor
  groupKey: string
  items: ToolbarGroupItem[]
  itemsContainerClassNames?: string[]
  label?: string
  /**
   * Maximum number of active items allowed. This is a performance optimization to prevent
   * unnecessary item active checks when the maximum number of active items is reached.
   */
  maxActiveItems?: number
  onActiveChange?: ({ activeItems }: { activeItems: ToolbarGroupItem[] }) => void
}) => {
  const [activeItemKeys, setActiveItemKeys] = React.useState<string[]>([])
  const [enabledItemKeys, setEnabledItemKeys] = React.useState<string[]>([])
  const editorFocusContext = useEditorFocus()

  const updateStates = useCallback(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection()

      const _activeItemKeys: string[] = []
      const _activeItems: ToolbarGroupItem[] = []
      const _enabledItemKeys: string[] = []

      for (const item of items) {
        if (item.isActive && (!maxActiveItems || _activeItemKeys.length < maxActiveItems)) {
          const isActive = item.isActive({ editor, editorFocusContext, selection })
          if (isActive) {
            _activeItemKeys.push(item.key)
            _activeItems.push(item)
          }
        }
        if (item.isEnabled) {
          const isEnabled = item.isEnabled({ editor, editorFocusContext, selection })
          if (isEnabled) {
            _enabledItemKeys.push(item.key)
          }
        } else {
          _enabledItemKeys.push(item.key)
        }
      }
      setActiveItemKeys(_activeItemKeys)
      setEnabledItemKeys(_enabledItemKeys)

      if (onActiveChange) {
        onActiveChange({ activeItems: _activeItems })
      }
    })
  }, [editor, editorFocusContext, items, maxActiveItems, onActiveChange])

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

  return (
    <DropDown
      Icon={Icon}
      buttonAriaLabel={`${groupKey} dropdown`}
      buttonClassName={[baseClass, `${baseClass}-${groupKey}`, ...(classNames || [])]
        .filter(Boolean)
        .join(' ')}
      itemsContainerClassNames={[`${baseClass}-items`, ...(itemsContainerClassNames || [])]}
      key={groupKey}
      label={label}
    >
      {items.length &&
        items.map((item) => {
          return (
            <ToolbarItem
              active={activeItemKeys.includes(item.key)}
              anchorElem={anchorElem}
              editor={editor}
              enabled={enabledItemKeys.includes(item.key)}
              item={item}
              key={item.key}
            />
          )
        })}
    </DropDown>
  )
}
