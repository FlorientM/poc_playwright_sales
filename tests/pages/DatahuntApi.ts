import { APIRequestContext, Request } from "@playwright/test";

export class DatahuntApi {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getDataFromDeliveryMethod(method: OrderDeliveryMethod) {
        //Pre Request
        let sqlQuery;
        switch(method) {
            case OrderDeliveryMethod.RESERVE_AND_COLLECT:
                sqlQuery = "SELECT DISTINCT(AdeoKey), OfferCode FROM `dfdp-datahunt-uat.datahunt_QA_views_uat.LMFR - RnC` LIMIT 50";
                break;
            case OrderDeliveryMethod.HOME_DELIVERY:
                sqlQuery = "SELECT DISTINCT(AdeoKey), OfferCode FROM `dfdp-datahunt-uat.datahunt_QA_views_uat.LMFR - SFS Std` LIMIT 50";
                break;
            default:
                throw new Error("Mode de livraison indisponible");    
        }
        
        let options = {
            data: {
                "query": sqlQuery
            }
        };

        // API call
        return this.request.post(process.env.GTDP_URL + "/api-datahunt-adeo-network/v1/query", options);
    }
}
export enum OrderDeliveryMethod {
    HOME_DELIVERY,
    RESERVE_AND_COLLECT,
}