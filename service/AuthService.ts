import axios from "axios"
import env from "dotenv"
import { errorAxios } from "./HttpService"

env.config()
const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/"}api/auth`
export class AuthService {

  static async setCookiesCompany(name: string, email: string, password: string) {
    const resp = (await axios.post(`${baseUrl}/company`, { name, email, password }).catch(e => errorAxios(e))).data
    return resp
  }

  static async deleteCookiesCompany() {
    const resp = (await axios.delete(`${baseUrl}/company`).catch(e => errorAxios(e))).data
    return resp
  }

  static async getCookiesCompany(email: string, password: string) {
    const resp = (await axios.get(`${baseUrl}/company/${email}/${password}`).catch(e => errorAxios(e))).data
    return resp
  }

  static async deleteCookiesManager() {
    const resp = (await axios.delete(`${baseUrl}/manager`).catch(e => errorAxios(e))).data
    return resp
  }

  static async getCookiesManager(email: string, password: string) {
    const resp = (await axios.get(`${baseUrl}/manager/${email}/${password}`).catch(e => errorAxios(e))).data
    return resp
  }
}