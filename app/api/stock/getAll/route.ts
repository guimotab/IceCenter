
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { storeId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  try {
    const stock = await prisma.stockStore.findMany({})
    if (!stock) {
      return NextResponse.json({ resp: "Estoque não encontrado" })
    }
    return NextResponse.json({ resp: "Success", data: stock })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }
}