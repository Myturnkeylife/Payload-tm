/* eslint-disable no-restricted-exports */
import { notFound } from 'next/navigation.js'
import React, { Fragment } from 'react'

import type { Post } from '../../../../../payload-types.js'

import { ssrPostsSlug } from '../../../../../shared.js'
import { getDoc } from '../../../_api/getDoc.js'
import { getDocs } from '../../../_api/getDocs.js'
import { Blocks } from '../../../_components/Blocks/index.js'
import { PostHero } from '../../../_heros/PostHero/index.js'
import { RefreshRouteOnSave } from './RefreshRouteOnSave.js'

export default async function SSRPost({ params: { slug = '' } }) {
  const data = await getDoc<Post>({
    slug,
    collection: ssrPostsSlug,
    draft: true,
  })

  if (!data) {
    notFound()
  }

  return (
    <Fragment>
      <RefreshRouteOnSave />
      <PostHero post={data} />
      <Blocks blocks={data?.layout} />
    </Fragment>
  )
}

export async function generateStaticParams() {
  process.env.PAYLOAD_DROP_DATABASE = 'false'
  try {
    const ssrPosts = await getDocs<Post>(ssrPostsSlug)
    return ssrPosts?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}
