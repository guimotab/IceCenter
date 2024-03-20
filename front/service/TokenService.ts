import jwt from "jsonwebtoken"
import { Token } from "./Token"
import { LocalStorageUtils } from "@/utils/LocalStorageUtils"
import dot from "dotenv"

export abstract class TokenService {

  private static _token: Token | undefined


  // static createToken(idManager: string) {
  //   const secret = process.env.SECRET!
  //   const refresh = process.env.SECRET!
  //   const token = jwt.sign({ idManager }, secret, { expiresIn: "3m" })
  //   const refreshToken = jwt.sign({ idManager }, refresh, { expiresIn: "3m" })
  //   this._token = new Token(token, refreshToken)
  //   return { status: true, data: [this._token.token, this._token.refresh] }
  // }


  static get() {
    dot.config()
    if (!this._token) {
      const resp = LocalStorageUtils.getTokens()
      if (!resp) {
        return { status: false, message: "Usuário não logado!", data: this._token }
      }
      this._token = new Token(resp.token, resp.refresh)
    }

    const secret = process.env.NEXT_PUBLIC_SECRET!
    let tokenId: { id: string }
    try {
      tokenId = jwt.verify(this._token.token, secret) as { id: string }

    } catch {
      const result = this.refreshTokenVerify()
      if (!result) {
        return { status: false, message: "Sessão expirada!" }
      }
      tokenId = jwt.verify(this._token.token, secret) as { id: string }
    }
    return { status: true, data: tokenId }
  }

  static resolve() {
    if (this._token) {

    }
  }

  private static refreshTokenVerify() {
    const refresh = process.env.NEXT_PUBLIC_REFRESH!
    try {
      jwt.verify(this._token!.refresh, refresh)
      return true
    } catch {
      LocalStorageUtils.deleteTokens()
      return false
    }
  }
}