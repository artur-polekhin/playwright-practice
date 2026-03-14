import { Locator } from "@playwright/test";
import BasePage from "./BasePage";

class GaragePage extends BasePage {
    public readonly mainTitle: Locator = this.page.locator('h1');
}

export default GaragePage;