import BasePage from "../pages/BasePage";
import { Locator } from "@playwright/test";

class Sidebar extends BasePage {
    public readonly profileLink: Locator = this.page.locator('.sidebar_btn-group >a:nth-child(1)');
}

export default Sidebar;