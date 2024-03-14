export abstract class LocalStorageUtils{
  static saveOwner(id: string){
    localStorage.setItem("owner", JSON.stringify(id))
  }
  static getIdOwner(){
    const storage = localStorage.getItem("owner")
    if(storage){
      const json = JSON.parse(storage) as string
      return json
    }
  }
  static deleteOwner(){
    localStorage.removeItem("owner")
  }

  static saveManager(id: string){
    localStorage.setItem("manager", JSON.stringify(id))
  }

  static getIdManager(){
    const storage = localStorage.getItem("manager")
    if(storage){
      const json = JSON.parse(storage) as string
      return json
    }
  }
  static deleteManager(){
    localStorage.removeItem("manager")
  }
}