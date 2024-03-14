import type { AdminViewProps } from 'payload/types.js'

import { Button } from '@payloadcms/ui'
import LinkImport from 'next/link.js'
import React from 'react'

const Link = (LinkImport.default || LinkImport) as unknown as typeof LinkImport.default

import { customNestedViewPath, customViewTitle } from '../../../shared.js'

export const CustomView: React.FC<AdminViewProps> = ({ initPageResult }) => {
  const {
    req: {
      payload: {
        config: {
          routes: { admin: adminRoute },
        },
      },
    },
  } = initPageResult

  return (
    <div
      style={{
        marginTop: 'calc(var(--base) * 2)',
        paddingLeft: 'var(--gutter-h)',
        paddingRight: 'var(--gutter-h)',
      }}
    >
      <h1 id="custom-view-title">{customViewTitle}</h1>
      <p>This custom view was added through the Payload config:</p>
      <ul>
        <li>
          <code>components.views[key].Component</code>
        </li>
      </ul>
      <div className="custom-view__controls">
        <Button Link={Link} buttonStyle="secondary" el="link" to={`${adminRoute}`}>
          Go to Dashboard
        </Button>
        &nbsp; &nbsp; &nbsp;
        <Button
          Link={Link}
          buttonStyle="secondary"
          el="link"
          to={`${adminRoute}/${customNestedViewPath}`}
        >
          Go to Nested View
        </Button>
      </div>
    </div>
  )
}
