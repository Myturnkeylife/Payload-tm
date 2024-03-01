'use client'
import { getTranslation } from '@payloadcms/translations'
import React, { Fragment, createContext, useContext, useState } from 'react'

import type { Context as ContextType } from './types'

import IconGraphic from '../../graphics/Icon'
import { useConfig } from '../../providers/Config'
import { useTranslation } from '../../providers/Translation'
import './index.scss'

const baseClass = 'step-nav'

const Context = createContext({} as ContextType)

const StepNavProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [stepNav, setStepNav] = useState([])

  return (
    <Context.Provider
      value={{
        setStepNav,
        stepNav,
      }}
    >
      {children}
    </Context.Provider>
  )
}

const useStepNav = (): ContextType => useContext(Context)

const StepNav: React.FC<{
  Link?: React.ComponentType
  className?: string
}> = ({ Link, className }) => {
  const { i18n } = useTranslation()

  const { stepNav } = useStepNav()

  const config = useConfig()

  const {
    routes: { admin },
  } = config

  const LinkElement = Link || 'a'

  return (
    <Fragment>
      {stepNav.length > 0 ? (
        <nav className={[baseClass, className].filter(Boolean).join(' ')}>
          <LinkElement className={`${baseClass}__home`} href={admin} tabIndex={0}>
            <IconGraphic />
          </LinkElement>
          <span>/</span>
          {stepNav.map((item, i) => {
            const StepLabel = getTranslation(item.label, i18n)
            const isLast = stepNav.length === i + 1

            const Step = isLast ? (
              <span className={`${baseClass}__last`} key={i}>
                {StepLabel}
              </span>
            ) : (
              <Fragment key={i}>
                {item.url ? (
                  <LinkElement href={item.url}>
                    <span key={i}>{StepLabel}</span>
                  </LinkElement>
                ) : (
                  <span key={i}>{StepLabel}</span>
                )}
                <span>/</span>
              </Fragment>
            )

            return Step
          })}
        </nav>
      ) : (
        <div className={[baseClass, className].filter(Boolean).join(' ')}>
          <IconGraphic />
        </div>
      )}
    </Fragment>
  )
}

export { StepNavProvider, useStepNav }

export default StepNav
