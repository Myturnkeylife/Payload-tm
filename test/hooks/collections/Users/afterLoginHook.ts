import type { CollectionAfterLoginHook } from 'payload/types'

export const afterLoginHook: CollectionAfterLoginHook = async ({ req, user }) => {
  return req.payload.update({
    id: user.id,
    collection: 'hooks-users',
    data: {
      afterLoginHook: true,
    },
    req,
  })
}
