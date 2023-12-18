import { test, expect, request } from '@playwright/test';
import { NifGenerator } from '../pages/NifGenerator';

test ("Nif Generation", async ({ request })=> {
    let getNif = new NifGenerator(request);

    let response = await getNif.getNif();
    expect(response).toBeTruthy();
    console.log(response);
});