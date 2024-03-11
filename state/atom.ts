import { ICompany } from "@/interface/ICompany";
import { IOwner } from "@/interface/IOwner";
import { atom } from "recoil";

export const currentOwner = atom<IOwner>({
  key: 'currentOwner', 
  default: undefined,
});

export const currentCompany = atom<ICompany>({
  key: 'currentCompany', 
  default: undefined,
});