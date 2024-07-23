import jwt from "jsonwebtoken"
import { Token } from "./Token"
import { LocalStorageUtils } from "@/utils/LocalStorageUtils"
import dot from "dotenv"
import { IResponseTokenService } from "@/interface/IResponseTokenService"

dot.config()

export class TokenService {

  private static _token: Token | undefined

  constructor() {
    const resp = LocalStorageUtils.getTokens()
    if (resp) {
      TokenService._token = new Token(resp.token, resp.refresh)
    }
  }

  get() {
    if (!TokenService._token) {
      return { status: false, message: "Não logado" } as IResponseTokenService
    }

    const secret = process.env.NEXT_PUBLIC_SECRET!
    let tokenId: { id: string }

    try {

      tokenId = jwt.verify(TokenService._token.token, secret) as { id: string }

    } catch {

      const isValid = this.refreshTokenVerify()
      if (!isValid) {
        return { status: false, message: "Sessão expirada" } as IResponseTokenService
      }
      tokenId = jwt.verify(TokenService._token.token, secret) as { id: string }

    }
    return { status: true, data: tokenId } as IResponseTokenService
  }

  static deleteTokens() {
    LocalStorageUtils.deleteTokens()
    TokenService._token = undefined
  }

  private refreshTokenVerify() {

    const secret = process.env.NEXT_PUBLIC_SECRET!
    const refresh = process.env.NEXT_PUBLIC_REFRESH!

    try {

      const data = jwt.verify(TokenService._token!.refresh, refresh) as { id: string }
      const idOwner = data?.id!
      TokenService._token!.token = jwt.sign({ id: idOwner, }, secret, { expiresIn: "5m" })
      return true

    } catch (err) {

      LocalStorageUtils.deleteTokens()
      return false

    }
  }
}