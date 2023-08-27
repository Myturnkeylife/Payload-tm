import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { AdminUrlUtil } from '../helpers/adminUrlUtil.js';
import { initPayloadE2E } from '../helpers/configHelpers.js';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const { beforeAll, describe } = test;
let url: AdminUrlUtil;

describe('Admin Panel', () => {
  let page: Page;

  beforeAll(async ({ browser }) => {
    const { serverURL } = await initPayloadE2E(__dirname);
    url = new AdminUrlUtil(serverURL, 'posts');

    const context = await browser.newContext();
    page = await context.newPage();
  });

  test('example test', async () => {
    await page.goto(url.list);

    const textCell = page.locator('.row-1 .cell-text');
    await expect(textCell).toHaveText('example post');
  });
});
