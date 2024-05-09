import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities/getPayloadHMR.js'
import LinkWithDefault from 'next/link.js'
import React from 'react'

import type { Footer } from '../../../../payload-types.js'

import { Gutter } from '../Gutter/index.js'
import { CMSLink } from '../Link/index.js'
import classes from './index.module.scss'

const Link = (LinkWithDefault.default || LinkWithDefault) as typeof LinkWithDefault.default

export async function Footer() {
  const payload = await getPayloadHMR({ config })

  const footer = await payload.findGlobal({
    slug: 'footer',
  })

  const navItems = footer?.navItems || []

  return (
    <footer className={classes.footer}>
      <Gutter className={classes.wrap}>
        <Link href="/">
          <picture>
            <img
              alt="Payload Logo"
              className={classes.logo}
              src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/payload/src/admin/assets/images/payload-logo-light.svg"
            />
          </picture>
        </Link>
        <nav className={classes.nav}>
          {navItems?.map(({ link }, i) => {
            return <CMSLink key={i} {...link} />
          })}
          <Link href="/admin">Admin</Link>
          <Link href="https://github.com/payloadcms/payload/tree/main/templates/ecommerce">
            Source Code
          </Link>
          <Link href="https://github.com/payloadcms/payload">Payload</Link>
        </nav>
      </Gutter>
    </footer>
  )
}
