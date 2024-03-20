import { HttpService } from "./HttpService";
import { IManager } from "@/interface/IManager";

export class ManagerService extends HttpService<IManager> {
  private static managerService: ManagerService | undefined
  private constructor(url = "manager") {
    super(url);
  }
  static getInstance() {
    if (!this.managerService) {
      this.managerService = new ManagerService()
    }
    return this.managerService
  }

}