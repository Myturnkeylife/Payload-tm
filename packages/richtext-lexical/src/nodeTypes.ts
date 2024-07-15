import type {
  SerializedLineBreakNode as _SerializedLineBreakNode,
  SerializedTextNode as _SerializedTextNode,
  SerializedEditorState,
  SerializedElementNode,
  SerializedLexicalNode,
  Spread,
} from 'lexical'

import type { SerializedQuoteNode } from './features/blockquote/feature.server.js'
import type { SerializedBlockNode } from './features/blocks/nodes/BlocksNode.js'
import type { SerializedHeadingNode } from './features/heading/feature.server.js'
import type { SerializedHorizontalRuleNode } from './features/horizontalRule/nodes/HorizontalRuleNode.js'
import type { SerializedAutoLinkNode, SerializedLinkNode } from './features/link/nodes/types.js'
import type { SerializedListItemNode, SerializedListNode } from './features/lists/plugin/index.js'
import type { SerializedRelationshipNode } from './features/relationship/nodes/RelationshipNode.js'
import type { SerializedUploadNode } from './features/upload/nodes/UploadNode.js'

export type {
  SerializedAutoLinkNode,
  SerializedBlockNode,
  SerializedHeadingNode,
  SerializedHorizontalRuleNode,
  SerializedLinkNode,
  SerializedListItemNode,
  SerializedListNode,
  SerializedQuoteNode,
  SerializedRelationshipNode,
  SerializedUploadNode,
}

export type SerializedParagraphNode<T extends SerializedLexicalNode = SerializedLexicalNode> =
  Spread<
    {
      textFormat: number
      type: 'paragraph'
    },
    SerializedElementNode<T>
  >
export type SerializedTextNode = Spread<
  {
    children?: never // required so that our typed editor state doesn't automatically add children
    type: 'text'
  },
  _SerializedTextNode
>

export type SerializedLineBreakNode = Spread<
  {
    children?: never // required so that our typed editor state doesn't automatically add children
    type: 'linebreak'
  },
  _SerializedLineBreakNode
>

type RecursiveNodes<T extends SerializedLexicalNode, Depth extends number = 4> = Depth extends 0
  ? T
  : { children?: RecursiveNodes<T, DecrementDepth<Depth>>[] } & T

type DecrementDepth<N extends number> = [0, 0, 1, 2, 3, 4][N]

export type TypedEditorState<T extends SerializedLexicalNode = SerializedLexicalNode> =
  SerializedEditorState<RecursiveNodes<T>>

export type DefaultNodeTypes =
  | SerializedAutoLinkNode
  //| SerializedBlockNode // Not included by default
  | SerializedHeadingNode
  | SerializedHorizontalRuleNode
  | SerializedLineBreakNode
  | SerializedLinkNode
  | SerializedListItemNode
  | SerializedListNode
  | SerializedParagraphNode
  | SerializedQuoteNode
  | SerializedRelationshipNode
  | SerializedTextNode
  | SerializedUploadNode

export type DefaultTypedEditorState<T extends SerializedLexicalNode = SerializedLexicalNode> =
  TypedEditorState<DefaultNodeTypes | T>
