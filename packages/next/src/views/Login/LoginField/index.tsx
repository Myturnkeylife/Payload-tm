'use client'
import type { Validate, ValidateOptions } from 'payload'

import { EmailField, TextField, useTranslation } from '@payloadcms/ui'
import { email, username } from 'payload/shared'
import React from 'react'

export type LoginFieldProps = {
  readonly required?: boolean
  readonly type: 'email' | 'emailOrUsername' | 'username'
  readonly validate?: Validate
}

export const LoginField: React.FC<LoginFieldProps> = ({ type, required = true }) => {
  const { t } = useTranslation()

  if (type === 'email') {
    return (
      <EmailField
        autoComplete="email"
        field={{
          name: 'email',
          label: t('general:email'),
          required,
        }}
        validate={email}
      />
    )
  }

  if (type === 'username') {
    return (
      <TextField
        field={{
          name: 'username',
          label: t('authentication:username'),
          required,
        }}
        validate={username}
      />
    )
  }

  if (type === 'emailOrUsername') {
    return (
      <TextField
        field={{
          name: 'username',
          label: t('authentication:emailOrUsername'),
          required,
        }}
        validate={(value, options) => {
          const passesUsername = username(value, options)
          const passesEmail = email(
            value,
            options as ValidateOptions<any, { username?: string }, any, any>,
          )

          if (!passesEmail && !passesUsername) {
            return `${t('general:email')}: ${passesEmail} ${t('general:username')}: ${passesUsername}`
          }

          return true
        }}
      />
    )
  }

  return null
}
