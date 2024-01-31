import type { SanitizedCollectionConfig } from 'payload/types'

export type Props = {
  className?: string
  uploadConfig?: SanitizedCollectionConfig['upload']
  doc?: Record<string, unknown>
  fileSrc?: string
  imageCacheTag?: string
  size?: 'expand' | 'large' | 'medium' | 'small'
}
