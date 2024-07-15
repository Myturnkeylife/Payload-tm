import type { User } from '../../payload-types'

export const getTenantAccessIDs = (user: User | null): string[] => {
  if (!user) return []
  return (
    user?.tenants?.reduce((acc: string[], { tenant }) => {
      if (tenant) {
        acc.push(typeof tenant === 'string' ? tenant : tenant.id)
      }
      return acc
    }, []) || []
  )
}

export const getTenantAdminTenantAccessIDs = (user: User | null): string[] => {
  if (!user) return []

  return (
    user?.tenants?.reduce((acc: string[], { roles, tenant }) => {
      if (roles.includes('tenant-admin') && tenant) {
        acc.push(typeof tenant === 'string' ? tenant : tenant.id)
      }
      return acc
    }, []) || []
  )
}
