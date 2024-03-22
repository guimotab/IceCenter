export interface IHttpService<T> {
  getAll(): Promise<T[]>
  get(id: string): Promise<{ resp: string, data?: T }>
  putData(id: string, data: T): Promise<{ resp: string, data?: T }>
  postData(url: string, data: T): Promise<{ resp: string, data?: T }>
  deleteData(id: string): void
}