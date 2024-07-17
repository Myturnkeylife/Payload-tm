import type { CollectionConfig } from 'payload'

import type { User } from '../../../payload-types'

import { getTenantAdminTenantAccessIDs } from '../../utilities/getTenantAccessIDs.js'
import { createAccess } from './access/create.js'
import { readAccess } from './access/read'
import { updateAndDeleteAccess } from './access/updateAndDelete.js'
import { externalUsersLogin } from './endpoints/externalUsersLogin.js'
import { ensureUniqueUsername } from './hooks/ensureUniqueUsername.js'

const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: createAccess,
    delete: updateAndDeleteAccess,
    read: readAccess,
    update: updateAndDeleteAccess,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  endpoints: [externalUsersLogin],
  fields: [
    {
      name: 'roles',
      type: 'select',
      defaultValue: ['user'],
      hasMany: true,
      options: ['super-admin', 'user'],
    },
    {
      name: 'tenants',
      type: 'array',
      fields: [
        {
          name: 'tenant',
          type: 'relationship',
          filterOptions: ({ user }) => {
            if (!user) {
              // Would like to query where exists true on id
              // but that is not working
              return {
                id: {
                  like: '',
                },
              }
            }
            if (user?.roles?.includes('super-admin')) {
              // Would like to query where exists true on id
              // but that is not working
              return {
                id: {
                  like: '',
                },
              }
            }
            const adminTenantAccessIDs = getTenantAdminTenantAccessIDs(user as User)
            return {
              id: {
                in: adminTenantAccessIDs,
              },
            }
          },
          index: true,
          relationTo: 'tenants',
          required: true,
          saveToJWT: true,
        },
        {
          name: 'roles',
          type: 'select',
          defaultValue: ['tenant-viewer'],
          hasMany: true,
          options: ['tenant-admin', 'tenant-viewer'],
          required: true,
        },
      ],
      saveToJWT: true,
    },
    {
      name: 'username',
      type: 'text',
      hooks: {
        beforeValidate: [ensureUniqueUsername],
      },
      index: true,
    },
  ],
}

export default Users
