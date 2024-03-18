import { notFound } from 'next/navigation.js'
import React from 'react'

import type { Page } from '../../../../test/live-preview/payload-types.js'

import { fetchDoc } from '../../_api/fetchDoc.js'
import { fetchDocs } from '../../_api/fetchDocs.js'
import { PageClient } from './page.client.js'

// eslint-disable-next-line no-restricted-exports
export default async function Page({ params: { slug = 'home' } }) {
  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      slug,
      collection: 'pages',
    })
  } catch (error) {
    console.error(error)
  }

  if (!page) {
    return notFound()
  }

  return <PageClient page={page} />
}

export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<Page>('pages')
    return pages?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}
