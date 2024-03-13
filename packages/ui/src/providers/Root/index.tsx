'use client'
import type { LanguageTranslations } from '@payloadcms/translations'
import type { ClientConfig } from 'payload/types'

import * as facelessUIImport from '@faceless-ui/modal'
import * as facelessUIImport3 from '@faceless-ui/scroll-info'
import * as facelessUIImport2 from '@faceless-ui/window-info'
import React, { Fragment } from 'react'
import { Slide, ToastContainer } from 'react-toastify'

import type { ComponentMap } from '../../utilities/buildComponentMap/types.js'
import type { LanguageOptions } from '../Translation/index.js'

import { LoadingOverlayProvider } from '../../elements/LoadingOverlay/index.js'
import { NavProvider } from '../../elements/Nav/context.js'
import { StepNavProvider } from '../../elements/StepNav/index.js'
import { ActionsProvider } from '../ActionsProvider/index.js'
import { AuthProvider } from '../Auth/index.js'
import { ClientFunctionProvider } from '../ClientFunction/index.js'
import { ComponentMapProvider } from '../ComponentMapProvider/index.js'
import { ConfigProvider } from '../Config/index.js'
import { DocumentEventsProvider } from '../DocumentEvents/index.js'
import { LocaleProvider } from '../Locale/index.js'
import { ParamsProvider } from '../Params/index.js'
import { PreferencesProvider } from '../Preferences/index.js'
import { RouteCache } from '../RouteCache/index.js'
import { SearchParamsProvider } from '../SearchParams/index.js'
import { ThemeProvider } from '../Theme/index.js'
import { TranslationProvider } from '../Translation/index.js'

type Props = {
  children: React.ReactNode
  componentMap: ComponentMap
  config: ClientConfig
  fallbackLang: ClientConfig['i18n']['fallbackLanguage']
  lang: string
  languageOptions: LanguageOptions
  translations: LanguageTranslations
}

export const RootProvider: React.FC<Props> = ({
  children,
  componentMap,
  config,
  fallbackLang,
  lang,
  languageOptions,
  translations,
}) => {
  const { ModalContainer, ModalProvider } = facelessUIImport || {
    ModalContainer: React.Fragment,
    ModalProvider: React.Fragment,
  }
  const { WindowInfoProvider } = facelessUIImport2 || { WindowInfoProvider: React.Fragment }
  const { ScrollInfoProvider } = facelessUIImport3 || { ScrollInfoProvider: React.Fragment }

  return (
    <Fragment>
      <RouteCache>
        <ConfigProvider config={config}>
          <ComponentMapProvider componentMap={componentMap}>
            <ClientFunctionProvider>
              <TranslationProvider
                fallbackLang={fallbackLang}
                lang={lang}
                languageOptions={languageOptions}
                translations={translations}
              >
                <WindowInfoProvider
                  breakpoints={{
                    l: '(max-width: 1440px)',
                    m: '(max-width: 1024px)',
                    s: '(max-width: 768px)',
                    xs: '(max-width: 400px)',
                  }}
                >
                  <ScrollInfoProvider>
                    <SearchParamsProvider>
                      <ModalProvider classPrefix="payload" transTime={0} zIndex="var(--z-modal)">
                        <AuthProvider>
                          <PreferencesProvider>
                            <ThemeProvider>
                              <ParamsProvider>
                                <LocaleProvider>
                                  <StepNavProvider>
                                    <LoadingOverlayProvider>
                                      <DocumentEventsProvider>
                                        <ActionsProvider>
                                          <NavProvider>{children}</NavProvider>
                                        </ActionsProvider>
                                      </DocumentEventsProvider>
                                    </LoadingOverlayProvider>
                                  </StepNavProvider>
                                </LocaleProvider>
                              </ParamsProvider>
                            </ThemeProvider>
                          </PreferencesProvider>
                          <ModalContainer />
                        </AuthProvider>
                      </ModalProvider>
                    </SearchParamsProvider>
                  </ScrollInfoProvider>
                </WindowInfoProvider>
              </TranslationProvider>
            </ClientFunctionProvider>
          </ComponentMapProvider>
        </ConfigProvider>
      </RouteCache>
      <ToastContainer icon={false} position="bottom-center" transition={Slide} />
    </Fragment>
  )
}
