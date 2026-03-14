import test from "@playwright/test";
import { afterEach } from "node:test";
import HomePage from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";
import { EXISTING_USER } from "../test-data/users";

let homePage: HomePage;
let signInForm: SignInForm;
test.describe('Sign in tests', () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        await page.goto('/');
        await homePage.signInButton.click();

    })
    test('Successful sign in', async ({ page }) => {
        await signInForm.fillSingInForm(EXISTING_USER.email, EXISTING_USER.password);
        await signInForm.signInButton.click();
    })
})