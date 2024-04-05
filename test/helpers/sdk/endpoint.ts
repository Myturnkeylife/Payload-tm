import type { Endpoint, PayloadHandler } from 'payload/config'

import httpStatus from 'http-status'

export const handler: PayloadHandler = async ({ payload, data, user }) => {
  const method = String(data.method)

  if (typeof payload[method] === 'function') {
    try {
      const result = await payload[method]({
        ...(typeof data.args === 'object' ? data.args : {}),
        user,
      })

      return Response.json(result, {
        status: httpStatus.OK,
      })
    } catch (err) {
      payload.logger.error(err)
      return Response.json(err, {
        status: httpStatus.BAD_REQUEST,
      })
    }
  }

  return Response.json(
    {
      message: 'Payload Local API method not found.',
    },
    {
      status: httpStatus.BAD_REQUEST,
    },
  )
}

export const localAPIEndpoint: Endpoint = {
  path: '/local-api',
  method: 'post',
  handler,
}
