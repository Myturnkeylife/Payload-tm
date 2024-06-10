import { execSync } from 'child_process'
import ciInfo from 'ci-info'
import ConfImport from 'conf'
import { randomBytes } from 'crypto'
import { findUp } from 'find-up'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import type { Payload } from '../../types/index.js'
import type { AdminInitEvent } from './events/adminInit.js'
import type { ServerInitEvent } from './events/serverInit.js'

import { oneWayHash } from './oneWayHash.js'

const Conf = (ConfImport.default || ConfImport) as unknown as typeof ConfImport.default

export type BaseEvent = {
  ciName: null | string
  dbAdapter: string
  emailAdapter: null | string
  envID: string
  isCI: boolean
  locales: string[]
  localizationDefaultLocale: null | string
  localizationEnabled: boolean
  nodeEnv: string
  nodeVersion: string
  payloadVersion: string
  projectID: string
  uploadAdapters: string[]
}

type PackageJSON = {
  dependencies: Record<string, string | undefined>
  name: string
}

type TelemetryEvent = AdminInitEvent | ServerInitEvent

type Args = {
  event: TelemetryEvent
  payload: Payload
}

let baseEvent: BaseEvent | null = null

export const sendEvent = async ({ event, payload }: Args): Promise<void> => {
  try {
    const { packageJSON, packageJSONPath } = await getPackageJSON()

    // Only generate the base event once
    if (!baseEvent) {
      baseEvent = {
        ciName: ciInfo.isCI ? ciInfo.name : null,
        envID: getEnvID(),
        isCI: ciInfo.isCI,
        nodeEnv: process.env.NODE_ENV || 'development',
        nodeVersion: process.version,
        payloadVersion: getPayloadVersion(packageJSON),
        projectID: getProjectID(payload, packageJSON),
        ...getLocalizationInfo(payload),
        dbAdapter: payload.db.name,
        emailAdapter: payload.email?.name || null,
        uploadAdapters: payload.config.upload.adapters,
      }
    }

    if (process.env.PAYLOAD_TELEMETRY_DEBUG) {
      payload.logger.info({
        event: { ...baseEvent, ...event, packageJSONPath },
        msg: 'Telemetry Event',
      })
      return
    }

    if (payload.config.telemetry !== false) {
      await fetch('https://telemetry.payloadcms.com/events', {
        body: JSON.stringify({ ...baseEvent, ...event }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
      })
    }
  } catch (_) {
    // Eat any errors in sending telemetry event
  }
}

/**
 * This is a quasi-persistent identifier used to dedupe recurring events. It's
 * generated from random data and completely anonymous.
 */
const getEnvID = (): string => {
  const conf = new Conf()
  const ENV_ID = 'envID'

  const val = conf.get(ENV_ID)
  if (val) {
    return val as string
  }

  const generated = randomBytes(32).toString('hex')
  conf.set(ENV_ID, generated)
  return generated
}

const getProjectID = (payload: Payload, packageJSON: PackageJSON): string => {
  const projectID =
    getGitID(payload) ||
    getPackageJSONID(payload, packageJSON) ||
    payload.config.serverURL ||
    process.cwd()
  return oneWayHash(projectID, payload.secret)
}

const getGitID = (payload: Payload) => {
  try {
    const originBuffer = execSync('git config --local --get remote.origin.url', {
      stdio: 'pipe',
      timeout: 1000,
    })

    return oneWayHash(String(originBuffer).trim(), payload.secret)
  } catch (_) {
    return null
  }
}

const getPackageJSON = async (): Promise<{
  packageJSON?: PackageJSON
  packageJSONPath: string
}> => {
  let packageJSONPath = path.resolve(process.cwd(), 'package.json')

  if (!fs.existsSync(packageJSONPath)) {
    // Old logic
    const filename = fileURLToPath(import.meta.url)
    const dirname = path.dirname(filename)
    packageJSONPath = await findUp('package.json', { cwd: dirname })
    const jsonContent: PackageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf-8'))
    return { packageJSON: jsonContent, packageJSONPath }
  }

  const packageJSON: PackageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf-8'))
  return { packageJSON, packageJSONPath }
}

const getPackageJSONID = (payload: Payload, packageJSON: PackageJSON): string => {
  return oneWayHash(packageJSON.name, payload.secret)
}

export const getPayloadVersion = (packageJSON: PackageJSON): string => {
  return packageJSON?.dependencies?.payload ?? ''
}

export const getLocalizationInfo = (
  payload: Payload,
): Pick<BaseEvent, 'locales' | 'localizationDefaultLocale' | 'localizationEnabled'> => {
  if (!payload.config.localization) {
    return {
      locales: [],
      localizationDefaultLocale: null,
      localizationEnabled: false,
    }
  }

  return {
    locales: payload.config.localization.localeCodes,
    localizationDefaultLocale: payload.config.localization.defaultLocale,
    localizationEnabled: true,
  }
}
