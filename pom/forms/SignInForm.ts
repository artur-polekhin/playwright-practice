import { Locator } from "@playwright/test";
import BasePage from "../pages/BasePage";

class SignInForm extends BasePage {
    public readonly emailField: Locator = this.page.getByRole('textbox', { name: 'email' });
    public readonly passwordField: Locator = this.page.getByRole('textbox', { name: 'password' });
    public readonly signInButton: Locator = this.page.getByRole('button', { name: 'Login' });

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async fillSingInForm(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
    }
}

export default SignInForm;