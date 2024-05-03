'use client'

import type { HeadingTagType } from '@lexical/rich-text'

import { $isHeadingNode } from '@lexical/rich-text'
import { $createHeadingNode, HeadingNode } from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import { $getSelection, $isRangeSelection } from 'lexical'

import type { FeatureProviderProviderClient } from '../types.js'
import type { HeadingFeatureProps } from './feature.server.js'

import { H1Icon } from '../../lexical/ui/icons/H1/index.js'
import { H2Icon } from '../../lexical/ui/icons/H2/index.js'
import { H3Icon } from '../../lexical/ui/icons/H3/index.js'
import { H4Icon } from '../../lexical/ui/icons/H4/index.js'
import { H5Icon } from '../../lexical/ui/icons/H5/index.js'
import { H6Icon } from '../../lexical/ui/icons/H6/index.js'
import { createClientComponent } from '../createClientComponent.js'
import { inlineToolbarTextDropdownGroupWithItems } from '../shared/inlineToolbar/textDropdownGroup.js'
import { MarkdownTransformer } from './markdownTransformer.js'

const setHeading = (headingSize: HeadingTagType) => {
  const selection = $getSelection()
  $setBlocksType(selection, () => $createHeadingNode(headingSize))
}

const iconImports = {
  h1: H1Icon,
  h2: H2Icon,
  h3: H3Icon,
  h4: H4Icon,
  h5: H5Icon,
  h6: H6Icon,
}

const HeadingFeatureClient: FeatureProviderProviderClient<HeadingFeatureProps> = (props) => {
  const { enabledHeadingSizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] } = props

  return {
    clientFeatureProps: props,
    feature: () => {
      return {
        clientFeatureProps: props,
        markdownTransformers: [MarkdownTransformer(enabledHeadingSizes)],
        nodes: [HeadingNode],
        slashMenu: {
          groups: enabledHeadingSizes?.length
            ? [
                {
                  displayName: 'Basic',
                  items: enabledHeadingSizes.map((headingSize) => {
                    return {
                      Icon: iconImports[headingSize],
                      displayName: `Heading ${headingSize.charAt(1)}`,
                      key: `heading-${headingSize.charAt(1)}`,
                      keywords: ['heading', headingSize],
                      onSelect: ({ editor }) => {
                        editor.update(() => {
                          setHeading(headingSize)
                        })
                      },
                    }
                  }),
                  key: 'basic',
                },
              ]
            : [],
        },
        toolbarInline: {
          groups: enabledHeadingSizes?.length
            ? [
                inlineToolbarTextDropdownGroupWithItems(
                  enabledHeadingSizes.map((headingSize, i) => {
                    return {
                      ChildComponent: iconImports[headingSize],
                      isActive: ({ selection }) => {
                        if (!$isRangeSelection(selection)) {
                          return false
                        }
                        for (const node of selection.getNodes()) {
                          if ($isHeadingNode(node) && node.getTag() === headingSize) {
                            continue
                          }

                          const parent = node.getParent()
                          if ($isHeadingNode(parent) && parent.getTag() === headingSize) {
                            continue
                          }

                          return false
                        }
                        return true
                      },
                      key: headingSize,
                      label: `Heading ${headingSize.charAt(1)}`,
                      onSelect: ({ editor }) => {
                        editor.update(() => {
                          setHeading(headingSize)
                        })
                      },
                      order: i + 2,
                    }
                  }),
                ),
              ]
            : [],
        },
      }
    },
  }
}

export const HeadingFeatureClientComponent = createClientComponent(HeadingFeatureClient)
