export interface IHttpService<T> {
  getAll(): Promise<T[]>
  get(id: string):Promise<T>
  putData(id: string, data: T): void
  postData(data: T): void
  deleteData(id: string): void
}