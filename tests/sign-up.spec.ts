import test, { expect } from "@playwright/test";
import { exec } from "node:child_process";
import HomePage from "../pom/pages/HomePage";
import { afterEach } from "node:test";
import SignUpForm from "../pom/forms/SignUpForm";
import GaragePage from "../pom/pages/GaragePage";
import { EXISTING_USER } from "../test-data/users";
import { signUpValidationMessage } from "../test-data/signUpMessages";

// const nameFieldRequiredMessage: string = 'Name is required';
// const nameValidationErrorMessage: string = 'Name has to be from 2 to 20 characters long';
// const nameInvalidMessage: string = 'Name is invalid';

// const lastNameFieldRequiredMessage: string = 'Last name is required';
// const lastNameValidationErrorMessage: string = 'Last name has to be from 2 to 20 characters long';
// const lastNameInvalidMessage: string = 'Last name is invalid';

// const emailFieldRequired: string = 'Email required';
// const emailValidationErrorMessage: string = 'Email is incorrect';

// const passwordFieldRequired: string = 'Password required'
// const passwordValidationErrorMessage: string = 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';

// const reEnterPasswordRequired: string = 'Re-enter password required';
// const reEnterPasswordValidationMessage: string = 'Passwords do not match';


test.describe('Sign up tests', () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;
    let garagePage: GaragePage;
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);
        garagePage = new GaragePage(page);
        await page.goto('/');
        await homePage.signUpButton.click();

    })

    test.describe('Registration', () => {
        test('Successful registration', async ({ page }) => {
            await signUpForm.fillRegistrationForm('Name', 'Last', `aqa-mapema6818+${Date.now()}@alibto.com`, 'R7mQ2xLp9A', 'R7mQ2xLp9A');
            await signUpForm.registerButton.click();
            await expect(garagePage.mainTitle).toHaveText('Garage');
        })

        test('Registration with existing user', async ({ page }) => {
            await signUpForm.fillRegistrationForm('Name', 'Last', EXISTING_USER.email, EXISTING_USER.password, EXISTING_USER.password);
            await signUpForm.registerButton.click();
            await expect(signUpForm.alert).toHaveText(signUpValidationMessage.userAlreadyExistMessage);
        })
    })

    test.describe('Open/close the Registration pop-up', () => {
        test('Open the Registration pop-up', async ({ page }) => {
            await expect(signUpForm.signUpForm).toBeVisible();
        })

        test('Close the Registration pop-up by "x" button', async ({ page }) => {
            await signUpForm.closeButton.click();
            await expect(signUpForm.signUpForm).not.toBeVisible();
        })
    })

    test.describe('Name field validation', () => {
        test('First Name with 2 letters', async ({ page }) => {
            await signUpForm.enterName('aa');
            await expect(signUpForm.validationMessageField).not.toBeVisible();
        })

        test('First Name with 20 letters', async ({ page }) => {
            await signUpForm.enterName('qwertyuiolkjhgfdsazx');
            await expect(signUpForm.validationMessageField).not.toBeVisible();
        })

        test('First Name field is empty', async ({ page }) => {
            // The test should fail because of the incorrect error message
            await signUpForm.triggerError(signUpForm.nameField);
            await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.nameFieldRequiredMessage);
        })

        test('First Name field with one symbol', async ({ page }) => {
            await signUpForm.enterName('a');
            await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.nameValidationErrorMessage);
        })

        test('First Name with 21 letters', async ({ page }) => {
            await signUpForm.enterName('qwertyuiolkjhgfdsazxa');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.nameValidationErrorMessage);
        })

        test('First Name with a space', async ({ page }) => {
            await signUpForm.enterName('qw ea');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.nameInvalidMessage);
            await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        })

        test('First Name with special symbols', async ({ page }) => {
            await signUpForm.enterName('awe$');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.nameInvalidMessage);
        })

        test('First Name with spaces', async ({ page }) => {
            // Test should fail because the app isn't allow trim the spaces
            await signUpForm.enterName(' aa ');
            await expect(signUpForm.validationMessageField).not.toBeVisible();
        })
    })

    test.describe('Last name validation', () => {
        test('Last Name with 2 letters', async ({ page }) => {
            await signUpForm.enterLastName('aa');
            await expect(signUpForm.validationMessageField).not.toBeVisible();
        })

        test('Last Name with 20 letters', async ({ page }) => {
            await signUpForm.enterLastName('qwertyuiolkjhgfdsazx');
            await expect(signUpForm.validationMessageField).not.toBeVisible();
        })

        test('Last Name field is empty', async ({ page }) => {
            // Test fails because the error text is different from requirements
            await signUpForm.triggerError(signUpForm.lastNameField);
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.lastNameFieldRequiredMessage);
        })

        test('Last Name field with one symbol', async ({ page }) => {
            await signUpForm.enterLastName('a');
            await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.lastNameValidationErrorMessage);
        })

        test('Last Name with 21 letters', async ({ page }) => {
            await signUpForm.enterLastName('qwertyuiolkjhgfdsazxa');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.lastNameValidationErrorMessage);
        })

        test('Last Name with a space', async ({ page }) => {
            await signUpForm.enterLastName('qw ea');
            await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.lastNameInvalidMessage);
        })

        test('Last Name with special symbols', async ({ page }) => {
            await signUpForm.enterLastName('awe$');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.lastNameInvalidMessage);
        })

        test('First Name with spaces', async ({ page }) => {
            // Test should fail because the app isn't allow trim the spaces
            await signUpForm.enterLastName(' awe ');
            await expect(signUpForm.validationMessageField).not.toBeVisible();;
        })
    })
    // From Email field
    test.describe('Email field validation', () => {
        test('Email field is empty', async ({ page }) => {
            await signUpForm.triggerError(signUpForm.emailField);
            await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailFieldRequired);
        })

        test('Email without "@" symbol', async ({ page }) => {
            await signUpForm.enterEmail('"@"');
            await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailValidationErrorMessage);
        })

        test('Email with 2 "@" symbols', async ({ page }) => {
            await signUpForm.enterEmail('@');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailValidationErrorMessage);
        })

        test('Email without "." symbol in domain', async ({ page }) => {
            await signUpForm.enterEmail('asdf@gmailcom');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailValidationErrorMessage);
        })

        test('Email without text before "@" symbol', async ({ page }) => {
            await signUpForm.enterEmail('@gmail.com');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailValidationErrorMessage);
        })

        test('Email without letters between "@" and "." symbols', async ({ page }) => {
            await signUpForm.enterEmail('asdf@.com');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailValidationErrorMessage);
        })

        test('Email with cyrillic symbols', async ({ page }) => {
            // Test fails because it allows to enter email with cyrillic symbols
            await signUpForm.enterEmail('ййййй@gmail.com');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailValidationErrorMessage);
        })
    })

    test.describe('Password field validation', () => {
        test('Valid password with a length of 8 symbols', async ({ page }) => {
            await signUpForm.enterPassword('aA123456');
            await expect(signUpForm.validationMessageField).not.toBeVisible();
        })

        test('Valid password with a length of 15 symbols', async ({ page }) => {
            await signUpForm.enterPassword('aA123456aA12345');
            await expect(signUpForm.validationMessageField).not.toBeVisible();
        })

        test('Password with 7 letters', async ({ page }) => {
            await signUpForm.enterPassword('aaaaaaa');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);

        })

        test('Password with 16 letters', async ({ page }) => {
            await signUpForm.enterPassword('aaaaaaaaaaaaaaaa');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);
        })

        test('Password with 8 letters without a capital letter and without a digit', async ({ page }) => {
            await signUpForm.enterPassword('aaaaaaaa');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);
        })

        test('Password with 8 letters with a capital letter, but without a digit', async ({ page }) => {
            await signUpForm.enterPassword('aaaaaaaA');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);
        })

        test('Password with 8 letters with a digit, but without a capital letter', async ({ page }) => {
            await signUpForm.enterPassword('aaaaaaa1');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);
        })

        test('Password with 8 letters with all capital letters', async ({ page }) => {
            await signUpForm.enterPassword('AAAAAAAA');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);
        })

        test('Password with 8 letters with all digits', async ({ page }) => {
            await signUpForm.enterPassword('12345678');
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);
        })

        test('Password field is empty', async ({ page }) => {
            await signUpForm.triggerError(signUpForm.passwordField);
            await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordFieldRequired);
        })
    })

    test.describe('Repeat Password field validation', () => {
        test('Empty re-enter password field', async ({ page }) => {
            await signUpForm.enterPassword('A235fgee4');
            await signUpForm.triggerError(signUpForm.repeatPasswordField);
            await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.repeatPasswordRequired);
        })

        test('Mismatch Repeat Password', async ({ page }) => {
            await signUpForm.enterPassword('A235fgee4');
            await signUpForm.enterRepeatPassword('A23fgee4');
            await expect(signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(signUpForm.validationMessageField).toHaveText(signUpValidationMessage.repeatPasswordValidationMessage);
        })
    })

    test.describe('Registration button test', () => {
        test('The Register button is disabled when incorrect data in the Name field', async ({ page }) => {
            await signUpForm.fillRegistrationForm('', 'Last', `mapema6818+${Date.now()}@alibto.com`, 'R7mQ2xLp9A', 'R7mQ2xLp9A');
            await expect(signUpForm.registerButton).toBeDisabled();

        })

        test('The register button is disabled when incorrect data in the Last Name field', async ({ page }) => {
            await signUpForm.fillRegistrationForm('Name', 'a', `mapema6818+${Date.now()}@alibto.com`, 'R7mQ2xLp9A', 'R7mQ2xLp9A');
            await expect(signUpForm.registerButton).toBeDisabled();
        })

        test('The register button is disabled when incorrect data in the Email field', async ({ page }) => {
            await signUpForm.fillRegistrationForm('Name', 'Last', `mapema6818+${Date.now()}@al@ibto.com`, 'R7mQ2xLp9A', 'R7mQ2xLp9A');
            await expect(signUpForm.registerButton).toBeDisabled();
        })

        test('The register button is disabled when incorrect data in the Password field', async ({ page }) => {
            await signUpForm.fillRegistrationForm('Name', 'Last', `mapema6818+${Date.now()}@alibto.com`, 'aa', 'R7mQ2xLp9A');
            await expect(signUpForm.registerButton).toBeDisabled();
        })

        test('The register button is disabled when mismatch data in the Re-enter Password field', async ({ page }) => {
            await signUpForm.fillRegistrationForm('Name', 'Last', `mapema6818+${Date.now()}@alibto.com`, 'R7mQ2xLp9A', 'R7m23Q2xLp9A');
            await expect(signUpForm.registerButton).toBeDisabled();
        })
    })

    test.describe('Test', () => {
        test('test', async ({ page }) => {
            // await homePage.signUpButton.click();
            // await page.getByRole('textbox', { name: 'Name' }).fill('Name');
            await page.getByLabel('Name').fill('Name');
        })
    })
})