'use client'
import type { FormState, LoginWithUsernameOptions } from 'payload'

import {
  ConfirmPasswordField,
  Form,
  type FormProps,
  FormSubmit,
  PasswordField,
  RenderFields,
  useComponentMap,
  useConfig,
  useTranslation,
} from '@payloadcms/ui'
import { getFormState } from '@payloadcms/ui/shared'
import React from 'react'

import { EmailAndUsernameFields } from '../../elements/EmailAndUsername/index.js'

export const CreateFirstUserClient: React.FC<{
  initialState: FormState
  loginWithUsername?: LoginWithUsernameOptions | false
  userSlug: string
}> = ({ initialState, loginWithUsername, userSlug }) => {
  const { getFieldMap } = useComponentMap()

  const {
    routes: { admin, api: apiRoute },
    serverURL,
  } = useConfig()

  const { t } = useTranslation()

  const fieldMap = getFieldMap({ collectionSlug: userSlug })

  const onChange: FormProps['onChange'][0] = React.useCallback(
    async ({ formState: prevFormState }) =>
      getFormState({
        apiRoute,
        body: {
          collectionSlug: userSlug,
          formState: prevFormState,
          operation: 'create',
          schemaPath: `_${userSlug}.auth`,
        },
        serverURL,
      }),
    [apiRoute, userSlug, serverURL],
  )

  return (
    <Form
      action={`${serverURL}${apiRoute}/${userSlug}/first-register`}
      initialState={initialState}
      method="POST"
      onChange={[onChange]}
      redirect={admin}
      validationOperation="create"
    >
      <EmailAndUsernameFields
        requireEmail={!loginWithUsername || (loginWithUsername && loginWithUsername.requireEmail)}
        requireUsername={loginWithUsername && loginWithUsername.requireUsername}
        showEmailField={
          !loginWithUsername ||
          loginWithUsername?.requireEmail ||
          loginWithUsername?.allowEmailLogin
        }
        showUsernameField={Boolean(loginWithUsername)}
      />
      <PasswordField
        label={t('authentication:newPassword')}
        name="password"
        path="password"
        required
      />
      <ConfirmPasswordField />
      <RenderFields
        fieldMap={fieldMap}
        forceRender
        operation="create"
        path=""
        readOnly={false}
        schemaPath={userSlug}
      />
      <FormSubmit>{t('general:create')}</FormSubmit>
    </Form>
  )
}
