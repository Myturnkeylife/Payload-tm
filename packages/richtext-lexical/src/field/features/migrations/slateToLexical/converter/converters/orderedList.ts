import type { SerializedListNode } from '@lexical/list'

import type { SlateNodeConverter } from '../types'

import { convertSlateNodesToLexical } from '..'

export const SlateOrderedListConverter: SlateNodeConverter = {
  converter({ converters, slateNode }) {
    return {
      type: 'list',
      children: convertSlateNodesToLexical({
        canContainParagraphs: false,
        converters,
        parentNodeType: 'list',
        slateNodes: slateNode.children || [],
      }),
      direction: 'ltr',
      format: '',
      indent: 0,
      listType: 'number',
      start: 1,
      tag: 'ol',
      version: 1,
    } as const as SerializedListNode
  },
  nodeTypes: ['ol'],
}
