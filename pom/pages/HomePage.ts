import { Locator } from "@playwright/test";
import BasePage from "./BasePage";

class HomePage extends BasePage {
    public readonly signUpButton: Locator = this.page.getByRole('button', { name: 'Sign up' });
    public readonly signInButton: Locator = this.page.getByRole('button', { name: 'Sign In' });
}

export default HomePage;