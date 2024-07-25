import axios from "axios"
import { IHttpService } from "./IHttpService"

// const errorAxios = {
//   data: {
//     resp: "Ocorreu um erro na conexão!"
//   }
// }


export abstract class HttpService<T> implements IHttpService<T> {
  protected _url

  constructor(url: string) {
    this._url = "http://localhost:3000/api/" + url
  }

  async get(id: string) {
    const resp = await axios.get(`${this._url}/${id}`).catch(e => errorAxios(e))
    return resp.data as { resp: string, data?: T }
  }
  async getAll() {
    const resp = await axios.get(`${this._url}`).catch(e => errorAxios(e))
    return resp.data
  }
  async putData(id: string, data: T) {
    const resp = await axios.put(`${this._url}/${id}`, { ...data }).catch(e => errorAxios(e))
    return resp.data as { resp: string, data?: T }
  }
  async postData(data: T) {
    const resp = await axios.post(`${this._url}/`, { ...data }).catch(e => errorAxios(e))
    return resp.data as { resp: string, data?: T }
  }
  async deleteData(id: string) {
    const resp = await axios.delete(`${this._url}/${id}`).catch(e => errorAxios(e))
    return resp.data as { resp: string }
  }

}
export function errorAxios(e: any) {
  console.log(e);
  return { data: { resp: "Ocorreu um erro na conexão!" } }
}
