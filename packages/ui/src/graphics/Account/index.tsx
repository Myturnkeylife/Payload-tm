'use client'
import { usePathname } from 'next/navigation.js'
import React from 'react'

import { useAuth } from '../../providers/Auth/index.js'
import { useConfig } from '../../providers/Config/index.js'
import { DefaultAccountIcon } from './Default/index.js'
export { DefaultAccountIcon } from './Default/index.js'
import { GravatarAccountIcon } from './Gravatar/index.js'
export { GravatarAccountIcon } from './Gravatar/index.js'

export const Account = () => {
  const {
    admin: { avatar: Avatar },
    routes: { admin: adminRoute },
  } = useConfig()
  const { user } = useAuth()
  const pathname = usePathname()

  const isOnAccountPage = pathname === `${adminRoute}/account`

  if (!user?.email || Avatar === 'default') return <DefaultAccountIcon active={isOnAccountPage} />
  if (Avatar === 'gravatar') return <GravatarAccountIcon />
  if (Avatar) return <Avatar active={isOnAccountPage} />
  return <DefaultAccountIcon active={isOnAccountPage} />
}
