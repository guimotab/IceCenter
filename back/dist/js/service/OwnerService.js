import { HttpService } from "./HttpService";
export class OwnerService extends HttpService {
    constructor(url = "owner") {
        super(url);
    }
    static getInstance() {
        if (!this.ownerService) {
            this.ownerService = new OwnerService();
        }
        return this.ownerService;
    }
}
//# sourceMappingURL=OwnerService.js.map