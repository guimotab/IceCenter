
import { IManager } from "@/interface/IManager";
import { IStockStore } from "@/interface/IStockStore";
import { IStore } from "@/interface/IStore";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { companyId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { companyId } = params

  try {
    const store = await prisma.store.findMany({ where: { companyId } })
    if (!store) {
      return NextResponse.json({ resp: "Loja não encontrada" })
    }
    return NextResponse.json({ resp: "Success", data: store })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }
}


