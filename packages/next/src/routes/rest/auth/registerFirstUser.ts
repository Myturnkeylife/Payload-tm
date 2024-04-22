import httpStatus from 'http-status'
import { generatePayloadCookie } from 'payload/auth'
import { ValidationError } from 'payload/errors'
import { registerFirstUserOperation } from 'payload/operations'

import type { CollectionRouteHandler } from '../types.js'

import { headersWithCors } from '../../../utilities/headersWithCors.js'

export const registerFirstUser: CollectionRouteHandler = async ({ collection, req }) => {
  const data = req.data

  if (data?.password !== data['confirm-password']) {
    throw new ValidationError([
      {
        field: 'confirm-password',
        message: req.t('Password and confirm password fields do not match.'),
      },
    ])
  }

  const result = await registerFirstUserOperation({
    collection,
    data: {
      ...data,
      email: typeof data?.email === 'string' ? data.email : '',
      password: typeof data?.password === 'string' ? data.password : '',
    },
    req,
  })

  const cookie = generatePayloadCookie({
    collectionConfig: collection.config,
    payload: req.payload,
    token: result.token,
  })

  return Response.json(
    {
      exp: result.exp,
      // TODO(translate)
      message: 'Successfully registered first user.',
      token: result.token,
      user: result.user,
    },
    {
      headers: headersWithCors({
        headers: new Headers({
          'Set-Cookie': cookie,
        }),
        req,
      }),
      status: httpStatus.OK,
    },
  )
}
