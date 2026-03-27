import test, { expect } from "@playwright/test";
import { EXISTING_USER } from "../../test-data/users";
import { exec } from "node:child_process";

test.use({ storageState: './test-data/states/apiUserStorageState.json' });

test.describe('Garage API tests', () => {
    test('Get all brands', async ({ request }) => {
        const response = await request.get('/api/cars/brands');
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        expect(responseBody.data).toHaveLength(5);
    });

    test('Get all models', async ({ request }) => {
        const response = await request.get('/api/cars/models');
        const responseBody = await response.json();
        expect(response.status()).toBe(200);
        expect(responseBody.data).toHaveLength(23);
    });

    test('Get user cars', async ({ request }) => {
        const response = await request.get('/api//cars/');
        const responseBody = await response.json();
        console.log(response.status());
        console.log(responseBody);
    })

    test('Add a car "Audi TT"', async ({ request }) => {
        const response = await request.post('/api//cars/', {
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 122
            }
        });
        const responseBody = await response.json();
        console.log(response.status());
        console.log(responseBody);
        expect(response.status()).toBe(201);
        expect(responseBody.data.mileage).toBe(122);
        expect(responseBody.data.brand).toBe('Audi');
        expect(responseBody.data.model).toBe('TT');
    });

    test('Add non existing car', async ({ request }) => {
        const response = await request.post('/api//cars/', {
            data: {
                carBrandId: 100,
                carModelId: 1,
                mileage: 122
            }
        });
        const responseBody = await response.json();
        console.log(response.status());
        console.log(responseBody);
        expect(response.status()).toBe(404);
    });

    test('Add car with without carBrandId', async ({ request }) => {
        const response = await request.post('/api//cars/', {
            data: {
                carModelId: 1,
                mileage: 122
            }
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe('Car brand id is required');
    });

    test('Add car with without carModelId', async ({ request }) => {
        const response = await request.post('/api//cars/', {
            data: {
                carBrandId: 1,
                mileage: 122
            }
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe('Car model id is required');
    });

    test('Add car with without mileage', async ({ request }) => {
        const response = await request.post('/api//cars/', {
            data: {
                carBrandId: 100,
                carModelId: 1,
            }
        });
        const responseBody = await response.json();
        expect(response.status()).toBe(400);
        expect(responseBody.message).toBe('Mileage is required');
    });

    test('Remove last added car', async ({ request }) => {
        const response = await request.get('/api//cars/');
        const responseBody = await response.json();
        const cars = responseBody.data;
        console.log(cars);
        const deleteResponse = await request.delete(`/api//cars/${cars[0].id}`);
        expect(deleteResponse.status()).toBe(200);
    })
});