import jwt from "jsonwebtoken"
import env from "dotenv"
import { Token } from "./Token"
import { LocalStorageUtils } from "@/utils/LocalStorageUtils"

export abstract class TokenService{

  private static _token: Token

  static createToken(idManager: string){
    const secret = process.env.SECRET!
    const refresh = process.env.SECRET!
    const token = jwt.sign({idManager}, secret, {expiresIn: "3m"})
    const refreshToken = jwt.sign({idManager}, refresh, {expiresIn: "3m"})
    this._token = new Token(token, refreshToken)
    return {status: true, data: [this._token.token, this._token.refresh]}
  }
  
  static verify(){
    const secret = process.env.SECRET!
    const tokenIsValid = jwt.verify(this._token.token, secret)
    if(!tokenIsValid){
      const result = this.refreshTokenVerify()
      if(!result){
        return {status: false, message: "Sessão expirada!"}
      }
    }
    return {status: true}
  }
  
  private static refreshTokenVerify(){
    const refresh = process.env.SECRET!
    const refreshIsValid = jwt.verify(this._token.refresh, refresh)
    if(!refreshIsValid){
      return false
    }
    LocalStorageUtils.deleteTokens()
    return true
  }

  public static get token(): Token {
    return TokenService._token
  }

}