import React from 'react'
import { EmailField } from 'payload-plugin-form-builder/dist/types'
import { UseFormRegister, FieldValues, FieldErrorsImpl } from 'react-hook-form'
import { Error } from '../Error'
import { Width } from '../Width'

import classes from './index.module.scss'

export const Email = ({
  name,
  width,
  label,
  register,
  required: requiredFromProps,
  errors,
}: EmailField & {
  register: UseFormRegister<FieldValues & any>
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}) => {
  return (
    <Width width={width}>
      <div className={classes.wrap}>
        <label htmlFor={name} className={classes.label}>
          {label}
        </label>
        <input
          type="text"
          placeholder="Email"
          className={classes.input}
          id={name}
          {...register(name, { required: requiredFromProps, pattern: /^\S+@\S+$/i })}
        />
        {requiredFromProps && errors[name] && <Error />}
      </div>
    </Width>
  )
}
