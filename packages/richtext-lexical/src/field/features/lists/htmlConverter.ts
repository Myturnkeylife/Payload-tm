import type { SerializedListItemNode, SerializedListNode } from '@lexical/list'

import lexicalListImport from '@lexical/list'
const { ListItemNode, ListNode } = lexicalListImport

import type { HTMLConverter } from '../converters/html/converter/types.js'

import { convertLexicalNodesToHTML } from '../converters/html/converter/index.js'

export const ListHTMLConverter: HTMLConverter<SerializedListNode> = {
  converter: async ({ converters, node, parent, payload }) => {
    const childrenText = await convertLexicalNodesToHTML({
      converters,
      lexicalNodes: node.children,
      parent: {
        ...node,
        parent,
      },
      payload,
    })

    return `<${node?.tag} class="${node?.listType}">${childrenText}</${node?.tag}>`
  },
  nodeTypes: [ListNode.getType()],
}

export const ListItemHTMLConverter: HTMLConverter<SerializedListItemNode> = {
  converter: async ({ converters, node, parent, payload }) => {
    const childrenText = await convertLexicalNodesToHTML({
      converters,
      lexicalNodes: node.children,
      parent: {
        ...node,
        parent,
      },
      payload,
    })

    if ('listType' in parent && parent?.listType === 'check') {
      return `<li aria-checked=${node.checked ? 'true' : 'false'} class="${
        'list-item-checkbox' + node.checked
          ? 'list-item-checkbox-checked'
          : 'list-item-checkbox-unchecked'
      }"
          role="checkbox"
          tabIndex=${-1}
          value=${node?.value}
      >
          {serializedChildren}
          </li>`
    } else {
      return `<li value=${node?.value}>${childrenText}</li>`
    }
  },
  nodeTypes: [ListItemNode.getType()],
}
