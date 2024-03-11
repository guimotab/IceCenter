import axios from "axios"
import { IHttpService } from "./IHttpService"

export abstract class HttpService<T> implements IHttpService<T> {
  private _url

  constructor(url: string) {
    this._url = "http://localhost:4000/" + url
  }

  async get(id: string): Promise<T> {
    const resp = await axios.get(`${this._url}/${id}`)
    return resp.data
  }
  async getAll(): Promise<T[]> {
    const resp = await axios.get(`${this._url}`)
    return resp.data
  }
  async putData(id: string, data: T): Promise<void> {
    const resp = await axios.put(`${this._url}/${id}`, data)
    return resp.data
  }
  async postData(data: T): Promise<void> {
    const resp = await axios.post(`${this._url}`, data)
    return resp.data
  }
  async deleteData(id: string): Promise<void> {
    const resp = await axios.delete(`${this._url}/${id}`)
    return resp.data
  }

}