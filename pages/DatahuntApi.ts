import { APIRequestContext, Request } from "@playwright/test";
import { getEnvVariable } from "../utils/shared";

export class DatahuntApi {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getDataFromDeliveryMethod(method: OrderDeliveryMethod) {
        //Pre Request
        let sqlQuery: string;
        switch(method) {
            case OrderDeliveryMethod.RESERVE_AND_COLLECT:
                sqlQuery = "SELECT DISTINCT(AdeoKey), OfferCode FROM `dfdp-datahunt-uat.datahunt_QA_views_uat.LMFR - RnC` LIMIT 10";
                break;
            case OrderDeliveryMethod.HOME_DELIVERY:
                sqlQuery = "SELECT DISTINCT(AdeoKey), OfferCode FROM `dfdp-datahunt-uat.datahunt_QA_views_uat.LMFR - SFS Std` LIMIT 10";
                break;
            default:
                throw new Error("Mode de livraison indisponible");    
        }
        
        const options = {
            headers: {
                "x-gateway-apikey": getEnvVariable('APIKEY_DATAHUNT'),
            },
            data: sqlQuery
            
        };        

        // API call
        return this.request.post(process.env.GTDP_URL + "/api-datahunt-adeo-network/v1/query", options);
        
    }
}
export enum OrderDeliveryMethod {
    HOME_DELIVERY,
    RESERVE_AND_COLLECT,
}