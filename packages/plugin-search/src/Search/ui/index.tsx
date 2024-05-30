import type { UIField } from 'payload/types'

import React from 'react'

import { LinkToDocClient } from './index.client.js'

export const LinkToDoc: React.FC<UIField> = () => {
  return (
    <div>
      <LinkToDocClient />
    </div>
  )
}
