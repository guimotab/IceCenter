import axios from "axios"

const errorAxios = {
  data: {
    resp: "Ocorreu um erro na conexão!"
  }
}

export class AuthService {
  static baseUrl = "http://localhost:4000/auth"

  static async registerCompany(name: string, email: string, password: string) {
    const resp = (await axios.post(`${this.baseUrl}/register`, { name, email, password }).catch(e => errorAxios)).data
    return resp
  }
  static async loginAdmin(email: string, password: string) {
    const resp = (await axios.get(`${this.baseUrl}/login/${email}/${password}`).catch(e => errorAxios)).data
    return resp
  }

  static async loginManager(email: string, password: string) {
    const resp = (await axios.get(`${this.baseUrl}/login/manager/${email}/${password}`).catch(e => errorAxios)).data
    return resp
  }
}