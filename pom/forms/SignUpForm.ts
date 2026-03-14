import { Locator } from "@playwright/test";
import BasePage from "../pages/BasePage";

class SignUpForm extends BasePage {
    public readonly nameField: Locator = this.page.locator('#signupName');
    public readonly lastNameField: Locator = this.page.locator('#signupLastName');
    public readonly emailField: Locator = this.page.locator('#signupEmail');
    public readonly passwordField: Locator = this.page.locator('#signupPassword');
    public readonly repeatPasswordField: Locator = this.page.locator('#signupRepeatPassword');
    public readonly validationMessageField: Locator = this.page.locator('.invalid-feedback');
    public readonly signUpForm: Locator = this.page.locator('div.modal-content');
    public readonly closeButton: Locator = this.page.getByRole('button', { name: 'Close' });
    public readonly registerButton: Locator = this.page.getByRole('button', { name: 'Register' });
    public readonly alert: Locator = this.page.locator('.alert-danger');

    async enterName(name: string) {
        await this.nameField.fill(name);
        await this.nameField.blur();
    }

    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
        await this.lastNameField.blur();
    }

    async enterEmail(email: string) {
        await this.emailField.fill(email);
        await this.emailField.blur();
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
        await this.passwordField.blur();
    }

    async enterRepeatPassword(repeatPassword: string) {
        await this.repeatPasswordField.fill(repeatPassword);
        await this.repeatPasswordField.blur();
    }


    async triggerError(locator: Locator) {
        await locator.focus();
        await locator.blur();
    }

    async fillRegistrationForm(name: string, lastName: string, email: string, password: string, repeatPassword: string) {
        await this.enterName(name);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterRepeatPassword(repeatPassword);
    }
}

export default SignUpForm;