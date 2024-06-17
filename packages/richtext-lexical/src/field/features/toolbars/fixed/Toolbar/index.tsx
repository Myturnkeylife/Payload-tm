'use client'
import type { LexicalEditor } from 'lexical'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js'
import { useScrollInfo, useThrottledEffect, useTranslation } from '@payloadcms/ui/client'
import * as React from 'react'
import { useMemo } from 'react'

import type { EditorConfigContextType } from '../../../../lexical/config/client/EditorConfigProvider.js'
import type { SanitizedClientEditorConfig } from '../../../../lexical/config/types.js'
import type { PluginComponentWithAnchor } from '../../../types.js'
import type { ToolbarGroup, ToolbarGroupItem } from '../../types.js'
import type { FixedToolbarFeatureProps } from '../feature.server.js'

import { useEditorConfigContext } from '../../../../lexical/config/client/EditorConfigProvider.js'
import { ToolbarButton } from '../../shared/ToolbarButton/index.js'
import { ToolbarDropdown } from '../../shared/ToolbarDropdown/index.js'
import './index.scss'

function ButtonGroupItem({
  anchorElem,
  editor,
  item,
}: {
  anchorElem: HTMLElement
  editor: LexicalEditor
  item: ToolbarGroupItem
}): React.ReactNode {
  if (item.Component) {
    return (
      item?.Component && (
        <item.Component anchorElem={anchorElem} editor={editor} item={item} key={item.key} />
      )
    )
  }

  return (
    <ToolbarButton editor={editor} item={item} key={item.key}>
      {item?.ChildComponent && <item.ChildComponent />}
    </ToolbarButton>
  )
}

function ToolbarGroupComponent({
  anchorElem,
  editor,
  editorConfig,
  group,
  index,
}: {
  anchorElem: HTMLElement
  editor: LexicalEditor
  editorConfig: SanitizedClientEditorConfig
  group: ToolbarGroup
  index: number
}): React.ReactNode {
  const { i18n } = useTranslation()

  const [dropdownLabel, setDropdownLabel] = React.useState<null | string>(null)
  const [DropdownIcon, setDropdownIcon] = React.useState<React.FC | null>(null)

  React.useEffect(() => {
    if (group?.type === 'dropdown' && group.items.length && group.ChildComponent) {
      setDropdownIcon(() => group.ChildComponent)
    } else {
      setDropdownIcon(null)
    }
  }, [group])

  const onActiveChange = ({ activeItems }: { activeItems: ToolbarGroupItem[] }) => {
    if (!activeItems.length) {
      if (group?.type === 'dropdown' && group.items.length && group.ChildComponent) {
        setDropdownIcon(() => group.ChildComponent)
        setDropdownLabel(null)
      } else {
        setDropdownIcon(null)
        setDropdownLabel(null)
      }
      return
    }
    const item = activeItems[0]

    let label = item.key
    if (item.label) {
      label = typeof item.label === 'function' ? item.label({ i18n }) : item.label
    }
    // Crop title to max. 25 characters
    if (label.length > 25) {
      label = label.substring(0, 25) + '...'
    }
    setDropdownLabel(label)
    setDropdownIcon(() => item.ChildComponent)
  }

  return (
    <div className={`fixed-toolbar__group fixed-toolbar__group-${group.key}`} key={group.key}>
      {group.type === 'dropdown' &&
        group.items.length &&
        (DropdownIcon ? (
          <ToolbarDropdown
            Icon={DropdownIcon}
            anchorElem={anchorElem}
            editor={editor}
            groupKey={group.key}
            items={group.items}
            itemsContainerClassNames={['fixed-toolbar__dropdown-items']}
            label={dropdownLabel}
            maxActiveItems={1}
            onActiveChange={onActiveChange}
          />
        ) : (
          <ToolbarDropdown
            anchorElem={anchorElem}
            editor={editor}
            groupKey={group.key}
            items={group.items}
            itemsContainerClassNames={['fixed-toolbar__dropdown-items']}
            label={dropdownLabel}
            maxActiveItems={1}
            onActiveChange={onActiveChange}
          />
        ))}
      {group.type === 'buttons' &&
        group.items.length &&
        group.items.map((item) => {
          return (
            <ButtonGroupItem anchorElem={anchorElem} editor={editor} item={item} key={item.key} />
          )
        })}
      {index < editorConfig.features.toolbarFixed?.groups.length - 1 && <div className="divider" />}
    </div>
  )
}

