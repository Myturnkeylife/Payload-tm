import type { SerializedLexicalNode, Spread } from 'lexical'
import type { EditorConfig, LexicalNode, NodeKey } from 'lexical'

import { addClassNamesToElement } from '@lexical/utils'
import { DecoratorNode } from 'lexical'
import * as React from 'react'

export type UnknownConvertedNodeData = {
  nodeData: unknown
  nodeType: string
}

export type SerializedUnknownConvertedNode = Spread<
  {
    data: UnknownConvertedNodeData
  },
  SerializedLexicalNode
>

const Component = React.lazy(() =>
  import('./Component.js').then((module) => ({
    default: module.UnknownConvertedNodeComponent,
  })),
)

/** @noInheritDoc */
export class UnknownConvertedNode extends DecoratorNode<JSX.Element> {
  __data: UnknownConvertedNodeData

  constructor({ data, key }: { data: UnknownConvertedNodeData; key?: NodeKey }) {
    super(key)
    this.__data = data
  }

  static clone(node: UnknownConvertedNode): UnknownConvertedNode {
    return new UnknownConvertedNode({
      data: node.__data,
      key: node.__key,
    })
  }

  static getType(): string {
    return 'unknownConverted'
  }

  static importJSON(serializedNode: SerializedUnknownConvertedNode): UnknownConvertedNode {
    const node = $createUnknownConvertedNode({ data: serializedNode.data })
    return node
  }

  canInsertTextAfter(): true {
    return true
  }

  canInsertTextBefore(): true {
    return true
  }

  createDOM(config: EditorConfig): HTMLElement {
    const element = document.createElement('span')
    addClassNamesToElement(element, 'unknownConverted')
    return element
  }

  decorate(): JSX.Element | null {
    return <Component data={this.__data} />
  }

  exportJSON(): SerializedUnknownConvertedNode {
    return {
      type: this.getType(),
      data: this.__data,
      version: 1,
    }
  }

  // Mutation

  isInline(): boolean {
    return true
  }

  updateDOM(prevNode: UnknownConvertedNode, dom: HTMLElement): boolean {
    return false
  }
}

export function $createUnknownConvertedNode({
  data,
}: {
  data: UnknownConvertedNodeData
}): UnknownConvertedNode {
  return new UnknownConvertedNode({
    data,
  })
}

export function $isUnknownConvertedNode(
  node: LexicalNode | null | undefined,
): node is UnknownConvertedNode {
  return node instanceof UnknownConvertedNode
}
