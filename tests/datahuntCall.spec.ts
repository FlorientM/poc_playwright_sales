import { test, expect } from '@playwright/test';
import { DatahuntApi, OrderDeliveryMethod } from './pages/DatahuntApi';

test.describe.serial("Make an order", () => {
        let context = {};
        let order_id: String;

        //Before Collection (pre-request script)
        /*
        test.beforeAll(async () => {

        });
        */
        test.describe.serial("Sub collection", () => {
            // Before SUb Collection
            /*
            test.beforeAll(async () => {

            });

            test("Tutu", async ({request}) => {

            })
            */
        });

    test('Get offer from Datahunt', async({ request }) => {
        let datahunt = new DatahuntApi(request);

        // API Call
        let response = await datahunt.getDataFromDeliveryMethod(OrderDeliveryMethod.RESERVE_AND_COLLECT)

        let responseBody = await response.json();

        // Asserts
        expect(response.status).toEqual(200);

        // Data stocking for next tests
        order_id = responseBody.order_id;
    });
    /*
    test('ATP.ATP - Prevalidate offer', async({ request }) => {
        // Pre request script
        let options = {
            data: {
                "order_id": order_id
            }
        };

        // API call
        let response = await request.post("", options);
        expect(response.status).toEqual(200);
        let responseBody = await response.json();
        order_id = responseBody.order_id;

        // Asserts

        // Data stocking for next tests

    });
    */
})