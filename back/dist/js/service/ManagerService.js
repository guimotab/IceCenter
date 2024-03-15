import { HttpService } from "./HttpService";
export class ManagerService extends HttpService {
    constructor(url = "manager") {
        super(url);
    }
    static getInstance() {
        if (!this.managerService) {
            this.managerService = new ManagerService();
        }
        return this.managerService;
    }
}
//# sourceMappingURL=ManagerService.js.map