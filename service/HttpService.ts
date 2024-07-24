import axios from "axios"
import { IHttpService } from "./IHttpService"

const errorAxios = {
  data: {
    resp: "Ocorreu um erro na conexão!"
  }
}

export abstract class HttpService<T> implements IHttpService<T> {
  private _url

  constructor(url: string) {
    this._url = "http://localhost:3000/" + url
  }

  async get(id: string) {
    const resp = await axios.get(`${this._url}/${id}`).catch(e => errorAxios)
    return resp.data as { resp: string, data?: T }
  }
  async getAll() {
    const resp = await axios.get(`${this._url}`).catch(e => errorAxios)
    return resp.data
  }
  async putData(id: string, data: T) {
    const resp = await axios.put(`${this._url}/${id}`, { data: data }).catch(e => errorAxios)
    return resp.data as { resp: string, data?: T }
  }
  async postData(url: string, data: T) {
    const resp = await axios.post(`${this._url}/${url}`, { data: data }).catch(e => errorAxios)
    return resp.data as { resp: string, data?: T }
  }
  async deleteData(id: string) {
    const resp = await axios.delete(`${this._url}/${id}`).catch(e => errorAxios)
    return resp.data as { resp: string }
  }

}