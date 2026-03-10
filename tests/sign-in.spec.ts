import test from "@playwright/test";
import { afterEach } from "node:test";

test.describe('Sign in tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Sign In' }).click();;
    })
    test('Successful sign in', async ({ page }) => {
        //mapema6818@alibto.com
        //R7mQ2xLp9A
        await page.getByRole('textbox', { name: 'email' }).fill('mapema6818@alibto.com');
        await page.getByRole('textbox', { name: 'password' }).fill('R7mQ2xLp9A');
        await page.getByRole('button', { name: 'Login' }).click();
    })
})