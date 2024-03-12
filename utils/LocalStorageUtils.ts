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
  }
}