import { IOwner } from "@/interface/IOwner";
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
    const respAuth = await AuthService.setCookiesCompany(nameCompany, email, password) as responseAuthController
    return respAuth
  }

  static async loginCompany(email: string, password: string) {
    const respAuth = await AuthService.getCookiesCompany(email, password) as responseAuthController
    return respAuth
  }

  static async logoutCompany() {
    const respAuth = await AuthService.deleteCookiesCompany() as responseAuthController
    return respAuth
  }

  static async loginManager(email: string, password: string) {
    const respAuth = await AuthService.getCookiesManager(email, password) as responseAuthController
    return respAuth
  }

  static async logoutManager() {
    const respAuth = await AuthService.deleteCookiesManager() as responseAuthController
    return respAuth
  }
}