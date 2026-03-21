import test from "@playwright/test";
import AddCarForm from "../pom/forms/AddCarForm";
import GaragePage from "../pom/pages/GaragePage"
import HomePage from "../pom/pages/HomePage";
import SignInForm from "../pom/forms/SignInForm";
import { EXISTING_USER } from "../test-data/users";
import { faker } from "@faker-js/faker";
import { afterEach } from "node:test";
import EditCarForm from "../pom/forms/EditCarForm";

let homePage: HomePage
let signInForm: SignInForm;
let garagePage: GaragePage;
let addCarForm: AddCarForm;
let editCarForm: EditCarForm;

const cars = [
    { brand: 'Audi', model: 'TT' },
    { brand: 'BMW', model: '3' }
]

test.describe('Garage tests', () => {
    test.beforeEach(async ({ page }) => {
        garagePage = new GaragePage(page);
        addCarForm = new AddCarForm(page);
        editCarForm = new EditCarForm(page);
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        await page.goto('/');
        await homePage.signInButton.click();
        await signInForm.fillSingInForm(EXISTING_USER.email, EXISTING_USER.password);
        await signInForm.signInButton.click();
    })

    test.afterEach(async ({ }) => {
        garagePage.editCarButton.click();
        await editCarForm.removeCarButton.click();
        await editCarForm.confirmRemoveButton.click();
    })

    // test('Add "Audi TT" to garage', async ({ page }) => {
    //     await garagePage.addCarButton.click();
    //     await addCarForm.addCar('Audi', 'TT', faker.number.int({ min: 1, max: 99999 }).toString());
    // })

    // test('Add "BMW 3" to garage', async ({ page }) => {
    //     await garagePage.addCarButton.click();
    //     await addCarForm.addCar('BMW', '3', faker.number.int({ min: 1, max: 99999 }).toString());
    // })

    cars.forEach(car => {
        test(`Add "${car.brand} ${car.model}" to garage`, async ({ }) => {
            await garagePage.addCarButton.click();
            await addCarForm.addCar(car.brand, car.model, faker.number.int({ min: 1, max: 99999 }).toString());
        })
    });
})