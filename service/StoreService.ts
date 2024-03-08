import { IStore } from "@/interface/IStore";
import { HttpService } from "./HttpService";
import axios from "axios";

export class StoreService extends HttpService<IStore> {
  private static storeService: StoreService | undefined
  private constructor(url = "store") {
    super(url);
  }
  static getInstance() {
    if (!this.storeService) {
      this.storeService = new StoreService()
    }
    return this.storeService
  }
}

