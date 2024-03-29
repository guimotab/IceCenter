import { LocalStorageUtils } from "../utils/LocalStorageUtils";
import { AuthService } from "@/service/AuthService";

export abstract class AuthController {
  static async createCompany(nameCompany: string, email: string, password: string) {
    const respAuth = await AuthService.registerCompany(nameCompany, email, password)
    if (respAuth.resp === "Success") {
      LocalStorageUtils.saveTokens(respAuth.token, respAuth.refresh)
    }
    return respAuth
  }

  static async loginAdmin(email: string, password: string) {
    const respAuth = await AuthService.loginAdmin(email, password)
    if (respAuth.resp === "Success") {
      LocalStorageUtils.saveTokens(respAuth.token, respAuth.refresh)
    }
    return respAuth
  }

  static async loginManager(storeId: string, email: string, password: string) {
    const respAuth = await AuthService.loginManager(storeId, email, password)
    if (respAuth.resp === "Success") {
      LocalStorageUtils.saveTokens(respAuth.token, respAuth.refresh)
    }
    return respAuth
  }
}