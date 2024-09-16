import type { SerializedParagraphNode } from 'lexical'

import type { HTMLConverter } from '../types.js'

import { convertLexicalNodesToHTML } from '../index.js'

export const ParagraphHTMLConverter: HTMLConverter<SerializedParagraphNode> = {
  async converter({
    converters,
    currentDepth,
    depth,
    draft,
    node,
    overrideAccess,
    parent,
    req,
    showHiddenFields,
  }) {
    const childrenText = await convertLexicalNodesToHTML({
      converters,
      currentDepth,
      depth,
      draft,
      lexicalNodes: node.children,
      overrideAccess,
      parent: {
        ...node,
        parent,
      },
      req,
      showHiddenFields,
    })
    return `<p>${childrenText}</p>`
  },
  nodeTypes: ['paragraph'],
}
