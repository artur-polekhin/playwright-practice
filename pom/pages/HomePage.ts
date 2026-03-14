import { Locator } from "@playwright/test";
import BasePage from "./BasePage";

class HomePage extends BasePage {
    public readonly signUpButton: Locator = this.page.getByRole('button', { name: 'Sign up' });
}

export default HomePage;