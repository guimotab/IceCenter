import jwt from "jsonwebtoken"
import { Token } from "./Token"
import { LocalStorageUtils } from "@/utils/LocalStorageUtils"
import dot from "dotenv"

dot.config()
export abstract class TokenService {

  private static _token: Token | undefined

  static get() {
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

      const isValid = this.refreshTokenVerify()
      if (!isValid) {
        return { status: false, message: "Sessão expirada!" }
      }
      tokenId = jwt.verify(this._token.token, secret) as { id: string }

    }
    return { status: true, data: tokenId }
  }

  static deleteTokens() {
    LocalStorageUtils.deleteTokens()
    this._token = undefined
  }

  private static refreshTokenVerify() {

    const secret = process.env.NEXT_PUBLIC_SECRET!
    const refresh = process.env.NEXT_PUBLIC_REFRESH!

    try {

      const data = jwt.verify(this._token!.refresh, refresh) as { id: string }
      const idOwner = data?.id!
      this._token!.token = jwt.sign({ id: idOwner, }, secret, { expiresIn: "5m" })
      return true

    } catch {

      LocalStorageUtils.deleteTokens()
      return false

    }
  }
}