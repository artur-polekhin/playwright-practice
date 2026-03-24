import test, { expect } from "@playwright/test";
import GaragePage from "../../pom/pages/GaragePage";
import SignInForm from "../../pom/forms/SignInForm";
import HomePage from "../../pom/pages/HomePage";
import { EXISTING_USER } from "../../test-data/users";



test.describe('Sign in and save storage state', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
        await page.goto('/');
        await homePage.signInButton.click();
    })
    test('Sign with existing user and save storage state', async ({ page }) => {
        await signInForm.fillSignInForm(EXISTING_USER.email, EXISTING_USER.password);
        await signInForm.signInButton.click();
        await expect(garagePage.mainTitle).toHaveText('Garage');
        await page.context().storageState({ path: './test-data/states/existingUserStorageState.json' });
    })
})