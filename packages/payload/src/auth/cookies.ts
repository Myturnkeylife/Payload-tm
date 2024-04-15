import type { Payload } from '../index.js'
import type { SanitizedCollectionConfig } from './../collections/config/types.js'

type CookieOptions = {
  domain?: string
  expires?: Date
  httpOnly?: boolean
  maxAge?: number
  name: string
  path?: string
  returnCookieAsObject: boolean
  sameSite?: 'Lax' | 'None' | 'Strict'
  secure?: boolean
  value?: string
}

type CookieObject = {
  Domain?: string
  HttpOnly?: boolean
  'Max-Age'?: number
  Path?: string
  SameSite?: 'Lax' | 'None' | 'Strict'
  Secure?: boolean
  expires?: string
  name: string
  value: string
}

export const generateCookie = <ReturnCookieAsString = boolean>(
  args: CookieOptions,
): ReturnCookieAsString extends true ? CookieObject : string => {
  const {
    name,
    domain,
    expires,
    httpOnly,
    maxAge,
    path,
    returnCookieAsObject,
    sameSite,
    secure: secureArg,
    value,
  } = args

  let cookieString = `${name}=${value || ''}`
  const cookieObject: CookieObject = {
    name,
    value,
  }

  const secure = secureArg || sameSite === 'None'

  function buildResponse(propertyName, value: boolean | string) {
    if (returnCookieAsObject) {
      cookieString += `; ${propertyName}${typeof value === 'string' ? `=${value}` : ''}`
    } else {
      cookieObject[propertyName] = value
    }
  }

  if (expires) buildResponse('Expires', expires.toUTCString())

  if (maxAge) buildResponse('Max-Age', maxAge.toString())

  if (domain) buildResponse('Domain', domain)

  if (path) buildResponse('Path', path)

  if (secure) buildResponse('Secure', secure)

  if (httpOnly) buildResponse('HttpOnly', httpOnly)

  if (sameSite) buildResponse('SameSite', sameSite)

  return (returnCookieAsObject ? cookieString : cookieObject) as ReturnCookieAsString extends true
    ? CookieObject
    : string
}
type GetCookieExpirationArgs = {
  /*
    The number of seconds until the cookie expires
    @default 7200 seconds (2 hours)
  */
  seconds: number
}
export const getCookieExpiration = ({ seconds = 7200 }: GetCookieExpirationArgs) => {
  const currentTime = new Date()
  currentTime.setSeconds(currentTime.getSeconds() + seconds)
  return currentTime
}

type GeneratePayloadCookieArgs = {
  /* The auth collection config */
  collectionConfig: SanitizedCollectionConfig
  /* An instance of payload */
  payload: Payload
  /* The returnAs value */
  returnCookieAsObject?: boolean
  /* The token to be stored in the cookie */
  token: string
}
export const generatePayloadCookie = <T extends GeneratePayloadCookieArgs>({
  collectionConfig,
  payload,
  returnCookieAsObject = true,
  token,
}: T): T['returnCookieAsObject'] extends true ? CookieObject : string => {
  const sameSite =
    typeof collectionConfig.auth.cookies.sameSite === 'string'
      ? collectionConfig.auth.cookies.sameSite
      : collectionConfig.auth.cookies.sameSite
        ? 'Strict'
        : undefined

  return generateCookie<T['returnCookieAsObject']>({
    name: `${payload.config.cookiePrefix}-token`,
    domain: collectionConfig.auth.cookies.domain ?? undefined,
    expires: getCookieExpiration({ seconds: collectionConfig.auth.tokenExpiration }),
    httpOnly: true,
    path: '/',
    returnCookieAsObject,
    sameSite,
    secure: collectionConfig.auth.cookies.secure,
    value: token,
  })
}

export const generateExpiredPayloadCookie = <T extends Omit<GeneratePayloadCookieArgs, 'token'>>({
  collectionConfig,
  payload,
  returnCookieAsObject = true,
}: T): T['returnCookieAsObject'] extends true ? CookieObject : string => {
  const sameSite =
    typeof collectionConfig.auth.cookies.sameSite === 'string'
      ? collectionConfig.auth.cookies.sameSite
      : collectionConfig.auth.cookies.sameSite
        ? 'Strict'
        : undefined

  const expires = new Date(Date.now() - 1000)

  return generateCookie<T['returnCookieAsObject']>({
    name: `${payload.config.cookiePrefix}-token`,
    domain: collectionConfig.auth.cookies.domain ?? undefined,
    expires,
    httpOnly: true,
    path: '/',
    returnCookieAsObject,
    sameSite,
    secure: collectionConfig.auth.cookies.secure,
  })
}

export const parseCookies = (headers: Request['headers']): Map<string, string> => {
  const cookieMap = new Map<string, string>()
  const cookie = headers.get('Cookie')

  if (cookie) {
    cookie.split(';').forEach((cookie) => {
      const parts = cookie.split('=')
      const key = parts.shift().trim()
      const encodedValue = parts.join('=')

      try {
        const decodedValue = decodeURI(encodedValue)
        cookieMap.set(key, decodedValue)
      } catch (e) {
        return null
      }
    })
  }

  return cookieMap
}
