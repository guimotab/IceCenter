import axios from "axios"
import env from "dotenv"
import { errorAxios } from "./HttpService"

env.config()
export class AuthService {
  static baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}api/auth`

  static async registerCompany(name: string, email: string, password: string) {
    const resp = (await axios.post(`${this.baseUrl}/company`, { name, email, password }).catch(e => errorAxios(e))).data
    return resp
  }
  static async loginAdmin(email: string, password: string) {
    const resp = (await axios.get(`${this.baseUrl}/admin/${email}/${password}`).catch(e => errorAxios(e))).data
    return resp
  }

  static async loginManager(email: string, password: string) {
    const resp = (await axios.get(`${this.baseUrl}/manager/${email}/${password}`).catch(e => errorAxios(e))).data
    return resp
  }
}