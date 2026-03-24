import { chromium } from "@playwright/test";
import { test } from "../utils/screenSizeFixture";

// test('Without fixtures', async ({ }) => {
//     const browser = await chromium.launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto('https://wikipedia.org');
// });

// test('With fixtures', async ({ page }) => {
//     await page.goto('https://wikipedia.org');
// });

test('Wikipedia on small screen', async ({ pageSmall }) => {
    await pageSmall.goto('https://wikipedia.org');
});

test('Wikipedia on medium screen', async ({ pageMedium }) => {
    await pageMedium.goto('https://wikipedia.org');
});

test('Wikipedia on large screen', async ({ pageLarge }) => {
    await pageLarge.goto('https://wikipedia.org');
});