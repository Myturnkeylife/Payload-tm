/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import React from 'react'
import { Verify, generateMetadata as generateMeta } from '@payloadcms/next/pages/Verify'
import { Metadata } from 'next'
import config from '@payload-config'

export const generateMetadata = async (): Promise<Metadata> => generateMeta({ config })

export default async ({ params }) => <Verify config={config} token={params.token} />
