'use client'
import type { ValueContainerProps } from 'react-select'

import React from 'react'
import { components as SelectComponents } from 'react-select'

import type { Option } from '../types.js'

import './index.scss'

const baseClass = 'value-container'

export const ValueContainer: React.FC<ValueContainerProps<Option, any>> = (props) => {
  const [hasMounted, setHasMounted] = React.useState(false)

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  // @ts-expect-error-next-line // TODO Fix this - moduleResolution 16 breaks our declare module
  const { selectProps: { customProps } = {} } = props

  if (!hasMounted) {
    return null
  }

  return (
    <div className={baseClass} ref={customProps?.droppableRef}>
      <SelectComponents.ValueContainer {...props} />
    </div>
  )
}
