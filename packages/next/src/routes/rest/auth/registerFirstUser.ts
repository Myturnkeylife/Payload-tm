import httpStatus from 'http-status'
import { generatePayloadCookie } from 'payload/auth'
import { registerFirstUserOperation } from 'payload/operations'

import type { CollectionRouteHandler } from '../types'

export const registerFirstUser: CollectionRouteHandler = async ({ collection, req }) => {
  const result = await registerFirstUserOperation({
    collection,
    data: {
      email: typeof req.data?.email === 'string' ? req.data.email : '',
      password: typeof req.data?.password === 'string' ? req.data.password : '',
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
      headers: new Headers({
        'Set-Cookie': cookie,
      }),
      status: httpStatus.OK,
    },
  )
}
