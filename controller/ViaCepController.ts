import { ViaCepService } from "@/service/ViaCepService"

export abstract class ViaCepController {
  private static checkViaCep(cep: string){
    return true
  }
  static async getInformations(cep: string){
    const result = this.checkViaCep(cep)
    if(result){
      return await ViaCepService.get(cep)
    }
  }
}