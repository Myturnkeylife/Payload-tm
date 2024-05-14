import type { Page } from '@playwright/test'

import { expect, test } from '@playwright/test'
import path from 'path'
import { fileURLToPath } from 'url'

import {
  ensureAutoLoginAndCompilationIsDone,
  exactText,
  initPageConsoleErrorCatch,
  navigateToListCellLink,
  saveDocAndAssert,
} from '../helpers.js'
import { AdminUrlUtil } from '../helpers/adminUrlUtil.js'
import { initPayloadE2ENoConfig } from '../helpers/initPayloadE2ENoConfig.js'
import { POLL_TOPASS_TIMEOUT, TEST_TIMEOUT_LONG } from '../playwright.config.js'
import { mobileBreakpoint, pagesSlug, renderedPageTitleID, ssrPagesSlug } from './shared.js'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const { beforeAll, describe } = test

describe('Live Preview', () => {
  let page: Page
  let serverURL: string

  let pagesURLUtil: AdminUrlUtil
  let ssrPostsURLUtil: AdminUrlUtil

  const goToDoc = async (page: Page, urlUtil: AdminUrlUtil) => {
    await page.goto(urlUtil.list)
    await page.waitForURL(urlUtil.list)
    await navigateToListCellLink(page)
  }

  const goToCollectionPreview = async (page: Page, urlUtil: AdminUrlUtil): Promise<void> => {
    await goToDoc(page, urlUtil)
    await page.goto(`${page.url()}/preview`)
    await page.waitForURL(`**/preview`)
  }

  const goToGlobalPreview = async (page: Page, slug: string): Promise<void> => {
    const global = new AdminUrlUtil(serverURL, slug)
    const previewURL = `${global.global(slug)}/preview`
    await page.goto(previewURL)
    await page.waitForURL(previewURL)
  }

  beforeAll(async ({ browser }, testInfo) => {
    testInfo.setTimeout(TEST_TIMEOUT_LONG)
    ;({ serverURL } = await initPayloadE2ENoConfig({ dirname }))

    pagesURLUtil = new AdminUrlUtil(serverURL, pagesSlug)
    ssrPostsURLUtil = new AdminUrlUtil(serverURL, ssrPagesSlug)

    const context = await browser.newContext()
    page = await context.newPage()

    initPageConsoleErrorCatch(page)

    await ensureAutoLoginAndCompilationIsDone({ page, serverURL })
  })

  test('collection — has tab', async () => {
    await goToDoc(page, pagesURLUtil)

    const livePreviewTab = page.locator('.doc-tab', {
      hasText: exactText('Live Preview'),
    })

    await expect(() => expect(livePreviewTab).toBeTruthy()).toPass({ timeout: POLL_TOPASS_TIMEOUT })

    const href = await livePreviewTab.locator('a').first().getAttribute('href')
    const docURL = page.url()
    const pathname = new URL(docURL).pathname

    await expect(() => expect(href).toBe(`${pathname}/preview`)).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })
  })

  test('collection — has route', async () => {
    await goToCollectionPreview(page, pagesURLUtil)
    await expect(page.locator('.live-preview')).toBeVisible()
  })

  test('collection — renders iframe', async () => {
    await goToCollectionPreview(page, pagesURLUtil)
    const iframe = page.locator('iframe.live-preview-iframe')
    await expect(iframe).toBeVisible()
  })

  test('collection — re-renders iframe client-side when form state changes', async () => {
    await goToCollectionPreview(page, pagesURLUtil)

    const titleField = page.locator('#field-title')
    const frame = page.frameLocator('iframe.live-preview-iframe').first()

    await expect(titleField).toBeVisible()

    const renderedPageTitleLocator = `#${renderedPageTitleID}`

    // Forces the test to wait for the Next.js route to render before we try editing a field
    await expect(() => expect(frame.locator(renderedPageTitleLocator)).toBeVisible()).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })

    await expect(frame.locator(renderedPageTitleLocator)).toHaveText('For Testing: Home')

    const newTitleValue = 'Home (Edited)'

    await titleField.fill(newTitleValue)

    await expect(() =>
      expect(frame.locator(renderedPageTitleLocator)).toHaveText(`For Testing: ${newTitleValue}`),
    ).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })

    await saveDocAndAssert(page)
  })

  test('collection — re-render iframe server-side when autosave is made', async () => {
    await goToCollectionPreview(page, ssrPostsURLUtil)

    const titleField = page.locator('#field-title')
    const frame = page.frameLocator('iframe.live-preview-iframe').first()

    await expect(titleField).toBeVisible()

    const renderedPageTitleLocator = `#${renderedPageTitleID}`

    // Forces the test to wait for the Next.js route to render before we try editing a field
    await expect(() => expect(frame.locator(renderedPageTitleLocator)).toBeVisible()).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })

    await expect(frame.locator(renderedPageTitleLocator)).toHaveText('For Testing: SSR Home')

    const newTitleValue = 'SSR Home (Edited)'

    await titleField.fill(newTitleValue)

    await expect(() =>
      expect(frame.locator(renderedPageTitleLocator)).toHaveText(`For Testing: ${newTitleValue}`),
    ).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })

    await saveDocAndAssert(page)
  })

  test('collection — should show live-preview view-level action in live-preview view', async () => {
    await goToCollectionPreview(page, pagesURLUtil)
    await expect(page.locator('.app-header .collection-live-preview-button')).toHaveCount(1)
  })

  test('global — should show live-preview view-level action in live-preview view', async () => {
    await goToGlobalPreview(page, 'footer')
    await expect(page.locator('.app-header .global-live-preview-button')).toHaveCount(1)
  })

  test('global — has tab', async () => {
    const global = new AdminUrlUtil(serverURL, 'header')
    await page.goto(global.global('header'))
    await page.waitForURL(global.global('header'))

    const docURL = page.url()
    const pathname = new URL(docURL).pathname

    const livePreviewTab = page.locator('.doc-tab', {
      hasText: exactText('Live Preview'),
    })

    await expect(() => expect(livePreviewTab).toBeTruthy()).toPass({ timeout: POLL_TOPASS_TIMEOUT })
    const href = await livePreviewTab.locator('a').first().getAttribute('href')

    await expect(() => expect(href).toBe(`${pathname}/preview`)).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })
  })

  test('global — has route', async () => {
    const url = page.url()
    await goToGlobalPreview(page, 'header')

    await expect(() => expect(page.url()).toBe(`${url}/preview`)).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })
  })

  test('global — renders iframe', async () => {
    await goToGlobalPreview(page, 'header')
    const iframe = page.locator('iframe.live-preview-iframe')
    await expect(iframe).toBeVisible()
  })

  test('global — can edit fields', async () => {
    await goToGlobalPreview(page, 'header')
    const field = page.locator('input#field-navItems__0__link__newTab') //field-navItems__0__link__newTab
    await expect(field).toBeVisible()
    await expect(field).toBeEnabled()
    await field.check()
    await saveDocAndAssert(page)
  })

  test('properly measures iframe and displays size', async () => {
    await page.goto(pagesURLUtil.create)
    await page.waitForURL(pagesURLUtil.create)
    await page.locator('#field-title').fill('Title 3')
    await page.locator('#field-slug').fill('slug-3')

    await saveDocAndAssert(page)
    await goToCollectionPreview(page, pagesURLUtil)

    const iframe = page.locator('iframe')

    // Measure the actual iframe size and compare it with the inputs rendered in the toolbar

    const iframeSize = await iframe.boundingBox()
    const iframeWidthInPx = iframeSize?.width
    const iframeHeightInPx = iframeSize?.height

    const widthInput = page.locator('.live-preview-toolbar input[name="live-preview-width"]')

    await expect(() => expect(widthInput).toBeTruthy()).toPass({ timeout: POLL_TOPASS_TIMEOUT })
    const heightInput = page.locator('.live-preview-toolbar input[name="live-preview-height"]')

    await expect(() => expect(heightInput).toBeTruthy()).toPass({ timeout: POLL_TOPASS_TIMEOUT })

    const widthInputValue = await widthInput.getAttribute('value')
    const width = parseInt(widthInputValue)
    const heightInputValue = await heightInput.getAttribute('value')
    const height = parseInt(heightInputValue)

    // Allow a tolerance of a couple of pixels
    const tolerance = 2

    await expect(() => expect(iframeWidthInPx).toBeLessThanOrEqual(width + tolerance)).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })

    await expect(() => expect(iframeWidthInPx).toBeGreaterThanOrEqual(width - tolerance)).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })

    await expect(() => expect(iframeHeightInPx).toBeLessThanOrEqual(height + tolerance)).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })

    await expect(() => expect(iframeHeightInPx).toBeGreaterThanOrEqual(height - tolerance)).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })
  })

  test('resizes iframe to specified breakpoint', async () => {
    await page.goto(pagesURLUtil.create)
    await page.waitForURL(pagesURLUtil.create)
    await page.locator('#field-title').fill('Title 4')
    await page.locator('#field-slug').fill('slug-4')

    await saveDocAndAssert(page)
    await goToCollectionPreview(page, pagesURLUtil)

    // Check that the breakpoint select is present
    const breakpointSelector = page.locator(
      '.live-preview-toolbar-controls__breakpoint button.popup-button',
    )

    await expect(() => expect(breakpointSelector).toBeTruthy()).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })

    // Select the mobile breakpoint
    await breakpointSelector.first().click()
    await page
      .locator(`.live-preview-toolbar-controls__breakpoint button.popup-button-list__button`)
      .filter({ hasText: mobileBreakpoint.label })
      .click()

    // Make sure the value has been set
    await expect(breakpointSelector).toContainText(mobileBreakpoint.label)
    const option = page.locator(
      '.live-preview-toolbar-controls__breakpoint button.popup-button-list__button--selected',
    )
    await expect(option).toHaveText(mobileBreakpoint.label)

    // Measure the size of the iframe against the specified breakpoint
    const iframe = page.locator('iframe')

    await expect(() => expect(iframe).toBeTruthy()).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })
    const iframeSize = await iframe.boundingBox()
    const iframeWidthInPx = iframeSize?.width
    const iframeHeightInPx = iframeSize?.height
    const tolerance = 2

    await expect(() =>
      expect(iframeWidthInPx).toBeLessThanOrEqual(mobileBreakpoint.width + tolerance),
    ).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })

    await expect(() =>
      expect(iframeWidthInPx).toBeGreaterThanOrEqual(mobileBreakpoint.width - tolerance),
    ).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })

    await expect(() =>
      expect(iframeHeightInPx).toBeLessThanOrEqual(mobileBreakpoint.height + tolerance),
    ).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })

    await expect(() =>
      expect(iframeHeightInPx).toBeGreaterThanOrEqual(mobileBreakpoint.height - tolerance),
    ).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })

    // Check that the inputs have been updated to reflect the new size
    const widthInput = page.locator('.live-preview-toolbar input[name="live-preview-width"]')

    await expect(() => expect(widthInput).toBeTruthy()).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })
    const heightInput = page.locator('.live-preview-toolbar input[name="live-preview-height"]')

    await expect(() => expect(heightInput).toBeTruthy()).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })
    const widthInputValue = await widthInput.getAttribute('value')
    const width = parseInt(widthInputValue)

    await expect(() => expect(width).toBe(mobileBreakpoint.width)).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })
    const heightInputValue = await heightInput.getAttribute('value')
    const height = parseInt(heightInputValue)

    await expect(() => expect(height).toBe(mobileBreakpoint.height)).toPass({
      timeout: POLL_TOPASS_TIMEOUT,
    })
  })
})
