import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { draftMode, headers } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import type { Page } from '../../../payload-types'

import { Blocks } from '../../components/Blocks'
import { Hero } from '../../components/Hero'
import { generateMeta } from '../../utilities/generateMeta'

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
  })

  return pages.docs?.map(({ slug }) => slug)
}

export default async function Page({ params: { slug = 'home' } }) {
  const url = '/' + slug

  const page = await queryPageBySlug({
    slug,
  })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      <Hero {...hero} />
      <Blocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = draftMode()

  const payload = await getPayloadHMR({ config: configPromise })
  const authResult = draft ? await payload.auth({ headers: headers() }) : undefined

  const user = authResult?.user

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: false,
    user,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}
