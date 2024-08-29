import type { ElementType, MouseEvent } from 'react'
import type React from 'react'

export type Props = {
  Link?: React.ElementType
  SubMenuPopupContent?: React.ReactNode
  'aria-label'?: string
  buttonId?: string
  buttonStyle?: 'error' | 'icon-label' | 'none' | 'pill' | 'primary' | 'secondary' | 'transparent'
  children?: React.ReactNode
  className?: string
  disabled?: boolean
  el?: 'anchor' | 'link' | ElementType
  icon?: ['chevron' | 'edit' | 'plus' | 'x'] | React.ReactNode
  iconPosition?: 'left' | 'right'
  iconStyle?: 'none' | 'with-border' | 'without-border'
  id?: string
  newTab?: boolean
  onClick?: (event: MouseEvent) => void
  round?: boolean
  size?: 'large' | 'medium' | 'small'
  to?: string
  tooltip?: string
  type?: 'button' | 'submit'
  url?: string
}
