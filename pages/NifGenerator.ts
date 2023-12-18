import { APIRequestContext, Request } from '@playwright/test';

export class NifGenerator {
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getNif() {
        switch (process.env.BU) {
            case "lmfr": // Pour les besoins du test
                return (await this.request.get("https://generator.avris.it/api/ES/nif")).text();
            case "lmit":
                return (await this.request.get("https://generator.avris.it/api/IT/cf")).text();
            default:
                throw new Error("Mauvaise requête");
        }
    }
}