import { IManager } from "@/interface/IManager";
import { Response } from "../utils/Response";
import { CryptoUtils } from "../utils/CryptoUtils";
import { TokenService } from "../service/TokenService";
import { LocalStorageUtils } from "../utils/LocalStorageUtils";
import { IReturnResponse } from "@/interface/IReturnResponse";

export abstract class AuthController {
  static signinAdmin() {
  }
  
  static async login(email: string, password: string, manager: IManager): Promise<IReturnResponse<string>> {
    if (manager.email === email) {
      const checkPassword = await CryptoUtils.resolve(password, manager.password)
      if (checkPassword) {
        //criaToken e salva no localStorage      
        const [token, refresh] = TokenService.createToken(manager.id).data
        LocalStorageUtils.saveTokens(token, refresh)
        return Response.return(true) 
      }
      return Response.return(false, "Senha inválida")
    }
    return Response.return(false, "Email inválido")
  }
}