import bcrypt from "bcrypt"

export abstract class CryptoUtils{
  static async resolve(string: string, stringCrypted: string){
    return await bcrypt.compare(string, stringCrypted)
  }
  static async crypto(string: string){
    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(string, salt)
  }
}