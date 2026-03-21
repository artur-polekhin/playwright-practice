import BasePage from "../pages/BasePage";

class EditCarForm extends BasePage {
    public readonly removeCarButton = this.page.getByRole('button', { name: 'Remove car' });
    public readonly confirmRemoveButton = this.page.getByRole('button', { name: 'Remove' });
}

export default EditCarForm;