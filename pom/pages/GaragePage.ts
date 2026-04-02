import { Locator } from "@playwright/test";
import BasePage from "./BasePage";

class GaragePage extends BasePage {
    public readonly mainTitle: Locator = this.page.locator('h1');
    public readonly addCarButton: Locator = this.page.getByRole('button', { name: 'Add car' });
    public readonly emptyCarText: Locator = this.page.locator('.panel-empty p');
    public readonly fuelExpensesLink: Locator = this.page.locator('.nav.flex-column > a:nth-child(2)');
    public readonly editCarButton: Locator = this.page.locator('.car-list li:nth-child(1) .btn-edit');

    async openGaragePage() {
        await this.page.goto('/panel/garage');
    }
}

export default GaragePage;