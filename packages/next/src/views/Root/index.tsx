import type { I18n, LanguageTranslations } from '@payloadcms/translations'
import type { Metadata } from 'next'
import type { InitPageResult, SanitizedConfig } from 'payload/types'

import { DefaultTemplate, MinimalTemplate, RootProvider, buildComponentMap } from '@payloadcms/ui'
import { createClientConfig } from 'payload/config'
import React from 'react'

import type { initPage } from '../../utilities/initPage'

import { DefaultCell } from '../../views/List/Default/Cell'
import { Account } from '../Account'
import { CreateFirstUser } from '../CreateFirstUser'
import { Dashboard } from '../Dashboard'
import { Document as DocumentView } from '../Document'
import { DefaultEditView } from '../Edit/Default'
import { ForgotPassword, forgotPasswordBaseClass } from '../ForgotPassword'
import { ListView } from '../List'
import { DefaultListView } from '../List/Default'
import { Login, loginBaseClass } from '../Login'
import { Logout, LogoutInactivity } from '../Logout'
import { ResetPassword, resetPasswordBaseClass } from '../ResetPassword'
import { Unauthorized } from '../Unauthorized'
import { Verify, verifyBaseClass } from '../Verify'

export { generatePageMetadata } from './meta.js'

export type GenerateViewMetadata = (args: {
  config: SanitizedConfig
  i18n: I18n
  params?: { [key: string]: string | string[] }
}) => Promise<Metadata>

export type AdminViewProps = {
  initPageResult: InitPageResult
  params?: { [key: string]: string | string[] | undefined }
  searchParams: { [key: string]: string | string[] | undefined }
}

const baseClasses = {
  forgot: forgotPasswordBaseClass,
  login: loginBaseClass,
  reset: resetPasswordBaseClass,
  verify: verifyBaseClass,
}

const oneSegmentViews = {
  'create-first-user': CreateFirstUser,
  forgot: ForgotPassword,
  login: Login,
  logout: Logout,
  'logout-inactivity': LogoutInactivity,
  unauthorized: Unauthorized,
}

export const RootPage = async ({
  config: configPromise,
  params,
  searchParams,
}: {
  config: Promise<SanitizedConfig>
  params: {
    [key: string]: string | string[]
  }
  searchParams: {
    [key: string]: string | string[]
  }
}) => {
  const config = await configPromise

  const {
    admin: { user: userSlug },
    routes: { admin: adminRoute },
  } = config

  let ViewToRender: React.FC<AdminViewProps>
  let templateClassName
  let templateType: 'default' | 'minimal' = 'default'

  let route = adminRoute

  if (Array.isArray(params.segments)) {
    route = route + '/' + params.segments.join('/')
  }

  const segments = Array.isArray(params.segments) ? params.segments : []

  const [segmentOne, segmentTwo] = segments

  const isGlobal = segmentOne === 'globals'
  const isCollection = segmentOne === 'collections'

  const initPageOptions: Parameters<typeof initPage>[0] = {
    config,
    route,
    searchParams,
  }

  // TODO: handle custom routes

  switch (segments.length) {
    case 0: {
      ViewToRender = Dashboard
      templateClassName = 'dashboard'
      templateType = 'default'
      initPageOptions.redirectUnauthenticatedUser = true
      break
    }
    case 1: {
      if (oneSegmentViews[segmentOne] && segmentOne !== 'account') {
        // --> /create-first-user
        // --> /forgot
        // --> /login
        // --> /logout
        // --> /logout-inactivity
        // --> /unauthorized
        ViewToRender = oneSegmentViews[segmentOne]
        templateClassName = baseClasses[segmentOne]
        templateType = 'minimal'
      } else if (segmentOne === 'account') {
        // --> /account
        initPageOptions.redirectUnauthenticatedUser = true
        ViewToRender = Account
        templateClassName = 'account'
        templateType = 'default'
      }
      break
    }
    case 2: {
      if (segmentOne === 'reset') {
        // --> /reset/:token
        ViewToRender = ResetPassword
        templateClassName = baseClasses[segmentTwo]
        templateType = 'minimal'
      }
      if (isCollection) {
        // --> /collections/:collectionSlug
        initPageOptions.redirectUnauthenticatedUser = true
        ViewToRender = ListView
        templateClassName = `${segmentTwo}-list`
        templateType = 'default'
      } else if (isGlobal) {
        // --> /globals/:globalSlug
        initPageOptions.redirectUnauthenticatedUser = true
        ViewToRender = DocumentView
        templateClassName = 'global-edit'
        templateType = 'default'
      }
      break
    }
    default:
      if (segmentTwo === 'verify') {
        // --> /:collectionSlug/verify/:token
        ViewToRender = Verify
        templateClassName = 'verify'
        templateType = 'minimal'
      } else if (isCollection) {
        // Custom Views
        // --> /collections/:collectionSlug/:id
        // --> /collections/:collectionSlug/:id/preview
        // --> /collections/:collectionSlug/:id/versions
        // --> /collections/:collectionSlug/:id/versions/:versionId
        // --> /collections/:collectionSlug/:id/api
        initPageOptions.redirectUnauthenticatedUser = true
        ViewToRender = DocumentView
        templateClassName = `collection-default-edit`
        templateType = 'default'
      } else if (isGlobal) {
        // Custom Views
        // --> /globals/:globalSlug/versions
        // --> /globals/:globalSlug/preview
        // --> /globals/:globalSlug/versions/:versionId
        // --> /globals/:globalSlug/api
        initPageOptions.redirectUnauthenticatedUser = true
        ViewToRender = DocumentView
        templateClassName = `global-edit`
        templateType = 'default'
      }
      break
  }

  const languageOptions = Object.entries(initPageResult.req.i18n.translations || {}).map(
    ([language, translations]) => ({
      label: 'general' in translations ? translations.general.thisLanguage : 'English',
      value: language,
    }),
  )

  const componentMap = buildComponentMap({
    DefaultCell,
    DefaultEditView,
    DefaultListView,
    config,
  })

  const clientConfig = await createClientConfig(config)

  if (initPageResult) {
    return (
      <RootProvider
        componentMap={componentMap}
        config={clientConfig}
        fallbackLang={clientConfig.i18n.fallbackLanguage}
        lang={initPageResult.req.i18n.language}
        languageOptions={languageOptions}
        translations={
          initPageResult.req.i18n.translations[
            initPageResult.req.i18n.language
          ] as LanguageTranslations
        }
      >
        {templateType === 'minimal' && (
          <MinimalTemplate className={templateClassName}>
            <ViewToRender
              initPageResult={initPageResult}
              params={params}
              searchParams={searchParams}
            />
          </MinimalTemplate>
        )}
        {templateType === 'default' && (
          <DefaultTemplate
            config={config}
            i18n={initPageResult.req.i18n}
            permissions={initPageResult.permissions}
            user={initPageResult.req.user}
          >
            <ViewToRender
              initPageResult={initPageResult}
              params={params}
              searchParams={searchParams}
            />
          </DefaultTemplate>
        )}
      </RootProvider>
    )
  }

  if (templateType === 'minimal') {
    return (
      <MinimalTemplate className={templateClassName}>
        <ViewToRender initPageResult={initPageResult} params={params} searchParams={searchParams} />
      </MinimalTemplate>
    )
  } else {
    return (
      <DefaultTemplate
        config={config}
        i18n={initPageResult.req.i18n}
        permissions={initPageResult.permissions}
        user={initPageResult.req.user}
      >
        <ViewToRender initPageResult={initPageResult} params={params} searchParams={searchParams} />
      </DefaultTemplate>
    )
  }
}
