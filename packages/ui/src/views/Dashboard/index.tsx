import React, { useEffect } from 'react'

import type { Props } from './types'

import { Gutter } from '../../elements/Gutter'
import './index.scss'
import { DefaultDashboardClient } from './index.client'
import { useActions } from '../../utilities/ActionsProvider'

const baseClass = 'dashboard'

export const DefaultDashboard: React.FC<Props> = (props) => {
  const {
    config: {
      admin: {
        components: { afterDashboard, beforeDashboard },
      },
    },
    clientConfig,
  } = props

  const { setViewActions } = useActions()

  useEffect(() => {
    setViewActions([])
  }, [setViewActions])

  return (
    <div className={baseClass}>
      <Gutter className={`${baseClass}__wrap`}>
        {Array.isArray(beforeDashboard) &&
          beforeDashboard.map((Component, i) => <Component key={i} />)}
        <DefaultDashboardClient {...props} config={clientConfig} />
        {Array.isArray(afterDashboard) &&
          afterDashboard.map((Component, i) => <Component key={i} />)}
      </Gutter>
    </div>
  )
}
