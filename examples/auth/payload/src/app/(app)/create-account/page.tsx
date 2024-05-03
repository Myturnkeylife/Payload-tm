import { initPage } from '@payloadcms/next/utilities'
import { redirect } from 'next/navigation'
import React from 'react'

import configPromise from '../../../payload.config'
import { Gutter } from '../_components/Gutter'
import { RenderParams } from '../_components/RenderParams'
import { CreateAccountForm } from './CreateAccountForm'
import classes from './index.module.scss'

export default async function CreateAccount({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[]
  }
}) {
  const {
    req: { user },
  } = await initPage({
    config: configPromise,
    route: '/create-account',
    searchParams,
  })

  if (user) {
    redirect(
      `/account?message=${encodeURIComponent(
        'Cannot create a new account while logged in, please log out and try again.',
      )}`,
    )
  }

  return (
    <Gutter className={classes.createAccount}>
      <h1>Create Account</h1>
      <RenderParams />
      <CreateAccountForm />
    </Gutter>
  )
}
