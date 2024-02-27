const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingExcludes: {
      '**/*': ['drizzle-kit', 'drizzle-kit/utils'],
    },
    serverComponentsExternalPackages: ['drizzle-kit', 'drizzle-kit/utils', 'pino', 'pino-pretty'],
  },
  reactStrictMode: false,
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  webpack: (config) => {
    console.log(process.env.PAYLOAD_CONFIG_PATH)
    return {
      ...config,
      externals: [
        ...config.externals,
        'drizzle-kit',
        'drizzle-kit/utils',
        'pino',
        'pino-pretty',
        'sharp',
      ],
      ignoreWarnings: [
        ...(config.ignoreWarnings || []),
        { module: /node_modules\/mongodb\/lib\/utils\.js/ },
        { file: /node_modules\/mongodb\/lib\/utils\.js/ },
        { module: /node_modules\/mongodb\/lib\/bson\.js/ },
        { file: /node_modules\/mongodb\/lib\/bson\.js/ },
      ],
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@payloadcms/ui/scss': path.resolve(__dirname, './packages/ui/src/scss/styles.scss'),
          'payload-config': path.resolve(__dirname, process.env.PAYLOAD_CONFIG_PATH),
        },
        fallback: {
          ...config.resolve.fallback,
          '@aws-sdk/credential-providers': false,
          '@mongodb-js/zstd': false,
          aws4: false,
          kerberos: false,
          'mongodb-client-encryption': false,
          snappy: false,
          'supports-color': false,
          'yocto-queue': false,
        },
      },
    }
  },
}

module.exports = withBundleAnalyzer(nextConfig)
