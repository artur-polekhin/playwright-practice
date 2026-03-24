import { expect } from "@playwright/test";
import { EXISTING_USER } from "../test-data/users";
import { signUpValidationMessage } from "../test-data/signUpMessages";
import { test } from "../utils/app";

test.describe('Sign up tests', () => {
    test.beforeEach(async ({ app }) => {
        await app.page.goto('/');
        await app.homePage.signUpButton.click();

    })

    test.describe('Registration', () => {
        test('Successful registration', async ({ app }) => {
            await app.signUpForm.fillRegistrationForm('Name', 'Last', `aqa-mapema6818+${Date.now()}@alibto.com`, 'R7mQ2xLp9A', 'R7mQ2xLp9A');
            await app.signUpForm.registerButton.click();
            await expect(app.garagePage.mainTitle).toHaveText('Garage');
        })

        test('Registration with existing user', async ({ app }) => {
            await app.signUpForm.fillRegistrationForm('Name', 'Last', EXISTING_USER.email, EXISTING_USER.password, EXISTING_USER.password);
            await app.signUpForm.registerButton.click();
            await expect(app.signUpForm.alert).toHaveText(signUpValidationMessage.userAlreadyExistMessage);
        })
    })

    test.describe('Open/close the Registration pop-up', () => {
        test('Open the Registration pop-up', async ({ app }) => {
            await expect(app.signUpForm.signUpForm).toBeVisible();
        })

        test('Close the Registration pop-up by "x" button', async ({ app }) => {
            await app.signUpForm.closeButton.click();
            await expect(app.signUpForm.signUpForm).not.toBeVisible();
        })
    })

    test.describe('Name field validation', () => {
        test('First Name with 2 letters', async ({ app }) => {
            await app.signUpForm.enterName('aa');
            await expect(app.signUpForm.validationMessageField).not.toBeVisible();
        })

        test('First Name with 20 letters', async ({ app }) => {
            await app.signUpForm.enterName('qwertyuiolkjhgfdsazx');
            await expect(app.signUpForm.validationMessageField).not.toBeVisible();
        })

        test('First Name field is empty', async ({ app }) => {
            // The test should fail because of the incorrect error message
            await app.signUpForm.triggerError(app.signUpForm.nameField);
            await expect(app.signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.nameFieldRequiredMessage);
        })

        test('First Name field with one symbol', async ({ app }) => {
            await app.signUpForm.enterName('a');
            await expect(app.signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.nameValidationErrorMessage);
        })

        test('First Name with 21 letters', async ({ app }) => {
            await app.signUpForm.enterName('qwertyuiolkjhgfdsazxa');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.nameValidationErrorMessage);
        })

        test('First Name with a space', async ({ app }) => {
            await app.signUpForm.enterName('qw ea');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.nameInvalidMessage);
            await expect(app.signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        })

        test('First Name with special symbols', async ({ app }) => {
            await app.signUpForm.enterName('awe$');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.nameInvalidMessage);
        })

        test('First Name with spaces', async ({ app }) => {
            // Test should fail because the app isn't allow trim the spaces
            await app.signUpForm.enterName(' aa ');
            await expect(app.signUpForm.validationMessageField).not.toBeVisible();
        })
    })

    test.describe('Last name validation', () => {
        test('Last Name with 2 letters', async ({ app }) => {
            await app.signUpForm.enterLastName('aa');
            await expect(app.signUpForm.validationMessageField).not.toBeVisible();
        })

        test('Last Name with 20 letters', async ({ app }) => {
            await app.signUpForm.enterLastName('qwertyuiolkjhgfdsazx');
            await expect(app.signUpForm.validationMessageField).not.toBeVisible();
        })

        test('Last Name field is empty', async ({ app }) => {
            // Test fails because the error text is different from requirements
            await app.signUpForm.triggerError(app.signUpForm.lastNameField);
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.lastNameFieldRequiredMessage);
        })

        test('Last Name field with one symbol', async ({ app }) => {
            await app.signUpForm.enterLastName('a');
            await expect(app.signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.lastNameValidationErrorMessage);
        })

        test('Last Name with 21 letters', async ({ app }) => {
            await app.signUpForm.enterLastName('qwertyuiolkjhgfdsazxa');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.lastNameValidationErrorMessage);
        })

        test('Last Name with a space', async ({ app }) => {
            await app.signUpForm.enterLastName('qw ea');
            await expect(app.signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.lastNameInvalidMessage);
        })

        test('Last Name with special symbols', async ({ app }) => {
            await app.signUpForm.enterLastName('awe$');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.lastNameInvalidMessage);
        })

        test('First Name with spaces', async ({ app }) => {
            // Test should fail because the app isn't allow trim the spaces
            await app.signUpForm.enterLastName(' awe ');
            await expect(app.signUpForm.validationMessageField).not.toBeVisible();;
        })
    })

    test.describe('Email field validation', () => {
        test('Email field is empty', async ({ app }) => {
            await app.signUpForm.triggerError(app.signUpForm.emailField);
            await expect(app.signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailFieldRequired);
        })

        test('Email without "@" symbol', async ({ app }) => {
            await app.signUpForm.enterEmail('"@"');
            await expect(app.signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailValidationErrorMessage);
        })

        test('Email with 2 "@" symbols', async ({ app }) => {
            await app.signUpForm.enterEmail('@');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailValidationErrorMessage);
        })

        test('Email without "." symbol in domain', async ({ app }) => {
            await app.signUpForm.enterEmail('asdf@gmailcom');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailValidationErrorMessage);
        })

        test('Email without text before "@" symbol', async ({ app }) => {
            await app.signUpForm.enterEmail('@gmail.com');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailValidationErrorMessage);
        })

        test('Email without letters between "@" and "." symbols', async ({ app }) => {
            await app.signUpForm.enterEmail('asdf@.com');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailValidationErrorMessage);
        })

        test('Email with cyrillic symbols', async ({ app }) => {
            // Test fails because it allows to enter email with cyrillic symbols
            await app.signUpForm.enterEmail('ййййй@gmail.com');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.emailValidationErrorMessage);
        })
    })

    test.describe('Password field validation', () => {
        test('Valid password with a length of 8 symbols', async ({ app }) => {
            await app.signUpForm.enterPassword('aA123456');
            await expect(app.signUpForm.validationMessageField).not.toBeVisible();
        })

        test('Valid password with a length of 15 symbols', async ({ app }) => {
            await app.signUpForm.enterPassword('aA123456aA12345');
            await expect(app.signUpForm.validationMessageField).not.toBeVisible();
        })

        test('Password with 7 letters', async ({ app }) => {
            await app.signUpForm.enterPassword('aaaaaaa');
            await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);
        })

        test('Password with 16 letters', async ({ app }) => {
            await app.signUpForm.enterPassword('aaaaaaaaaaaaaaaa');
            await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);
        })

        test('Password with 8 letters without a capital letter and without a digit', async ({ app }) => {
            await app.signUpForm.enterPassword('aaaaaaaa');
            await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);
        })

        test('Password with 8 letters with a capital letter, but without a digit', async ({ app }) => {
            await app.signUpForm.enterPassword('aaaaaaaA');
            await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);
        })

        test('Password with 8 letters with a digit, but without a capital letter', async ({ app }) => {
            await app.signUpForm.enterPassword('aaaaaaa1');
            await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);
        })

        test('Password with 8 letters with all capital letters', async ({ app }) => {
            await app.signUpForm.enterPassword('AAAAAAAA');
            await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);
        })

        test('Password with 8 letters with all digits', async ({ app }) => {
            await app.signUpForm.enterPassword('12345678');
            await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordValidationErrorMessage);
        })

        test('Password field is empty', async ({ app }) => {
            await app.signUpForm.triggerError(app.signUpForm.passwordField);
            await expect(app.signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.passwordFieldRequired);
        })
    })

    test.describe('Repeat Password field validation', () => {
        test('Empty re-enter password field', async ({ app }) => {
            await app.signUpForm.enterPassword('A235fgee4');
            await app.signUpForm.triggerError(app.signUpForm.repeatPasswordField);
            await expect(app.signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.repeatPasswordRequired);
        })

        test('Mismatch Repeat Password', async ({ app }) => {
            await app.signUpForm.enterPassword('A235fgee4');
            await app.signUpForm.enterRepeatPassword('A23fgee4');
            await expect(app.signUpForm.repeatPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(app.signUpForm.validationMessageField).toHaveText(signUpValidationMessage.repeatPasswordValidationMessage);
        })
    })

    test.describe('Registration button test', () => {
        test('The Register button is disabled when incorrect data in the Name field', async ({ app }) => {
            await app.signUpForm.fillRegistrationForm('', 'Last', `mapema6818+${Date.now()}@alibto.com`, 'R7mQ2xLp9A', 'R7mQ2xLp9A');
            await expect(app.signUpForm.registerButton).toBeDisabled();
        })

        test('The register button is disabled when incorrect data in the Last Name field', async ({ app }) => {
            await app.signUpForm.fillRegistrationForm('Name', 'a', `mapema6818+${Date.now()}@alibto.com`, 'R7mQ2xLp9A', 'R7mQ2xLp9A');
            await expect(app.signUpForm.registerButton).toBeDisabled();
        })

        test('The register button is disabled when incorrect data in the Email field', async ({ app }) => {
            await app.signUpForm.fillRegistrationForm('Name', 'Last', `mapema6818+${Date.now()}@al@ibto.com`, 'R7mQ2xLp9A', 'R7mQ2xLp9A');
            await expect(app.signUpForm.registerButton).toBeDisabled();
        })

        test('The register button is disabled when incorrect data in the Password field', async ({ app }) => {
            await app.signUpForm.fillRegistrationForm('Name', 'Last', `mapema6818+${Date.now()}@alibto.com`, 'aa', 'R7mQ2xLp9A');
            await expect(app.signUpForm.registerButton).toBeDisabled();
        })

        test('The register button is disabled when mismatch data in the Re-enter Password field', async ({ app }) => {
            await app.signUpForm.fillRegistrationForm('Name', 'Last', `mapema6818+${Date.now()}@alibto.com`, 'R7mQ2xLp9A', 'R7m23Q2xLp9A');
            await expect(app.signUpForm.registerButton).toBeDisabled();
        })
    })
})