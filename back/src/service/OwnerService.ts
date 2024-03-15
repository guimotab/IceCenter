import { IOwner } from "../interface/IOwner";
import { HttpService } from "./HttpService";

export class OwnerService extends HttpService<IOwner> {
  private static ownerService: OwnerService | undefined
  private constructor(url = "owner") {
    super(url);
  }
  static getInstance() {
    if (!this.ownerService) {
      this.ownerService = new OwnerService()
    }
    return this.ownerService
  }
}