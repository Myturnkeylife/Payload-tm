'use client'
import type { Validate, ValidateOptions } from 'payload'

import { EmailField, TextField, useTranslation } from '@payloadcms/ui'
import { email, username } from 'payload/shared'
import React from 'react'

export type LoginFieldProps = {
  required?: boolean
  type: 'email' | 'emailOrUsername' | 'username'
  validate?: Validate
}

export const LoginField: React.FC<LoginFieldProps> = ({ type, required = true }) => {
  const { t } = useTranslation()

  if (type === 'email') {
    return (
      <EmailField
        autoComplete="email"
        clientFieldConfig={{
          name: 'email',
          label: t('general:email'),
          path: 'email',
          required,
        }}
        validate={email}
      />
    )
  }

  if (type === 'username') {
    return (
      <TextField
        clientFieldConfig={{
          name: 'username',
          label: t('authentication:username'),
          path: 'username',
          required,
        }}
        validate={username}
      />
    )
  }

  if (type === 'emailOrUsername') {
    return (
      <TextField
        clientFieldConfig={{
          name: 'username',
          label: t('authentication:emailOrUsername'),
          path: 'username',
          required,
        }}
        validate={(value, options) => {
          const passesUsername = username(
            value,
            options as ValidateOptions<any, { email?: string }, any, string>,
          )
          const passesEmail = email(
            value,
            options as ValidateOptions<any, { username?: string }, any, string>,
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
