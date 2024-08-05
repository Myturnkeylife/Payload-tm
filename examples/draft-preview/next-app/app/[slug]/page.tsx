import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Page } from '../../payload-types'
import { fetchPage } from '../_api/fetchPage'
import { fetchPages } from '../_api/fetchPages'
import { Gutter } from '../_components/Gutter'
import RichText from '../_components/RichText'

import classes from './index.module.scss'

interface PageParams {
  params: { slug: string }
}

export const PageTemplate = ({ page }: { page: Page | null | undefined }) => (
  <main className={classes.page}>
    <Gutter>
      <h1>{page?.title}</h1>
      <RichText content={page?.richText} />
    </Gutter>
  </main>
)

export default async function Page({ params: { slug = 'home' } }: PageParams) {
  const { isEnabled: isDraftMode } = draftMode()

  const page = await fetchPage(slug, isDraftMode)

  if (page === null) {
    return notFound()
  }

  return <PageTemplate page={page} />
}

export async function generateStaticParams() {
  const pages = await fetchPages()

  return pages.map(({ slug }) =>
    slug !== 'home'
      ? {
          slug,
        }
      : {},
  ) // eslint-disable-line function-paren-newline
}
