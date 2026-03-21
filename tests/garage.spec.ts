
import { test } from "../utils/app";
import { faker } from "@faker-js/faker";
import { CARS } from "../test-data/cars";


test.use({ storageState: './test-data/states/existingUserStorageState.json' });

test.describe('Garage tests', () => {
    test.beforeEach(async ({ app }) => {
        await app.garagePage.openGaragePage();
    })

    test.afterEach(async ({ app }) => {
        await app.garagePage.editCarButton.click();
        await app.editCarForm.removeCarButton.click();
        await app.editCarForm.confirmRemoveButton.click();
    })

    CARS.forEach(car => {
        test(`Add "${car.brand} ${car.model}" to garage`, async ({ app }) => {
            await app.garagePage.addCarButton.click();
            await app.addCarForm.addCar(car.brand, car.model, faker.number.int({ min: 1, max: 99999 }).toString());
        })
    });
})