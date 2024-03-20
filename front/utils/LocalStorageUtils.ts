export abstract class LocalStorageUtils {

  static saveTokens(token: string, refresh: string) {
    const tokens = { token, refresh }
    localStorage.setItem("tokens", JSON.stringify(tokens))
  }
  static getTokens() {
    const storage = localStorage.getItem("tokens")
    if (storage) {
      const json = JSON.parse(storage) as { token: string, refresh: string }
      return json
    }
  }
  static deleteTokens() {
    localStorage.removeItem("tokens")
  }
}