function FixedToolbar({
  anchorElem,
  clientProps,
  editor,
  editorConfig,
  parentWithFixedToolbar,
}: {
  anchorElem: HTMLElement
  clientProps?: FixedToolbarFeatureProps
  editor: LexicalEditor
  editorConfig: SanitizedClientEditorConfig
  parentWithFixedToolbar: EditorConfigContextType | false
}): React.ReactNode {
  const currentToolbarRef = React.useRef<HTMLDivElement>(null)

  const { y } = useScrollInfo()

  // Memoize the parent toolbar element
  const parentToolbarElem = useMemo(() => {
    if (!parentWithFixedToolbar || clientProps?.disableIfParentHasFixedToolbar) {
      return null
    }

    const parentEditorElem = parentWithFixedToolbar.editorContainerRef.current
    let sibling = parentEditorElem.previousElementSibling
    while (sibling) {
      if (sibling.classList.contains('fixed-toolbar')) {
        return sibling
      }
      sibling = sibling.previousElementSibling
    }
    return null
  }, [clientProps?.disableIfParentHasFixedToolbar, parentWithFixedToolbar])

  useThrottledEffect(
    () => {
      if (!parentToolbarElem) {
        // this also checks for clientProps?.disableIfParentHasFixedToolbar indirectly, see the parentToolbarElem useMemo
        return
      }
      const currentToolbarElem = currentToolbarRef.current
      if (!currentToolbarElem) {
        return
      }

      const currentRect = currentToolbarElem.getBoundingClientRect()
      const parentRect = parentToolbarElem.getBoundingClientRect()

      // we only need to check for vertical overlap
      const overlapping = !(
        currentRect.bottom < parentRect.top || currentRect.top > parentRect.bottom
      )

      if (overlapping) {
        currentToolbarRef.current.className = 'fixed-toolbar fixed-toolbar--overlapping'
        parentToolbarElem.className = 'fixed-toolbar fixed-toolbar--hide'
      } else {
        if (!currentToolbarRef.current.classList.contains('fixed-toolbar--overlapping')) {
          return
        }
        currentToolbarRef.current.className = 'fixed-toolbar'
        parentToolbarElem.className = 'fixed-toolbar'
      }
    },
    50,
    [currentToolbarRef, parentToolbarElem, y],
  )

  return (
    <div
      className="fixed-toolbar"
      onFocus={(event) => {
        // Prevent other focus events being triggered. Otherwise, if this was to be clicked while in a child editor,
        // the parent editor will be focused, and the child editor will lose focus.
        event.stopPropagation()
      }}
      ref={currentToolbarRef}
    >
      {editor.isEditable() && (
        <React.Fragment>
          {editorConfig?.features &&
            editorConfig.features?.toolbarFixed?.groups.map((group, i) => {
              return (
                <ToolbarGroupComponent
                  anchorElem={anchorElem}
                  editor={editor}
                  editorConfig={editorConfig}
                  group={group}
                  index={i}
                  key={group.key}
                />
              )
            })}
        </React.Fragment>
      )}
    </div>
  )
}

const getParentEditorWithFixedToolbar = (
  editorConfigContext: EditorConfigContextType,
): EditorConfigContextType | false => {
  if (editorConfigContext.parentEditor?.editorConfig) {
    if (editorConfigContext.parentEditor?.editorConfig.resolvedFeatureMap.has('toolbarFixed')) {
      return editorConfigContext.parentEditor
    } else {
      if (editorConfigContext.parentEditor) {
        return getParentEditorWithFixedToolbar(editorConfigContext.parentEditor)
      }
    }
  }
  return false
}

export const FixedToolbarPlugin: PluginComponentWithAnchor<FixedToolbarFeatureProps> = ({
  anchorElem,
  clientProps,
}) => {
  const [currentEditor] = useLexicalComposerContext()
  const editorConfigContext = useEditorConfigContext()

  const { editorConfig: currentEditorConfig } = editorConfigContext

  const editor = clientProps.applyToFocusedEditor
    ? editorConfigContext.focusedEditor?.editor || currentEditor
    : currentEditor

  const editorConfig = clientProps.applyToFocusedEditor
    ? editorConfigContext.focusedEditor?.editorConfig || currentEditorConfig
    : currentEditorConfig

  const parentWithFixedToolbar = getParentEditorWithFixedToolbar(editorConfigContext)

  if (clientProps?.disableIfParentHasFixedToolbar) {
    if (parentWithFixedToolbar) {
      return null
    }
  }

  if (!editorConfig?.features?.toolbarFixed?.groups?.length) {
    return null
  }

  return (
    <FixedToolbar
      anchorElem={anchorElem}
      editor={editor}
      editorConfig={editorConfig}
      parentWithFixedToolbar={parentWithFixedToolbar}
    />
  )
}
