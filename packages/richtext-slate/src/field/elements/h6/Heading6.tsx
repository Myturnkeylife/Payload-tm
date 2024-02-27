'use client'

import React from 'react'

import { useElement } from '../../providers/ElementProvider'

export const Heading6 = () => {
  const { attributes, children } = useElement()

  return <h6 {...attributes}>{children}</h6>
}
