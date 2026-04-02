import { Page } from "@playwright/test";

class BasePage {
    public readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}

export default BasePage;