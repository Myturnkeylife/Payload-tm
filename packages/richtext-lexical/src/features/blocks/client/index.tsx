'use client'

import type { BlocksFieldProps } from 'payload'

import { getTranslation } from '@payloadcms/translations'

import type { SlashMenuItem } from '../../../lexical/plugins/SlashMenu/LexicalTypeaheadMenuPlugin/types.js'
import type { ToolbarGroup, ToolbarGroupItem } from '../../toolbars/types.js'

import { BlockIcon } from '../../../lexical/ui/icons/Block/index.js'
import { InlineBlocksIcon } from '../../../lexical/ui/icons/InlineBlocks/index.js'
import { createClientFeature } from '../../../utilities/createClientFeature.js'
import { BlockNode } from './nodes/BlocksNode.js'
import { InlineBlockNode } from './nodes/InlineBlocksNode.js'
import { INSERT_BLOCK_COMMAND, OPEN_INLINE_BLOCK_DRAWER_COMMAND } from './plugin/commands.js'
import { BlocksPlugin } from './plugin/index.js'

export type BlocksFeatureClientProps = {
  reducedBlockSlugs: string[]
  reducedInlineBlockSlugs: string[]
}

export const BlocksFeatureClient = createClientFeature<BlocksFeatureClientProps>(({ props }) => ({
  nodes: [BlockNode, InlineBlockNode],
  plugins: [
    {
      Component: BlocksPlugin,
      position: 'normal',
    },
  ],
  sanitizedClientFeatureProps: props,
  slashMenu: {
    groups: [
      props.reducedBlockSlugs?.length
        ? {
            items: props.reducedBlockSlugs.map((blockSlug) => {
              return {
                Icon: BlockIcon,
                key: 'block-' + blockSlug,
                keywords: ['block', 'blocks', blockSlug],
                label: ({ i18n, richTextComponentMap }) => {
                  const componentMapRenderedBlockPath = `lexical_internal_feature.blocks.fields.lexical_blocks`
                  const mappedBlock = richTextComponentMap.get(componentMapRenderedBlockPath)[0]

                  const blockFieldComponentProps: BlocksFieldProps = mappedBlock.fieldComponentProps

                  const reducedBlock = blockFieldComponentProps.blocks.find(
                    (_block) => _block.slug === blockSlug,
                  )

                  const blockDisplayName = reducedBlock.labels.singular
                    ? getTranslation(reducedBlock.labels.singular, i18n)
                    : reducedBlock.slug

                  return blockDisplayName
                },
                onSelect: ({ editor }) => {
                  editor.dispatchCommand(INSERT_BLOCK_COMMAND, {
                    id: null,
                    blockName: '',
                    blockType: blockSlug,
                  })
                },
              } as SlashMenuItem
            }),
            key: 'blocks',
            label: ({ i18n }) => {
              return i18n.t('lexical:blocks:label')
            },
          }
        : null,
      props.reducedInlineBlockSlugs?.length
        ? {
            items: props.reducedInlineBlockSlugs.map((inlineBlockSlug) => {
              return {
                Icon: InlineBlocksIcon,
                key: 'inlineBlocks-' + inlineBlockSlug,
                keywords: ['inlineBlock', 'inline block', inlineBlockSlug],
                label: ({ i18n, richTextComponentMap }) => {
                  const componentMapRenderedBlockPath = `lexical_internal_feature.blocks.fields.lexical_inline_blocks`
                  const mappedBlock = richTextComponentMap.get(componentMapRenderedBlockPath)[0]

                  const blockFieldComponentProps: BlocksFieldProps = mappedBlock.fieldComponentProps

                  const reducedBlock = blockFieldComponentProps.blocks.find(
                    (_block) => _block.slug === inlineBlockSlug,
                  )

                  const blockDisplayName = reducedBlock.labels.singular
                    ? getTranslation(reducedBlock.labels.singular, i18n)
                    : reducedBlock.slug

                  return blockDisplayName
                },
                onSelect: ({ editor }) => {
                  editor.dispatchCommand(OPEN_INLINE_BLOCK_DRAWER_COMMAND, {
                    fields: {
                      id: null,
                      blockName: '',
                      blockType: inlineBlockSlug,
                    },
                  })
                },
              } as SlashMenuItem
            }),
            key: 'inlineBlocks',
            label: ({ i18n }) => {
              return i18n.t('lexical:blocks:inlineBlocks:label')
            },
          }
        : null,
    ].filter(Boolean),
  },
  toolbarFixed: {
    groups: [
      props.reducedBlockSlugs?.length
        ? {
            type: 'dropdown',
            ChildComponent: BlockIcon,
            items: props.reducedBlockSlugs.map((blockSlug, index) => {
              return {
                ChildComponent: BlockIcon,
                isActive: undefined, // At this point, we would be inside a sub-richtext-editor. And at this point this will be run against the focused sub-editor, not the parent editor which has the actual block. Thus, no point in running this
                key: 'block-' + blockSlug,
                label: ({ i18n, richTextComponentMap }) => {
                  const componentMapRenderedBlockPath = `lexical_internal_feature.blocks.fields.lexical_blocks`
                  const mappedBlock = richTextComponentMap.get(componentMapRenderedBlockPath)[0]

                  const blockFieldComponentProps: BlocksFieldProps = mappedBlock.fieldComponentProps

                  const reducedBlock = blockFieldComponentProps.blocks.find(
                    (_block) => _block.slug === blockSlug,
                  )

                  const blockDisplayName = reducedBlock.labels.singular
                    ? getTranslation(reducedBlock.labels.singular, i18n)
                    : reducedBlock.slug

                  return blockDisplayName
                },
                onSelect: ({ editor }) => {
                  editor.dispatchCommand(INSERT_BLOCK_COMMAND, {
                    id: null,
                    blockName: '',
                    blockType: blockSlug,
                  })
                },
                order: index,
              } as ToolbarGroupItem
            }),
            key: 'blocks',
            order: 20,
          }
        : null,
      props.reducedInlineBlockSlugs?.length
        ? {
            type: 'dropdown',
            ChildComponent: InlineBlocksIcon,
            items: props.reducedInlineBlockSlugs.map((inlineBlockSlug, index) => {
              return {
                ChildComponent: InlineBlocksIcon,
                isActive: undefined,
                key: 'inlineBlock-' + inlineBlockSlug,
                label: ({ i18n, richTextComponentMap }) => {
                  const componentMapRenderedBlockPath = `lexical_internal_feature.blocks.fields.lexical_inline_blocks`
                  const mappedBlock = richTextComponentMap.get(componentMapRenderedBlockPath)[0]

                  const blockFieldComponentProps: BlocksFieldProps = mappedBlock.fieldComponentProps

                  const reducedBlock = blockFieldComponentProps.blocks.find(
                    (_block) => _block.slug === inlineBlockSlug,
                  )

                  const blockDisplayName = reducedBlock.labels.singular
                    ? getTranslation(reducedBlock.labels.singular, i18n)
                    : reducedBlock.slug

                  return blockDisplayName
                },
                onSelect: ({ editor }) => {
                  editor.dispatchCommand(OPEN_INLINE_BLOCK_DRAWER_COMMAND, {
                    fields: {
                      blockType: inlineBlockSlug,
                    },
                  })
                },
                order: index,
              } as ToolbarGroupItem
            }),
            key: 'inlineBlocks',
            order: 25,
          }
        : null,
    ].filter(Boolean) as ToolbarGroup[],
  },
}))
