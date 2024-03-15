import { IManager } from "../interface/IManager";
import { HttpService } from "./HttpService";

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