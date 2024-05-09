import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

import type { Footer } from '../../../payload-types.js'

export async function getFooter(): Promise<Footer> {
  const payload = await getPayloadHMR({ config })

  try {
    const footer = await payload.findGlobal({
      slug: 'footer',
    })

    return footer as Footer
  } catch (err) {
    console.error(err)
  }

  throw new Error('Error getting footer.')
}
