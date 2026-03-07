import test, { expect } from "@playwright/test";
import { exec } from "node:child_process";

const nameFieldRequiredMessage: string = 'Name is required';
const nameValidationErrorMessage: string = 'Name has to be from 2 to 20 characters long';
const nameInvalidMessage: string = 'Name is invalid';

const lastNameFieldRequiredMessage: string = 'Last name is required';
const lastNameValidationErrorMessage: string = 'Last name has to be from 2 to 20 characters long';
const lastNameInvalidMessage: string = 'Last name is invalid';

const emailFieldRequired: string = 'Email required';
const emailValidationErrorMessage: string = 'Email is incorrect';

const passwordFieldRequired: string = 'Password required'
const passwordValidationErrorMessage: string = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';

const reEnterPasswordRequired: string = 'Re-enter password required';
const reEnterPasswordValidationMessage: string = 'Passwords do not match';


test.describe('Sign up tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    })

    test('Succesful registration', async ({ page }) => {
        await page.getByRole('button', { name: 'Sign up' }).click();
        await page.locator('#signupName').fill('Name');
        await page.locator('#signupLastName').fill('Last');
        await page.locator('#signupEmail').fill(`aqa-mapema6818+${Date.now()}@alibto.com`);
        await page.locator('#signupPassword').fill('R7mQ2xLp9A');
        await page.locator('#signupRepeatPassword').fill('R7mQ2xLp9A');
        await page.getByRole('button', { name: 'Register' }).click();
        await expect(await page.locator('h1')).toHaveText('Garage');
    })

    test.describe('Open/close the Registration pop-up', () => {
        test('Open the Registration pop-up', async ({ page }) => {
            await page.getByRole('button', { name: 'Sign up' }).click();
            await expect(page.locator('div.modal-content')).toBeVisible();
        })

        test('Close the Registration pop-up by "x" button', async ({ page }) => {
            await page.getByRole('button', { name: 'Sign up' }).click();
            await page.getByRole('button', { name: 'Close' }).click();
            await expect(page.locator('div.modal-content')).not.toBeVisible();
        })
    })

    test.describe('Name field validation', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'Sign up' }).click();
        })
        test('First Name with 2 letters', async ({ page }) => {
            await page.locator('#signupName').fill('aa');
            await page.locator('#signupName').blur();
            await expect(await page.locator('.invalid-feedback')).not.toBeVisible();
        })

        test('First Name with 20 letters', async ({ page }) => {
            await page.locator('#signupName').fill('qwertyuiolkjhgfdsazx');
            await page.locator('#signupName').blur();
            await expect(await page.locator('.invalid-feedback')).not.toBeVisible();
        })

        test('First Name field is empty', async ({ page }) => {
            // Test fails because of incorrect error Message
            await page.locator('#signupName').fill('');
            await page.locator('#signupName').blur();
            await expect(await page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(await page.locator('.invalid-feedback')).toHaveText(nameFieldRequiredMessage);
        })

        test('First Name field with one symbol', async ({ page }) => {
            await page.locator('#signupName').fill('a');
            await page.locator('#signupName').blur();
            await expect(await page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(await page.locator('.invalid-feedback')).toHaveText(nameValidationErrorMessage);
        })

        test('First Name with 21 letters', async ({ page }) => {
            await page.locator('#signupName').fill('qwertyuiolkjhgfdsazxa');
            await page.locator('#signupName').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(nameValidationErrorMessage);
        })

        test('First Name with a space', async ({ page }) => {
            await page.locator('#signupName').fill('qw ea');
            await page.locator('#signupName').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(nameInvalidMessage);
            await expect(await page.locator('#signupName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        })

        test('First Name with special symbols', async ({ page }) => {
            await page.locator('#signupName').fill('awe$');
            await page.locator('#signupName').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(nameInvalidMessage);
        })

        test('First Name with spaces', async ({ page }) => {
            // Test should fail because the app isn't allow trim the spaces
            await page.locator('#signupName').fill(' aa ');
            await page.locator('#signupName').blur();
            await expect(await page.locator('.invalid-feedback')).not.toBeVisible();
        })
    })

    test.describe('Last name validation', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'Sign up' }).click();
        })

        test('Last Name with 2 letters', async ({ page }) => {
            await page.locator('#signupLastName').fill('aa');
            await page.locator('#signupLastName').blur();
            await expect(await page.locator('.invalid-feedback')).not.toBeVisible();
        })

        test('Last Name with 20 letters', async ({ page }) => {
            await page.locator('#signupLastName').fill('qwertyuiolkjhgfdsazx');
            await page.locator('#signupLastName').blur();
            await expect(await page.locator('.invalid-feedback')).not.toBeVisible();
        })

        test('Last Name field is empty', async ({ page }) => {
            // Test fails because the error text is different from requirements
            await page.locator('#signupLastName').fill('');
            await page.locator('#signupLastName').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(lastNameFieldRequiredMessage);
        })

        test('Last Name field with one symbol', async ({ page }) => {
            await page.locator('#signupLastName').fill('a');
            await page.locator('#signupLastName').blur();
            await expect(await page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(await page.locator('.invalid-feedback')).toHaveText(lastNameValidationErrorMessage);
        })

        test('Last Name with 21 letters', async ({ page }) => {
            await page.locator('#signupLastName').fill('qwertyuiolkjhgfdsazxa');
            await page.locator('#signupLastName').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(lastNameValidationErrorMessage);
        })

        test('Last Name with a space', async ({ page }) => {
            await page.locator('#signupLastName').fill('qw ea');
            await page.locator('#signupLastName').blur();
            await expect(await page.locator('#signupLastName')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(await page.locator('.invalid-feedback')).toHaveText(lastNameInvalidMessage);
        })

        test('Last Name with special symbols', async ({ page }) => {
            await page.locator('#signupLastName').fill('awe$');
            await page.locator('#signupLastName').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(lastNameInvalidMessage);
        })

        test('First Name with spaces', async ({ page }) => {
            // Test should fail because the app isn't allow trim the spaces
            await page.locator('#signupLastName').fill(' aa ');
            await page.locator('#signupLastName').blur();
            await expect(await page.locator('.invalid-feedback')).not.toBeVisible();;
        })
    })

    test.describe('Email field validation', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'Sign up' }).click();
        })

        test('Email field is empty', async ({ page }) => {
            await page.locator('#signupEmail').fill('');
            await page.locator('#signupEmail').blur();
            await expect(await page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(await page.locator('.invalid-feedback')).toHaveText(emailFieldRequired);
        })

        test('Email without "@" symbol', async ({ page }) => {
            await page.locator('#signupEmail').fill('asdf.gmail.com');
            await page.locator('#signupEmail').blur();
            await expect(await page.locator('#signupEmail')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(await page.locator('.invalid-feedback')).toHaveText(emailValidationErrorMessage);
        })

        test('Email with 2 "@" symbols', async ({ page }) => {
            await page.locator('#signupEmail').fill('as@d@f.gmail.com');
            await page.locator('#signupEmail').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(emailValidationErrorMessage);
        })

        test('Email without "." symbol in domain', async ({ page }) => {
            await page.locator('#signupEmail').fill('asdf@gmailcom');
            await page.locator('#signupEmail').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(emailValidationErrorMessage);
        })

        test('Email without text before "@" symbol', async ({ page }) => {
            await page.locator('#signupEmail').fill('@gmail.com');
            await page.locator('#signupEmail').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(emailValidationErrorMessage);
        })

        test('Email without letters between "@" and "." symbols', async ({ page }) => {
            await page.locator('#signupEmail').fill('asdf@.com');
            await page.locator('#signupEmail').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(emailValidationErrorMessage);
        })

        test('Email with cyrillic symbols', async ({ page }) => {
            // Test fails because it allows to enter email with cyrillic symbols
            await page.locator('#signupEmail').fill('ййййй@gmail.com');
            await page.locator('#signupEmail').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(emailValidationErrorMessage);
        })
    })

    test.describe('Password field validation', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'Sign up' }).click();
        })

        test('Valid password with a length of 8 symbols', async ({ page }) => {
            await page.locator('#signupPassword').fill('aA123456');
            await page.locator('#signupPassword').blur();
            await expect(await page.locator('.invalid-feedback')).not.toBeVisible();
        })

        test('Valid password with a length of 15 symbols', async ({ page }) => {
            await page.locator('#signupPassword').fill('aA123456aA12345');
            await page.locator('#signupPassword').blur();
            await expect(await page.locator('.invalid-feedback')).not.toBeVisible();
        })

        test('Password with 7 letters', async ({ page }) => {
            await page.locator('#signupPassword').fill('aaaaaaa');
            await page.locator('#signupPassword').blur();
            await expect(await page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(await page.locator('.invalid-feedback')).toHaveText(passwordValidationErrorMessage);
        })

        test('Password with 16 letters', async ({ page }) => {
            await page.locator('#signupPassword').fill('aaaaaaaaaaaaaaaa');
            await page.locator('#signupPassword').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(passwordValidationErrorMessage);
        })

        test('Password with 8 letters without a capital letter and without a digit', async ({ page }) => {
            await page.locator('#signupPassword').fill('aaaaaaaa');
            await page.locator('#signupPassword').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(passwordValidationErrorMessage);
        })

        test('Password with 8 letters with a capital letter, but without a digit', async ({ page }) => {
            await page.locator('#signupPassword').fill('aaaaaaaA');
            await page.locator('#signupPassword').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(passwordValidationErrorMessage);
        })

        test('Password with 8 letters with a digit, but without a capital letter', async ({ page }) => {
            await page.locator('#signupPassword').fill('aaaaaaa1');
            await page.locator('#signupPassword').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(passwordValidationErrorMessage);
        })

        test('Password with 8 letters with all capital letters', async ({ page }) => {
            await page.locator('#signupPassword').fill('AAAAAAAA');
            await page.locator('#signupPassword').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(passwordValidationErrorMessage);
        })

        test('Password with 8 letters with all digits', async ({ page }) => {
            await page.locator('#signupPassword').fill('12345678');
            await page.locator('#signupPassword').blur();
            await expect(await page.locator('.invalid-feedback')).toHaveText(passwordValidationErrorMessage);
        })

        test('Password field is empty', async ({ page }) => {
            await page.locator('#signupPassword').fill('');
            await page.locator('#signupPassword').blur();
            await expect(await page.locator('#signupPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(await page.locator('.invalid-feedback')).toHaveText(passwordFieldRequired);
        })
    })

    test.describe('Repeat Password field validation', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'Sign up' }).click();
        })

        test('Empty re-enter password field', async ({ page }) => {
            await page.locator('#signupPassword').fill('A235fgee4');
            await page.locator('#signupPassword').blur();
            await page.locator('#signupRepeatPassword').fill('');
            await page.locator('#signupRepeatPassword').blur();
            await expect(await page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(await page.locator('.invalid-feedback')).toHaveText(reEnterPasswordRequired);
        })

        test('Mismatch Repeat Password', async ({ page }) => {
            await page.locator('#signupPassword').fill('A235fgee4');
            await page.locator('#signupPassword').blur();
            await page.locator('#signupRepeatPassword').fill('A23fgee4');
            await page.locator('#signupRepeatPassword').blur();
            await expect(await page.locator('#signupRepeatPassword')).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(await page.locator('.invalid-feedback')).toHaveText(reEnterPasswordValidationMessage);
        })
    })

    test.describe('Registration button test', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'Sign up' }).click();
        })

        test('The Register button is disabled when incorrect data in the Name field', async ({ page }) => {
            await page.locator('#signupName').fill('');
            await page.locator('#signupLastName').fill('Last');
            await page.locator('#signupEmail').fill(`mapema6818+${Date.now()}@alibto.com`);
            await page.locator('#signupPassword').fill('R7mQ2xLp9A');
            await page.locator('#signupRepeatPassword').fill('R7mQ2xLp9A');
            await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
        })

        test('The register button is disabled when incorrect data in the Last Name field', async ({ page }) => {
            await page.locator('#signupName').fill('Name');
            await page.locator('#signupLastName').fill('a');
            await page.locator('#signupEmail').fill(`mapema6818+${Date.now()}@alibto.com`);
            await page.locator('#signupPassword').fill('R7mQ2xLp9A');
            await page.locator('#signupRepeatPassword').fill('R7mQ2xLp9A');
            await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
        })

        test('The register button is disabled when incorrect data in the Email field', async ({ page }) => {
            await page.locator('#signupName').fill('Name');
            await page.locator('#signupLastName').fill('Last');
            await page.locator('#signupEmail').fill(`mapema6818+${Date.now()}@al@ibto.com`);
            await page.locator('#signupPassword').fill('R7mQ2xLp9A');
            await page.locator('#signupRepeatPassword').fill('R7mQ2xLp9A');
            await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
        })

        test('The register button is disabled when incorrect data in the Password field', async ({ page }) => {
            await page.locator('#signupName').fill('Name');
            await page.locator('#signupLastName').fill('Last');
            await page.locator('#signupEmail').fill(`mapema6818+${Date.now()}@alibto.com`);
            await page.locator('#signupPassword').fill('aa');
            await page.locator('#signupRepeatPassword').fill('R7mQ2xLp9A');
            await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
        })

        test('The register button is disabled when mismatch data in the Re-enter Password field', async ({ page }) => {
            await page.locator('#signupName').fill('Name');
            await page.locator('#signupLastName').fill('Last');
            await page.locator('#signupEmail').fill(`mapema6818+${Date.now()}@alibto.com`);
            await page.locator('#signupPassword').fill('R7mQ2xLp9A');
            await page.locator('#signupRepeatPassword').fill('R7m23Q2xLp9A');
            await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled();
        })
    })
})