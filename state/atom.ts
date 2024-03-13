import { ICompany } from "@/interface/ICompany";
import { IManager } from "@/interface/IManager";
import { IOwner } from "@/interface/IOwner";
import { IStore } from "@/interface/IStore";
import { atom } from "recoil";

export const currentOwner = atom<IOwner>({
  key: 'currentOwner', 
  default: undefined,
});

export const currentCompany = atom<ICompany>({
  key: 'currentCompany', 
  default: undefined,
});

export const currentManager = atom<IManager>({
  key: 'currentManager', 
  default: undefined,
});

export const currentStore = atom<IStore>({
  key: 'currentStore', 
  default: undefined,
});