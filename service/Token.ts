export class Token {
  constructor(private _token: string, private _refresh: string) { }

  get token(): string {
    return this._token
  }
  get refresh(): string {
    return this._refresh
  }

  set token(value: string) {
    this._token = value
  }
  set refresh(value: string) {
    this._refresh = value
  }
}