import axios from "axios"
import env from "dotenv"
import { errorAxios } from "./HttpService"

env.config()
export class AuthService {
  static baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}api/auth`

  static async setCookiesCompany(name: string, email: string, password: string) {
    const resp = (await axios.post(`${this.baseUrl}/company`, { name, email, password }).catch(e => errorAxios(e))).data
    return resp
  }

  static async deleteCookiesCompany() {
    const resp = (await axios.delete(`${this.baseUrl}/company`).catch(e => errorAxios(e))).data
    return resp
  }
  
  static async getCookiesCompany(email: string, password: string) {
    const resp = (await axios.get(`${this.baseUrl}/company/${email}/${password}`).catch(e => errorAxios(e))).data
    return resp
  }
  
  static async deleteCookiesManager() {
    const resp = (await axios.delete(`${this.baseUrl}/manager`).catch(e => errorAxios(e))).data
    return resp
  }
  
  static async getCookiesManager(email: string, password: string) {
    const resp = (await axios.get(`${this.baseUrl}/manager/${email}/${password}`).catch(e => errorAxios(e))).data
    return resp
  }
}