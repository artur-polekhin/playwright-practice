import { expect } from "@playwright/test";
import { EXISTING_USER } from "../test-data/users";
import { test } from "../utils/app";
import { describe } from "node:test";

const mockUser = {
    "status": "ok",
    "data": {
        "userId": 338299,
        "photoFilename": "default-user.png",
        "name": "John",
        "lastName": "Snow",
    }
}

test.describe('Profile tests', () => {
    test.beforeEach(async ({ app }) => {
        await app.page.goto('/');
        await app.homePage.signInButton.click();
        await app.signInForm.fillSignInForm(EXISTING_USER.email, EXISTING_USER.password);
        await app.signInForm.signInButton.click();
        await expect(app.garagePage.mainTitle).toHaveText('Garage');
    })

    test('Mock user profile data', async ({ app }) => {
        await app.page.route('**/api/users/profile', route => route.fulfill({
            status: 200,
            body: JSON.stringify(mockUser)
        }));
        await app.sidebar.profileLink.click();
        //  await expect(app.profilePage.nameField).toHaveValue(`${mockUser.data.name} ${mockUser.data.lastName}`);
    })
})
