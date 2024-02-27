import React, { Fragment } from 'react'

import type { Props } from './types'

import { AppHeader } from '../../elements/Header'
import { DefaultNav } from '../../elements/Nav'
import { NavToggler } from '../../elements/Nav/NavToggler'
import { RenderCustomComponent } from '../../elements/RenderCustomComponent'
import { NavHamburger } from './NavHamburger'
import { Wrapper } from './Wrapper'
import './index.scss'

const baseClass = 'template-default'

export const DefaultTemplate: React.FC<Props> = async ({
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
  } = config

  return (
    <Fragment>
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
    </Fragment>
  )
}
