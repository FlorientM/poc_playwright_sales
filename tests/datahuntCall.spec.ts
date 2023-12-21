import { test, expect } from '@playwright/test';
import { DatahuntApi, OrderDeliveryMethod } from '../pages/DatahuntApi';
import { getEnvVariable } from '../utils/shared';

// À mettre en en-tête pour exécuter en série
test.describe.configure({mode: 'serial'});

test.describe.serial("Make an order", () => {
        let context = {};
        let jsonDatahuntRefList: any;

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
        
    // À faire : Merger Datahunt et ATP
    test('Get offer from Datahunt and validate in ATP', async({ request }) => {
        /*
        let datahunt = new DatahuntApi(request);
        
        // API Call
        let response = await datahunt.getDataFromDeliveryMethod(OrderDeliveryMethod.RESERVE_AND_COLLECT);
    
        // Asserts
        await expect(response.status()).toBe(200);

        // Data stocking for next tests
        jsonDatahuntRefList = await response.json();
        console.log(jsonDatahuntRefList);
        
        console.log(jsonDatahuntRefList[0]);
        */
    // });
    
    // test('ATP.ATP - Prevalidate offer', async({ request }) => {
        // Pre request script
        // let jsonDataFirstRef = jsonDatahuntRefList[0];
        let options = {
            headers: {
                "x-gateway-apikey": getEnvVariable('APIKEY_ATP'),
                "x-bu-code": getEnvVariable('BU')
            },
            data: {
                
                    "channel": "WEB",
                    "shoppingCartLines": [
                      {
                        "id": "1",
                        // "productReference": jsonDataFirstRef[0],
                        "productReference": '79948260',
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
        };

        // API call
        let responseATP = await request.post("https://scdp-uat1.priv.nprd.api.devportal.adeo.cloud/api-atp-available-to-promise/v1/available-to-promises", options);
        expect(responseATP.status()).toBe(200);
        let atpJson = await responseATP.json();
        // console.log('Réponse entière : ' + JSON.stringify(atpJson));
        
        let pickUpFound = false;
        let deliveryList = atpJson.deliverySimulations[0]?.availableToPromises;
        for (let index = 0; index < deliveryList.length; index++) {
          const element = deliveryList[index];
          // console.log(JSON.stringify(element.deliveryService.mode));        
          if (element.deliveryService.mode == 'PICKUP_IN_STORE') {
            pickUpFound = true;
          }
        }
        /*
        if (pickUpFound) {
          console.log('Gagné')
        } else {
          console.log('Perdu')
        }
        */
        
        let foundDelivery = deliveryList.find(x => {
          return x.deliveryService.mode == 'PICKUP_IN_STORE';
      });
        console.log(foundDelivery);

        if (foundDelivery) {
          console.log('Gagné')
        } else {
          console.log('Perdu')
        }

        /*
        let responseBody = await responseATP.json();
        console.log(responseBody);
        let order_id = responseBody.order_id;
        */
        // Asserts

        // Data stocking for next tests

    });
    
})