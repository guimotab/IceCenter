import { IViaCep } from "@/interface/IViaCep"
import axios from "axios"

export abstract class ViaCepService {
  private static url = "https://viacep.com.br/ws"

  static async get(cep: string) {
    const resp = await axios.get(`${ViaCepService.url}/${cep}/json`)
    return resp.data as IViaCep
  }
}