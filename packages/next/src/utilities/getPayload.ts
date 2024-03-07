import type { GeneratedTypes, Payload } from 'payload'
import type { InitOptions } from 'payload/config'

import { BasePayload } from 'payload'
import WebSocket from 'ws'

let cached = global._payload

if (!cached) {
  // eslint-disable-next-line no-multi-assign
  cached = global._payload = { payload: null, promise: null }
}

export const getPayload = async (options: InitOptions): Promise<Payload> => {
  if (cached.payload) {
    const config = await options.config

    if (cached.reload) {
      if (typeof cached.payload.db.destroy === 'function') {
        await cached.payload.db.destroy()
      }

      cached.payload.config = config

      cached.payload.collections = config.collections.reduce((collections, collection) => {
        collections[collection.slug] = { config: collection }
        return collections
      }, {})

      // TODO: re-build payload.globals as well as any other properties
      // that may change on Payload singleton

      await cached.payload.db.init()
      await cached.payload.db.connect({ hotReload: true })
      cached.reload = false
    }

    return cached.payload
  }

  if (!cached.promise) {
    cached.promise = new BasePayload<GeneratedTypes>().init(options)
  }

  try {
    cached.payload = await cached.promise

    if (process.env.NODE_ENV !== 'production') {
      try {
        const ws = new WebSocket('ws://localhost:3000/_next/webpack-hmr')

        ws.onmessage = async (event) => {
          if (typeof event.data === 'string') {
            const data = JSON.parse(event.data)

            if ('action' in data && data.action === 'serverComponentChanges') {
              console.log(data)
              cached.reload = true
            }
          }
        }
      } catch (_) {
        // swallow e
      }
    }
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.payload
}
