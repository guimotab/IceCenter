import { IReturnResponse } from "./IReturnResponse"

export interface IResponseToken<T>{
  createToken(idManager: string): IReturnResponse<T>
  
  verify(): IReturnResponse<T>
}