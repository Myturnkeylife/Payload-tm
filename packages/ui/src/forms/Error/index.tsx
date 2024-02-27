'use client'
import type { ErrorProps } from 'payload/types'

import React from 'react'

import { Tooltip } from '../../elements/Tooltip'
import { useFieldPath } from '../FieldPathProvider'
import { useFormFields, useFormSubmitted } from '../Form/context'
import './index.scss'

const baseClass = 'field-error'

const Error: React.FC<ErrorProps> = (props) => {
  const {
    alignCaret = 'right',
    message: messageFromProps,
    path: pathFromProps,
    showError: showErrorFromProps,
  } = props

  const { path: pathFromContext } = useFieldPath()
  const path = pathFromProps || pathFromContext

  const hasSubmitted = useFormSubmitted()
  const field = useFormFields(([fields]) => (fields && fields?.[path]) || null)

  const { errorMessage, valid } = field || {}

  const message = messageFromProps || errorMessage
  const showMessage = showErrorFromProps || (hasSubmitted && !valid)

  if (showMessage) {
    return (
      <Tooltip alignCaret={alignCaret} className={baseClass} delay={0}>
        {message}
      </Tooltip>
    )
  }

  return null
}

export default Error
