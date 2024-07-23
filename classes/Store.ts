import { IStore } from "@/interface/IStore";

export class Store implements IStore {
  private _id: string
  private _companyId: string
  private _name: string
  private _slug: string;
  private _isOpen: boolean;

  constructor(objectStore: IStore) {
    this._id = objectStore.id
    this._companyId = objectStore.companyId
    this._name = objectStore.name
    this._isOpen = objectStore.isOpen
    this._slug = objectStore.slug
  }

  informations() {
    return {
      id: this._id,
      companyId: this._companyId,
      name: this._name,
      isOpen: this._isOpen,
      slug: this._slug
    } as IStore
  }

  public get id(): string {
    return this._id;
  }
  public get companyId(): string {
    return this._companyId;
  }
  public get name(): string {
    return this._name;
  }
  public get isOpen(): boolean {
    return this._isOpen;
  }
  public get slug(): string {
    return this._slug;
  }

  public set slug(value: string) {
    this._slug = value;
  }
  public set isOpen(value: boolean) {
    this._isOpen = value;
  }
  public set id(value: string) {
    this._id = value;
  }
  public set companyId(value: string) {
    this._companyId = value;
  }
  public set name(value: string) {
    this._name = value;
  }
}