'use client'
import type { LexicalEditor } from 'lexical'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js'
import { mergeRegister } from '@lexical/utils'
import {
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as React from 'react'
import { createPortal } from 'react-dom'

import type { InlineToolbarGroup, InlineToolbarGroupItem } from '../types.js'

import { useEditorConfigContext } from '../../../../lexical/config/client/EditorConfigProvider.js'
import { getDOMRangeRect } from '../../../../lexical/utils/getDOMRangeRect.js'
import { setFloatingElemPosition } from '../../../../lexical/utils/setFloatingElemPosition.js'
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
  item: InlineToolbarGroupItem
}): React.ReactNode {
  if (item.Component) {
    return (
      item?.Component && (
        <item.Component anchorElem={anchorElem} editor={editor} item={item} key={item.key} />
      )
    )
  }

  return (
    <ToolbarButton item={item} key={item.key}>
      {item?.ChildComponent && <item.ChildComponent />}
    </ToolbarButton>
  )
}

function ToolbarGroup({
  anchorElem,
  editor,
  group,
  index,
}: {
  anchorElem: HTMLElement
  editor: LexicalEditor
  group: InlineToolbarGroup
  index: number
}): React.ReactNode {
  const { editorConfig } = useEditorConfigContext()

  const Icon =
    group?.type === 'dropdown' && group.items.length && group.ChildComponent
      ? group.ChildComponent
      : null

  return (
    <div
      className={`inline-toolbar-popup__group inline-toolbar-popup__group-${group.key}`}
      key={group.key}
    >
      {group.type === 'dropdown' &&
        group.items.length &&
        (Icon ? (
          <ToolbarDropdown
            Icon={Icon}
            anchorElem={anchorElem}
            editor={editor}
            groupKey={group.key}
            items={group.items}
          />
        ) : (
          <ToolbarDropdown
            anchorElem={anchorElem}
            editor={editor}
            groupKey={group.key}
            items={group.items}
          />
        ))}
      {group.type === 'buttons' &&
        group.items.length &&
        group.items.map((item) => {
          return (
            <ButtonGroupItem anchorElem={anchorElem} editor={editor} item={item} key={item.key} />
          )
        })}
      {index < editorConfig.features.toolbarInline?.groups.length - 1 && (
        <div className="divider" />
      )}
    </div>
  )
}

