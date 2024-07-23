import { IReturnResponse } from "@/interface/IReturnResponse";

export abstract class Response {
  static return(status: boolean, data?: string, message?: string): IReturnResponse<string> {
    return { status, data, message }
  }
}