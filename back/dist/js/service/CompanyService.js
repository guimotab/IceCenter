import { HttpService } from "./HttpService";
export class CompanyService extends HttpService {
    constructor(url = "company") {
        super(url);
    }
    static getInstance() {
        if (!this.companyService) {
            this.companyService = new CompanyService();
        }
        return this.companyService;
    }
}
//# sourceMappingURL=CompanyService.js.map