function InlineToolbar({
  anchorElem,
  editor,
}: {
  anchorElem: HTMLElement
  editor: LexicalEditor
}): React.ReactNode {
  const floatingToolbarRef = useRef<HTMLDivElement | null>(null)
  const caretRef = useRef<HTMLDivElement | null>(null)

  const { editorConfig } = useEditorConfigContext()

  const closeFloatingToolbar = useCallback(() => {
    if (floatingToolbarRef?.current) {
      const isOpacityZero = floatingToolbarRef.current.style.opacity === '0'
      const isPointerEventsNone = floatingToolbarRef.current.style.pointerEvents === 'none'

      if (!isOpacityZero) {
        floatingToolbarRef.current.style.opacity = '0'
      }
      if (!isPointerEventsNone) {
        floatingToolbarRef.current.style.pointerEvents = 'none'
      }
    }
  }, [floatingToolbarRef])

  const mouseMoveListener = useCallback(
    (e: MouseEvent) => {
      if (floatingToolbarRef?.current && (e.buttons === 1 || e.buttons === 3)) {
        const isOpacityZero = floatingToolbarRef.current.style.opacity === '0'
        const isPointerEventsNone = floatingToolbarRef.current.style.pointerEvents === 'none'
        if (!isOpacityZero || !isPointerEventsNone) {
          // Check if the mouse is not over the popup
          const x = e.clientX
          const y = e.clientY
          const elementUnderMouse = document.elementFromPoint(x, y)
          if (!floatingToolbarRef.current.contains(elementUnderMouse)) {
            // Mouse is not over the target element => not a normal click, but probably a drag
            closeFloatingToolbar()
          }
        }
      }
    },
    [closeFloatingToolbar],
  )

  const mouseUpListener = useCallback(() => {
    if (floatingToolbarRef?.current) {
      if (floatingToolbarRef.current.style.opacity !== '1') {
        floatingToolbarRef.current.style.opacity = '1'
      }
      if (floatingToolbarRef.current.style.pointerEvents !== 'auto') {
        floatingToolbarRef.current.style.pointerEvents = 'auto'
      }
    }
  }, [floatingToolbarRef])

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveListener)
    document.addEventListener('mouseup', mouseUpListener)

    return () => {
      document.removeEventListener('mousemove', mouseMoveListener)
      document.removeEventListener('mouseup', mouseUpListener)
    }
  }, [floatingToolbarRef, mouseMoveListener, mouseUpListener])

  const updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection()

    const nativeSelection = window.getSelection()

    if (floatingToolbarRef.current === null) {
      return
    }

    const rootElement = editor.getRootElement()
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement)

      // Position floating toolbar
      const offsetIfFlipped = setFloatingElemPosition(
        rangeRect, // selection to position around
        floatingToolbarRef.current, // what to position
        anchorElem, // anchor elem
        'center',
      )

      // Position caret
      if (caretRef.current) {
        setFloatingElemPosition(
          rangeRect, // selection to position around
          caretRef.current, // what to position
          floatingToolbarRef.current, // anchor elem
          'center',
          10,
          5,
          true,
          offsetIfFlipped,
        )
      }
    }
  }, [editor, anchorElem])

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement

    const update = () => {
      editor.getEditorState().read(() => {
        updateTextFormatFloatingToolbar()
      })
    }

    window.addEventListener('resize', update)
    if (scrollerElem) {
      scrollerElem.addEventListener('scroll', update)
    }

    return () => {
      window.removeEventListener('resize', update)
      if (scrollerElem) {
        scrollerElem.removeEventListener('scroll', update)
      }
    }
  }, [editor, updateTextFormatFloatingToolbar, anchorElem])

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateTextFormatFloatingToolbar()
    })
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateTextFormatFloatingToolbar()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateTextFormatFloatingToolbar()
          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
    )
  }, [editor, updateTextFormatFloatingToolbar])

  return (
    <div className="inline-toolbar-popup" ref={floatingToolbarRef}>
      <div className="caret" ref={caretRef} />
      {editor.isEditable() && (
        <React.Fragment>
          {editorConfig?.features &&
            editorConfig.features?.toolbarInline?.groups.map((group, i) => {
              return (
                <ToolbarGroup
                  anchorElem={anchorElem}
                  editor={editor}
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

function useInlineToolbar(
  editor: LexicalEditor,
  anchorElem: HTMLElement,
): React.ReactElement | null {
  const [isText, setIsText] = useState(false)

  const updatePopup = useCallback(() => {
    editor.getEditorState().read(() => {
      // Should not to pop up the floating toolbar when using IME input
      if (editor.isComposing()) {
        return
      }
      const selection = $getSelection()
      const nativeSelection = window.getSelection()
      const rootElement = editor.getRootElement()

      if (
        nativeSelection !== null &&
        (!$isRangeSelection(selection) ||
          rootElement === null ||
          !rootElement.contains(nativeSelection.anchorNode))
      ) {
        setIsText(false)
        return
      }

      if (!$isRangeSelection(selection)) {
        return
      }

      if (selection.getTextContent() !== '') {
        const nodes = selection.getNodes()
        let foundNodeWithText = false
        for (const node of nodes) {
          if ($isTextNode(node)) {
            setIsText(true)
            foundNodeWithText = true
            break
          }
        }
        if (!foundNodeWithText) {
          setIsText(false)
        }
      } else {
        setIsText(false)
      }

      const rawTextContent = selection.getTextContent().replace(/\n/g, '')
      if (!selection.isCollapsed() && rawTextContent === '') {
        setIsText(false)
        return
      }
    })
  }, [editor])

  useEffect(() => {
    document.addEventListener('selectionchange', updatePopup)
    document.addEventListener('mouseup', updatePopup)
    return () => {
      document.removeEventListener('selectionchange', updatePopup)
      document.removeEventListener('mouseup', updatePopup)
    }
  }, [updatePopup])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(() => {
        updatePopup()
      }),
      editor.registerRootListener(() => {
        if (editor.getRootElement() === null) {
          setIsText(false)
        }
      }),
    )
  }, [editor, updatePopup])

  if (!isText) {
    return null
  }

  return createPortal(<InlineToolbar anchorElem={anchorElem} editor={editor} />, anchorElem)
}

export function InlineToolbarPlugin({
  anchorElem = document.body,
}: {
  anchorElem?: HTMLElement
}): React.ReactElement | null {
  const [editor] = useLexicalComposerContext()
  return useInlineToolbar(editor, anchorElem)
}
