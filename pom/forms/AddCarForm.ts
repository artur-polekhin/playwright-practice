import { Locator } from "@playwright/test";
import BasePage from "../pages/BasePage";

class AddCarForm extends BasePage {
    public readonly formTitle: Locator = this.page.getByRole('heading', { name: 'Add a car' });
    public readonly brandDropdown: Locator = this.page.getByRole('combobox', { name: 'Brand' });
    public readonly modelDropdown: Locator = this.page.getByRole('combobox', { name: 'Model' });
    public readonly mileageField: Locator = this.page.locator('#addCarMileage');
    public readonly addCarButton: Locator = this.page.getByRole('button', { name: 'Add' });

    async addCar(brand: string, model: string, mileage: string) {
        await this.brandDropdown.selectOption(brand);
        await this.modelDropdown.selectOption(model);
        await this.mileageField.fill(mileage);
        await this.addCarButton.click();
    }
}

export default AddCarForm;