import axios from "axios"
import { IHttpService } from "./IHttpService"
import { IOwner } from "@/interface/IOwner"

export abstract class HttpService<T> implements IHttpService<T> {
  private _url

  constructor(url: string) {
    this._url = "http://localhost:4000/" + url
  }

  async get(id: string) {
    const resp = await axios.get(`${this._url}/${id}`)
    return resp.data as { resp: string, data?: T }
  }
  async getAll(): Promise<T[]> {
    const resp = await axios.get(`${this._url}`)
    return resp.data
  }
  async putData(id: string, data: T) {
    const resp = await axios.put(`${this._url}/${id}`, { data: data })
    return resp.data as { resp: string, data?: T }
  }
  async postData(url: string, data: T) {
    const resp = await axios.post(`${this._url}/${url}`, { data: data })
    return resp.data as { resp: string, data?: T }
  }
  async deleteData(id: string) {
    const resp = await axios.delete(`${this._url}/${id}`)
    return resp.data as { resp: string }
  }

}