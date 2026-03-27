import test, { expect } from "@playwright/test";
import { EXISTING_USER } from "../../test-data/users";

test.describe('Sign in tests', () => {
    test('Successful sign in', async ({ request }) => {
        const signInResponse = await request.post('/api/auth/signin', {
            data: {
                email: EXISTING_USER.email,
                password: EXISTING_USER.password,
            }
        });

        const signInResponseBody = await signInResponse.json();
        expect(signInResponse.status()).toBe(200);
        expect(signInResponseBody.data.userId).toBe(EXISTING_USER.userId);
        await request.storageState({ path: './test-data/states/apiUserStorageState.json' });
    })
})