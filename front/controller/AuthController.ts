import { IOwner } from "@/interface/IOwner";
import { LocalStorageUtils } from "../utils/LocalStorageUtils";
import { AuthService } from "@/service/AuthService";
import { IManager } from "@/interface/IManager";

interface responseAuthController {
  resp: string,
  token?: string,
  refresh?: string,
  owner?: IOwner,
  manager?: IManager
}

export abstract class AuthController {
  static async createCompany(nameCompany: string, email: string, password: string) {
    const respAuth = await AuthService.registerCompany(nameCompany, email, password) as responseAuthController
    LocalStorageUtils.saveTokens(respAuth.token!, respAuth.refresh!)
    return respAuth
  }

  static async loginAdmin(email: string, password: string) {
    const respAuth = await AuthService.loginAdmin(email, password) as responseAuthController
    if (respAuth.resp === "Success") {
      LocalStorageUtils.saveTokens(respAuth.token!, respAuth.refresh!)
    }
    return respAuth
  }

  static async loginManager(email: string, password: string) {
    const respAuth = await AuthService.loginManager(email, password) as responseAuthController
    if (respAuth.resp === "Success") {
      LocalStorageUtils.saveTokens(respAuth.token!, respAuth.refresh!)
    }
    return respAuth
  }
}