'use client'

import { $isElementNode, $isRangeSelection, FORMAT_ELEMENT_COMMAND } from 'lexical'

import type { FeatureProviderProviderClient } from '../types.js'

import { AlignCenterIcon } from '../../lexical/ui/icons/AlignCenter/index.js'
import { AlignJustifyIcon } from '../../lexical/ui/icons/AlignJustify/index.js'
import { AlignLeftIcon } from '../../lexical/ui/icons/AlignLeft/index.js'
import { AlignRightIcon } from '../../lexical/ui/icons/AlignRight/index.js'
import { createClientComponent } from '../createClientComponent.js'
import { alignGroupWithItems } from './inlineToolbarAlignGroup.js'

const AlignFeatureClient: FeatureProviderProviderClient<undefined> = (props) => {
  return {
    clientFeatureProps: props,
    feature: () => ({
      clientFeatureProps: props,
      toolbarInline: {
        groups: [
          alignGroupWithItems([
            {
              ChildComponent: AlignLeftIcon,
              isActive: ({ selection }) => {
                if (!$isRangeSelection(selection)) {
                  return false
                }
                for (const node of selection.getNodes()) {
                  if ($isElementNode(node)) {
                    if (node.getFormatType() === 'left') {
                      continue
                    }
                  }

                  const parent = node.getParent()
                  if ($isElementNode(parent)) {
                    if (parent.getFormatType() === 'left') {
                      continue
                    }
                  }

                  return false
                }
                return true
              },
              key: 'alignLeft',
              label: `Align Left`,
              onSelect: ({ editor }) => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
              },
              order: 1,
            },
            {
              ChildComponent: AlignCenterIcon,
              isActive: ({ selection }) => {
                if (!$isRangeSelection(selection)) {
                  return false
                }
                for (const node of selection.getNodes()) {
                  if ($isElementNode(node)) {
                    if (node.getFormatType() === 'center') {
                      continue
                    }
                  }

                  const parent = node.getParent()
                  if ($isElementNode(parent)) {
                    if (parent.getFormatType() === 'center') {
                      continue
                    }
                  }

                  return false
                }
                return true
              },
              key: 'alignCenter',
              label: `Align Center`,
              onSelect: ({ editor }) => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
              },
              order: 2,
            },
            {
              ChildComponent: AlignRightIcon,
              isActive: ({ selection }) => {
                if (!$isRangeSelection(selection)) {
                  return false
                }
                for (const node of selection.getNodes()) {
                  if ($isElementNode(node)) {
                    if (node.getFormatType() === 'right') {
                      continue
                    }
                  }

                  const parent = node.getParent()
                  if ($isElementNode(parent)) {
                    if (parent.getFormatType() === 'right') {
                      continue
                    }
                  }

                  return false
                }
                return true
              },
              key: 'alignRight',
              label: `Align Right`,
              onSelect: ({ editor }) => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
              },
              order: 3,
            },
            {
              ChildComponent: AlignJustifyIcon,
              isActive: ({ selection }) => {
                if (!$isRangeSelection(selection)) {
                  return false
                }
                for (const node of selection.getNodes()) {
                  if ($isElementNode(node)) {
                    if (node.getFormatType() === 'justify') {
                      continue
                    }
                  }

                  const parent = node.getParent()
                  if ($isElementNode(parent)) {
                    if (parent.getFormatType() === 'justify') {
                      continue
                    }
                  }

                  return false
                }
                return true
              },
              key: 'alignJustify',
              label: `Align Justify`,
              onSelect: ({ editor }) => {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
              },
              order: 4,
            },
          ]),
        ],
      },
    }),
  }
}

export const AlignFeatureClientComponent = createClientComponent(AlignFeatureClient)
