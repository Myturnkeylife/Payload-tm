import type { FetchAPIFileUploadOptions } from 'payload'

import path from 'path'
import { APIError } from 'payload'

import { isEligibleRequest } from './isEligibleRequest.js'
import { processMultipart } from './processMultipart.js'
import { debugLog } from './utilities.js'

const DEFAULT_OPTIONS = {
  abortOnLimit: false,
  createParentPath: false,
  debug: false,
  fileHandler: false,
  limitHandler: false,
  parseNested: false,
  preserveExtension: false,
  responseOnLimit: 'File size limit has been reached',
  safeFileNames: false,
  tempFileDir: path.join(process.cwd(), 'tmp'),
  uploadTimeout: 60000,
  uriDecodeFileNames: false,
  useTempFiles: false,
}

export type FileShape = {
  data: Buffer
  encoding: string
  md5: Buffer | string
  mimetype: string
  mv: (filePath: string, callback: () => void) => Promise<void> | void
  name: string
  size: number
  tempFilePath: string
  truncated: boolean
}

type FetchAPIFileUploadResponseFile = {
  data: Buffer
  mimetype: string
  name: string
  size: number
  tempFilePath?: string
}

export type FetchAPIFileUploadResponse = {
  error?: APIError
  fields: Record<string, string>
  files: Record<string, FetchAPIFileUploadResponseFile>
}

type FetchAPIFileUpload = (args: {
  options?: FetchAPIFileUploadOptions
  request: Request
}) => Promise<FetchAPIFileUploadResponse>
export const fetchAPIFileUpload: FetchAPIFileUpload = async ({ options, request }) => {
  const uploadOptions: FetchAPIFileUploadOptions = { ...DEFAULT_OPTIONS, ...options }
  if (!isEligibleRequest(request)) {
    debugLog(uploadOptions, 'Request is not eligible for file upload!')
    return {
      error: new APIError('Request is not eligible for file upload', 500),
      fields: undefined,
      files: undefined,
    }
  } else {
    return processMultipart({ options: uploadOptions, request })
  }
}