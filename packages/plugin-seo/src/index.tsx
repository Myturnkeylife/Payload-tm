import type { Config, GroupField, TabsField, TextField } from 'payload'

import { deepMergeSimple } from 'payload/shared'

import type {
  GenerateDescription,
  GenerateImage,
  GenerateTitle,
  GenerateURL,
  SEOPluginConfig,
} from './types.js'

import { MetaDescriptionField } from './fields/MetaDescription/index.js'
import { MetaImageField } from './fields/MetaImage/index.js'
import { MetaTitleField } from './fields/MetaTitle/index.js'
import { OverviewField } from './fields/Overview/index.js'
import { PreviewField } from './fields/Preview/index.js'
import { translations } from './translations/index.js'

export const seoPlugin =
  (pluginConfig: SEOPluginConfig) =>
  (config: Config): Config => {
    const seoFields: GroupField[] = [
      {
        name: 'meta',
        type: 'group',
        fields: [
          OverviewField({}),
          MetaTitleField({
            hasGenerateFn: typeof pluginConfig?.generateTitle === 'function',
            overrides: pluginConfig?.fieldOverrides?.title as unknown as TextField,
          }),
          MetaDescriptionField({
            hasGenerateFn: typeof pluginConfig?.generateDescription === 'function',
            overrides: pluginConfig?.fieldOverrides?.description,
          }),
          ...(pluginConfig?.uploadsCollection
            ? [
                MetaImageField({
                  hasGenerateFn: typeof pluginConfig?.generateImage === 'function',
                  overrides: pluginConfig?.fieldOverrides?.image,
                  relationTo: pluginConfig.uploadsCollection,
                }),
              ]
            : []),
          ...(pluginConfig?.fields || []),
          PreviewField({
            hasGenerateFn: typeof pluginConfig?.generateURL === 'function',
          }),
        ],
        interfaceName: pluginConfig.interfaceName,
        label: 'SEO',
      },
    ]

    return {
      ...config,
      collections:
        config.collections?.map((collection) => {
          const { slug } = collection
          const isEnabled = pluginConfig?.collections?.includes(slug)

          if (isEnabled) {
            if (pluginConfig?.tabbedUI) {
              // prevent issues with auth enabled collections having an email field that shouldn't be moved to the SEO tab
              const emailField =
                (collection.auth ||
                  !(typeof collection.auth === 'object' && collection.auth.disableLocalStrategy)) &&
                collection.fields?.find((field) => 'name' in field && field.name === 'email')
              const hasOnlyEmailField = collection.fields?.length === 1 && emailField

              const seoTabs: TabsField[] = hasOnlyEmailField
                ? [
                    {
                      type: 'tabs',
                      tabs: [
                        {
                          fields: seoFields,
                          label: 'SEO',
                        },
                      ],
                    },
                  ]
                : [
                    {
                      type: 'tabs',
                      tabs: [
                        // append a new tab onto the end of the tabs array, if there is one at the first index
                        // if needed, create a new `Content` tab in the first index for this collection's base fields
                        ...(collection?.fields?.[0]?.type === 'tabs' &&
                        collection?.fields?.[0]?.tabs
                          ? collection.fields[0].tabs
                          : [
                              {
                                fields: [
                                  ...(emailField
                                    ? collection.fields.filter(
                                        (field) => 'name' in field && field.name !== 'email',
                                      )
                                    : collection.fields),
                                ],
                                label: collection?.labels?.singular || 'Content',
                              },
                            ]),
                        {
                          fields: seoFields,
                          label: 'SEO',
                        },
                      ],
                    },
                  ]

              return {
                ...collection,
                fields: [
                  ...(emailField ? [emailField] : []),
                  ...seoTabs,
                  ...(collection?.fields?.[0]?.type === 'tabs' ? collection.fields.slice(1) : []),
                ],
              }
            }

            return {
              ...collection,
              fields: [...(collection?.fields || []), ...seoFields],
            }
          }

          return collection
        }) || [],
      endpoints: [
        ...(config.endpoints ?? []),
        {
          handler: async (req) => {
            const data = await req.json()

            if (data) {
              req.data = data
            }

            const result = pluginConfig.generateTitle
              ? await pluginConfig.generateTitle({
                  ...req.data,
                  req,
                } as unknown as Parameters<GenerateTitle>[0])
              : ''
            return new Response(JSON.stringify({ result }), { status: 200 })
          },
          method: 'post',
          path: '/plugin-seo/generate-title',
        },
        {
          handler: async (req) => {
            const data = await req.json()

            if (data) {
              req.data = data
            }

            const result = pluginConfig.generateDescription
              ? await pluginConfig.generateDescription({
                  ...req.data,
                  req,
                } as unknown as Parameters<GenerateDescription>[0])
              : ''
            return new Response(JSON.stringify({ result }), { status: 200 })
          },
          method: 'post',
          path: '/plugin-seo/generate-description',
        },
        {
          handler: async (req) => {
            const data = await req.json()

            if (data) {
              req.data = data
            }

            const result = pluginConfig.generateURL
              ? await pluginConfig.generateURL({
                  ...req.data,
                  req,
                } as unknown as Parameters<GenerateURL>[0])
              : ''
            return new Response(JSON.stringify({ result }), { status: 200 })
          },
          method: 'post',
          path: '/plugin-seo/generate-url',
        },
        {
          handler: async (req) => {
            const data = await req.json()

            if (data) {
              req.data = data
            }

            const result = pluginConfig.generateImage
              ? await pluginConfig.generateImage({
                  ...req.data,
                  req,
                } as unknown as Parameters<GenerateImage>[0])
              : ''
            return new Response(result, { status: 200 })
          },
          method: 'post',
          path: '/plugin-seo/generate-image',
        },
      ],
      globals:
        config.globals?.map((global) => {
          const { slug } = global
          const isEnabled = pluginConfig?.globals?.includes(slug)

          if (isEnabled) {
            if (pluginConfig?.tabbedUI) {
              const seoTabs: TabsField[] = [
                {
                  type: 'tabs',
                  tabs: [
                    // append a new tab onto the end of the tabs array, if there is one at the first index
                    // if needed, create a new `Content` tab in the first index for this global's base fields
                    ...(global?.fields?.[0].type === 'tabs' && global?.fields?.[0].tabs
                      ? global.fields[0].tabs
                      : [
                          {
                            fields: [...(global?.fields || [])],
                            label: global?.label || 'Content',
                          },
                        ]),
                    {
                      fields: seoFields,
                      label: 'SEO',
                    },
                  ],
                },
              ]

              return {
                ...global,
                fields: [
                  ...seoTabs,
                  ...(global?.fields?.[0].type === 'tabs' ? global.fields.slice(1) : []),
                ],
              }
            }

            return {
              ...global,
              fields: [...(global?.fields || []), ...seoFields],
            }
          }

          return global
        }) || [],
      i18n: {
        ...config.i18n,
        translations: deepMergeSimple(translations, config.i18n?.translations),
      },
    }
  }
