import { expect } from "@playwright/test";
import { EXISTING_USER } from "../test-data/users";
import { test } from "../utils/app";




test.describe('Sign in tests', () => {
    test.beforeEach(async ({ app }) => {
        await app.page.goto('/');
        await app.homePage.signInButton.click();

    })
    test('Successful sign in', async ({ app }) => {
        await app.page.context().storageState({ path: './test-data/states/initialStorageState.json' });
        await app.signInForm.fillSignInForm(EXISTING_USER.email, EXISTING_USER.password);
        await app.signInForm.signInButton.click();
        await expect(app.garagePage.mainTitle).toHaveText('Garage');
        await app.page.context().storageState({ path: './test-data/states/finalStorageState.json' });
    })
})