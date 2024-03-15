import { HttpService } from "./HttpService";
export class StoreService extends HttpService {
    constructor(url = "store") {
        super(url);
    }
    static getInstance() {
        if (!this.storeService) {
            this.storeService = new StoreService();
        }
        return this.storeService;
    }
}
//# sourceMappingURL=StoreService.js.map