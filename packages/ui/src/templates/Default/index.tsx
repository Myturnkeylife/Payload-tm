import type { Permissions, User } from 'payload/auth'
import type { SanitizedConfig } from 'payload/types'

import React from 'react'

import { AppHeader } from '../../elements/AppHeader/index.js'
import { NavToggler } from '../../elements/Nav/NavToggler/index.js'
import { DefaultNav } from '../../elements/Nav/index.js'
import { RenderCustomComponent } from '../../elements/RenderCustomComponent/index.js'
import { NavHamburger } from './NavHamburger/index.js'
export { NavHamburger } from './NavHamburger/index.js'
import { Wrapper } from './Wrapper/index.js'
export { Wrapper } from './Wrapper/index.js'
import './index.scss'

const baseClass = 'template-default'

export type DefaultTemplateProps = {
  children?: React.ReactNode
  className?: string
  config: Promise<SanitizedConfig> | SanitizedConfig
  i18n: any
  permissions: Permissions
  user: User
}

export const DefaultTemplate: React.FC<DefaultTemplateProps> = async ({
  children,
  className,
  config: configPromise,
  i18n,
  permissions,
  user,
}) => {
  const config = await configPromise

  const {
    admin: {
      components: { Nav: CustomNav } = {
        Nav: undefined,
      },
    } = {},
  } = config || {}

  // #nav-toggler needs to be wrapped in a div, not Fragment. This fixes https://github.com/shadcn-ui/ui/issues/1355#issuecomment-1909192594
  return (
    <div>
      <div className={`${baseClass}__nav-toggler-wrapper`} id="nav-toggler">
        <NavToggler className={`${baseClass}__nav-toggler`}>
          <NavHamburger />
        </NavToggler>
      </div>
      <Wrapper baseClass={baseClass} className={className}>
        <RenderCustomComponent
          CustomComponent={CustomNav}
          DefaultComponent={DefaultNav}
          componentProps={{
            config,
            i18n,
            permissions,
            user,
          }}
        />
        <div className={`${baseClass}__wrap`}>
          <AppHeader />
          {children}
        </div>
      </Wrapper>
    </div>
  )
}
