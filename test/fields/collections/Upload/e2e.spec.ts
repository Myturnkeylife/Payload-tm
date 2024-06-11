import type { Page } from '@playwright/test'

import { expect, test } from '@playwright/test'
import path from 'path'
import { wait } from 'payload/utilities'
import { fileURLToPath } from 'url'

import type { PayloadTestSDK } from '../../../helpers/sdk/index.js'
import type { Config } from '../../payload-types.js'

import {
  ensureAutoLoginAndCompilationIsDone,
  initPageConsoleErrorCatch,
  openDocDrawer,
  saveDocAndAssert,
} from '../../../helpers.js'
import { AdminUrlUtil } from '../../../helpers/adminUrlUtil.js'
import { initPayloadE2ENoConfig } from '../../../helpers/initPayloadE2ENoConfig.js'
import { reInitializeDB } from '../../../helpers/reInitializeDB.js'
import { RESTClient } from '../../../helpers/rest.js'
import { POLL_TOPASS_TIMEOUT, TEST_TIMEOUT_LONG } from '../../../playwright.config.js'
import { uploadsSlug } from '../../slugs.js'

const filename = fileURLToPath(import.meta.url)
const currentFolder = path.dirname(filename)
const dirname = path.resolve(currentFolder, '../../')

const { beforeAll, beforeEach, describe } = test

let payload: PayloadTestSDK<Config>
let client: RESTClient
let page: Page
let serverURL: string
// If we want to make this run in parallel: test.describe.configure({ mode: 'parallel' })
let url: AdminUrlUtil

describe('Upload', () => {
  beforeAll(async ({ browser }, testInfo) => {
    testInfo.setTimeout(TEST_TIMEOUT_LONG)
    process.env.SEED_IN_CONFIG_ONINIT = 'false' // Makes it so the payload config onInit seed is not run. Otherwise, the seed would be run unnecessarily twice for the initial test run - once for beforeEach and once for onInit
    ;({ payload, serverURL } = await initPayloadE2ENoConfig({
      dirname,
      // prebuild,
    }))
    url = new AdminUrlUtil(serverURL, uploadsSlug)

    const context = await browser.newContext()
    page = await context.newPage()
    initPageConsoleErrorCatch(page)
    await reInitializeDB({
      serverURL,
      snapshotKey: 'fieldsUploadTest',
      uploadsDir: path.resolve(dirname, './collections/Upload/uploads'),
    })
    await ensureAutoLoginAndCompilationIsDone({ page, serverURL })
  })
  beforeEach(async () => {
    await reInitializeDB({
      serverURL,
      snapshotKey: 'fieldsUploadTest',
      uploadsDir: path.resolve(dirname, './collections/Upload/uploads'),
    })

    if (client) {
      await client.logout()
    }
    client = new RESTClient(null, { defaultSlug: 'users', serverURL })
    await client.login()

    await ensureAutoLoginAndCompilationIsDone({ page, serverURL })
  })

  async function uploadImage() {
    await page.goto(url.create)

    // create a jpg upload
    await page
      .locator('.file-field__upload input[type="file"]')
      .setInputFiles(path.resolve(dirname, './collections/Upload/payload.jpg'))
    await expect(page.locator('.file-field .file-field__filename')).toHaveValue('payload.jpg')
    await saveDocAndAssert(page)
  }

  // eslint-disable-next-line playwright/expect-expect
  test('should upload files', async () => {
    await uploadImage()
  })

  // test that the image renders
  test('should render uploaded image', async () => {
    await uploadImage()
    await expect(page.locator('.file-field .file-details img')).toHaveAttribute(
      'src',
      '/api/uploads/file/payload-1.jpg',
    )
  })

  test('should upload using the document drawer', async () => {
    await uploadImage()
    await wait(1000)
    // Open the media drawer and create a png upload

    await openDocDrawer(page, '.field-type.upload .upload__toggler.doc-drawer__toggler')

    await page
      .locator('[id^=doc-drawer_uploads_1_] .file-field__upload input[type="file"]')
      .setInputFiles(path.resolve(dirname, './uploads/payload.png'))
    await expect(
      page.locator('[id^=doc-drawer_uploads_1_] .file-field__upload .file-field__filename'),
    ).toHaveValue('payload.png')
    await page.locator('[id^=doc-drawer_uploads_1_] #action-save').click()
    await expect(page.locator('.payload-toast-container')).toContainText('successfully')

    // Assert that the media field has the png upload
    await expect(
      page.locator('.field-type.upload .file-details .file-meta__url a'),
    ).toHaveAttribute('href', '/api/uploads/file/payload-1.png')
    await expect(page.locator('.field-type.upload .file-details .file-meta__url a')).toContainText(
      'payload-1.png',
    )
    await expect(page.locator('.field-type.upload .file-details img')).toHaveAttribute(
      'src',
      '/api/uploads/file/payload-1.png',
    )
    await saveDocAndAssert(page)
  })

  test('should clear selected upload', async () => {
    await uploadImage()
    await wait(1000) // TODO: Fix this. Need to wait a bit until the form in the drawer mounted, otherwise values sometimes disappear. This is an issue for all drawers

    await openDocDrawer(page, '.field-type.upload .upload__toggler.doc-drawer__toggler')

    await wait(1000)

    await page
      .locator('[id^=doc-drawer_uploads_1_] .file-field__upload input[type="file"]')
      .setInputFiles(path.resolve(dirname, './uploads/payload.png'))
    await expect(
      page.locator('[id^=doc-drawer_uploads_1_] .file-field__upload .file-field__filename'),
    ).toHaveValue('payload.png')
    await page.locator('[id^=doc-drawer_uploads_1_] #action-save').click()
    await expect(page.locator('.payload-toast-container')).toContainText('successfully')
    await page.locator('.field-type.upload .file-details__remove').click()
  })

  test('should select using the list drawer and restrict mimetype based on filterOptions', async () => {
    await uploadImage()

    await openDocDrawer(page, '.field-type.upload .upload__toggler.list-drawer__toggler')

    const jpgImages = page.locator('[id^=list-drawer_1_] .upload-gallery img[src$=".jpg"]')
    await expect
      .poll(async () => await jpgImages.count(), { timeout: POLL_TOPASS_TIMEOUT })
      .toEqual(0)
  })

  test.skip('should show drawer for input field when enableRichText is false', async () => {
    const uploads3URL = new AdminUrlUtil(serverURL, 'uploads3')
    await page.goto(uploads3URL.create)

    // create file in uploads 3 collection
    await page
      .locator('.file-field__upload input[type="file"]')
      .setInputFiles(path.resolve(dirname, './collections/Upload/payload.jpg'))
    await expect(page.locator('.file-field .file-field__filename')).toContainText('payload.jpg')
    await page.locator('#action-save').click()

    await wait(200)

    // open drawer
    await openDocDrawer(page, '.field-type.upload .list-drawer__toggler')
    // check title
    await expect(page.locator('.list-drawer__header-text')).toContainText('Uploads 3')
  })
})
