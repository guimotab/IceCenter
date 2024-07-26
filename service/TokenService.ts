import jwt from "jsonwebtoken"
import dot from "dotenv"
import { IResponseTokenService } from "@/interface/IResponseTokenService"

dot.config()

export abstract class TokenService {

  static decodeCookie({ token }: { token: string }) {
    const secret = process.env.SECRET!
    let tokenId: { id: string }
    try {
      tokenId = jwt.verify(token, secret) as { id: string }
    } catch (err){
      console.log(err);
      return { status: false, message: "Sessão expirada" } as IResponseTokenService
    }
    return { status: true, data: tokenId } as IResponseTokenService
  }


}