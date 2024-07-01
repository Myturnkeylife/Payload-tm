import type { TextareaField } from 'payload'

import { withMergedProps } from '@payloadcms/ui/shared'

import { MetaDescriptionComponent } from './MetaDescriptionComponent.js'

interface FieldFunctionProps {
  hasGenerateFn?: boolean
  overrides?: Partial<TextareaField>
}

type FieldFunction = ({ hasGenerateFn, overrides }: FieldFunctionProps) => TextareaField

export const MetaDescription: FieldFunction = ({ hasGenerateFn = false, overrides }) => {
  return {
    name: 'description',
    type: 'textarea',
    admin: {
      components: {
        Field: withMergedProps({
          Component: MetaDescriptionComponent,
          sanitizeServerOnlyProps: true,
          toMergeIntoProps: {
            hasGenerateDescriptionFn: hasGenerateFn,
          },
        }),
      },
    },
    localized: true,
    ...((overrides as unknown as TextareaField) ?? {}),
  }
}
