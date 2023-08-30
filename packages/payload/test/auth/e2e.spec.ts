import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { AdminUrlUtil } from '../helpers/adminUrlUtil.js';
import { initPayloadE2E } from '../helpers/configHelpers.js';
import { login, saveDocAndAssert } from '../helpers.js';
import { slug } from './config.js';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

/**
 * TODO: Auth
 *   create first user
 *   unlock
 *   generate api key
 *   log out
 */

const { beforeAll, describe } = test;
let url: AdminUrlUtil;

describe('auth', () => {
  let page: Page;

  beforeAll(async ({ browser }) => {
    const { serverURL } = await initPayloadE2E(__dirname);
    url = new AdminUrlUtil(serverURL, slug);

    const context = await browser.newContext();
    page = await context.newPage();

    await login({
      page,
      serverURL,
    });
  });

  describe('authenticated users', () => {
    test('should allow change password', async () => {
      await page.goto(url.account);

      await page.locator('#change-password').click();
      await page.locator('#field-password').fill('password');
      await page.locator('#field-confirm-password').fill('password');

      await saveDocAndAssert(page);
    });

    test('should have up-to-date user in `useAuth` hook', async () => {
      await page.goto(url.account);

      await expect(await page.locator('#users-api-result')).toHaveText('Hello, world!');
      await expect(await page.locator('#use-auth-result')).toHaveText('Hello, world!');

      const field = await page.locator('#field-custom');
      await field.fill('Goodbye, world!');
      await saveDocAndAssert(page);

      await expect(await page.locator('#users-api-result')).toHaveText('Goodbye, world!');
      await expect(await page.locator('#use-auth-result')).toHaveText('Goodbye, world!');
    });
  });
});
