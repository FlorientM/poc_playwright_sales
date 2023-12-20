import { test, expect } from '@playwright/test';
import { DatahuntApi, OrderDeliveryMethod } from '../pages/DatahuntApi';
import { getEnvVariable } from '../utils/shared';

test.describe.serial("Make an order", () => {
        let context = {};
        let order_id: any;

        //Before Collection (pre-request script)
        /*
        test.beforeAll(async () => {

        });
        */
        /*
        test.describe.serial("Sub collection", () => {
            // Before SUb Collection
            
            test.beforeAll(async () => {

            });

            test("Tutu", async ({request}) => {

            })
            
        });*/
        

    test('Get offer from Datahunt', async({ request }) => {
        let datahunt = new DatahuntApi(request);
        
        // API Call
        let response = await datahunt.getDataFromDeliveryMethod(OrderDeliveryMethod.RESERVE_AND_COLLECT);
    
        // Asserts
        await expect(response.status()).toBe(200);

        // Data stocking for next tests
        order_id = await response.json();
        console.log(order_id);
        
        console.log(order_id[0]);
    });
    
    test('ATP.ATP - Prevalidate offer', async({ request }) => {
        // Pre request script
        let order_id2 = order_id[0];
        let options = {
            headers: {
                "x-gateway-apikey": getEnvVariable('APIKEY_ATP'),
                "x-bu-code": getEnvVariable('BU')
            },
            data: {
                order_id: order_id,
                body: {
                    "channel": "WEB",
                    "shoppingCartLines": [
                      {
                        "id": "1",
                        "productReference": order_id2[0],
                        "quantity": 1
                      }
                    ],
                    "customerDeliveryLocation": {
                      "countryCode": "FR",
                      "postalCode": "47000"
                    },
                    "contextStore": {
                      "id": "176",
                      "buId": "001"
                    }
                }
            }
        };

        // API call
        let response = await request.post("https://scdp-uat1.priv.nprd.api.devportal.adeo.cloud/api-atp-available-to-promise/v1/available-to-promises", options);
        console.log(await response.text());
        await expect(response.status()).toBe(200);
        console.log(response.status());

        let responseBody = await response.json();
        console.log(responseBody);
        order_id = responseBody.order_id;

        // Asserts

        // Data stocking for next tests

    });
    
})