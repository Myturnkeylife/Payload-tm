import type { Payload } from 'payload'

import * as AWS from '@aws-sdk/client-s3'
import path from 'path'
import { fileURLToPath } from 'url'

import { initPayloadInt } from '../helpers/initPayloadInt.js'
import { mediaSlug, mediaWithPrefixSlug, prefix } from './shared.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

let payload: Payload

describe('@payloadcms/storage-s3', () => {
  const TEST_BUCKET = process.env.S3_BUCKET
  let client: AWS.S3Client

  beforeAll(async () => {
    ;({ payload } = await initPayloadInt(dirname))

    client = new AWS.S3({
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    })

    await createTestBucket()
    await clearTestBucket()
  })

  afterAll(async () => {
    if (typeof payload.db.destroy === 'function') {
      await payload.db.destroy()
    }
  })
  afterEach(async () => {
    await clearTestBucket()
  })

  it('can upload', async () => {
    const upload = await payload.create({
      collection: mediaSlug,
      data: {},
      filePath: path.resolve(dirname, '../uploads/image.png'),
    })

    expect(upload.id).toBeTruthy()

    await verifyUploads({
      collectionSlug: mediaSlug,
      uploadId: upload.id,
    })

    expect(upload.url).toEqual(`/api/${mediaSlug}/file/${String(upload.filename)}`)
  })

  it('can upload with prefix', async () => {
    const upload = await payload.create({
      collection: mediaWithPrefixSlug,
      data: {},
      filePath: path.resolve(dirname, '../uploads/image.png'),
    })

    expect(upload.id).toBeTruthy()

    await verifyUploads({
      collectionSlug: mediaWithPrefixSlug,
      uploadId: upload.id,
      prefix,
    })
    expect(upload.url).toEqual(`/api/${mediaWithPrefixSlug}/file/${String(upload.filename)}`)
  })

  describe('R2', () => {
    it.todo('can upload')
  })

  async function createTestBucket() {
    const makeBucketRes = await client.send(new AWS.CreateBucketCommand({ Bucket: TEST_BUCKET }))

    if (makeBucketRes.$metadata.httpStatusCode !== 200) {
      throw new Error(`Failed to create bucket. ${makeBucketRes.$metadata.httpStatusCode}`)
    }
  }

  async function clearTestBucket() {
    const listedObjects = await client.send(
      new AWS.ListObjectsV2Command({
        Bucket: TEST_BUCKET,
      }),
    )

    if (!listedObjects?.Contents?.length) return

    const deleteParams = {
      Bucket: TEST_BUCKET,
      Delete: { Objects: [] },
    }

    listedObjects.Contents.forEach(({ Key }) => {
      deleteParams.Delete.Objects.push({ Key })
    })

    const deleteResult = await client.send(new AWS.DeleteObjectsCommand(deleteParams))
    if (deleteResult.Errors?.length) {
      throw new Error(JSON.stringify(deleteResult.Errors))
    }
  }

  async function verifyUploads({
    collectionSlug,
    uploadId,
    prefix = '',
  }: {
    collectionSlug: string
    prefix?: string
    uploadId: number | string
  }) {
    const uploadData = (await payload.findByID({
      collection: collectionSlug,
      id: uploadId,
    })) as unknown as { filename: string; sizes: Record<string, { filename: string }> }

    const fileKeys = Object.keys(uploadData.sizes || {}).map((key) => {
      const rawFilename = uploadData.sizes[key].filename
      return prefix ? `${prefix}/${rawFilename}` : rawFilename
    })

    fileKeys.push(`${prefix ? `${prefix}/` : ''}${uploadData.filename}`)
    try {
      for (const key of fileKeys) {
        const { $metadata } = await client.send(
          new AWS.HeadObjectCommand({ Bucket: TEST_BUCKET, Key: key }),
        )

        if ($metadata.httpStatusCode !== 200) {
          console.error('Error verifying uploads', key, $metadata)
          throw new Error(`Error verifying uploads: ${key}, ${$metadata.httpStatusCode}`)
        }

        // Verify each size was properly uploaded
        expect($metadata.httpStatusCode).toBe(200)
      }
    } catch (error: unknown) {
      console.error('Error verifying uploads:', fileKeys, error)
      throw error
    }
  }
})
