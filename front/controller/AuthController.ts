import { Response } from "../utils/Response";
import { LocalStorageUtils } from "../utils/LocalStorageUtils";
import { AuthService } from "@/service/AuthService";

export abstract class AuthController {
  static async loginAdmin(email: string, password: string) {
    const respAuth = await AuthService.loginAdmin(email, password)
    if (respAuth.resp === "Sucess") {
      LocalStorageUtils.saveTokens(respAuth.token, respAuth.refresh)
    }
    return respAuth
  }

  static async loginUser(email: string, password: string){
    if (email !== "") {
      if (password !== "") {
        const respAuth = await AuthService.loginAdmin(email, password)
        if (respAuth.resp === "Sucess") {
          //criaToken e salva no localStorage      
          LocalStorageUtils.saveTokens(respAuth.token, respAuth.refresh)
          return Response.return(true)
        }
      }
      return Response.return(false, "Senha inválida")
    }
    return Response.return(false, "Email inválido")
  }
}