/* eslint-disable @typescript-eslint/no-floating-promises */
import fs from 'fs'
import { compile } from 'json-schema-to-typescript'
import { singular } from 'pluralize'

import type { SanitizedCollectionConfig, SanitizedGlobalConfig } from '../exports/types'

import loadConfig from '../config/load'
import { configToJSONSchema } from '../utilities/configToJSONSchema'
import { toWords } from '../utilities/formatLabels'
import Logger from '../utilities/logger'

const generateEntityDeclarations = (
  entities: (SanitizedCollectionConfig | SanitizedGlobalConfig)[],
  key: 'collections' | 'globals',
): string => {
  if (entities.length) {
    return entities.reduce((dec, entity, i) => {
      const title = entity.typescript?.interface
        ? entity.typescript.interface
        : singular(toWords(entity.slug, true))

      return `${dec}
      '${entity.slug}': ${title}${
        i + 1 === entities.length
          ? `
    }`
          : ''
      }`
    }, `    ${key}: {`)
  }

  return ''
}

export async function generateTypes(): Promise<void> {
  const logger = Logger()
  const config = await loadConfig()
  const outputFile = process.env.PAYLOAD_TS_OUTPUT_PATH || config.typescript.outputFile

  logger.info('Compiling TS types for Collections and Globals...')

  const jsonSchema = configToJSONSchema(config)

  const collectionDeclaration = generateEntityDeclarations(config.collections, 'collections')
  const globalDeclaration = generateEntityDeclarations(config.globals, 'globals')
  const declare = `declare module 'payload' {\n  export interface GeneratedTypes {\n${collectionDeclaration}\n${globalDeclaration}\n  }\n}`

  compile(jsonSchema, 'Config', {
    bannerComment:
      '/* tslint:disable */\n/* eslint-disable */\n/**\n* This file was automatically generated by Payload.\n* DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,\n* and re-run `payload generate:types` to regenerate this file.\n*/',
    style: {
      singleQuote: true,
    },
  }).then((compiled) => {
    fs.writeFileSync(outputFile, `${compiled}\n\n${declare}`)
    logger.info(`Types written to ${outputFile}`)
  })
}

// when generateTypes.js is launched directly
if (module.id === require.main.id) {
  generateTypes()
}
