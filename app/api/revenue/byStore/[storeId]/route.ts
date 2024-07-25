
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { storeId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { storeId } = params

  try {
    const revenue = await prisma.revenue.findUnique({ where: { storeId } })
    if (!revenue) {
      return NextResponse.json({ resp: "Montante não encontrado" })
    }
    return NextResponse.json({ resp: "Success", data: revenue })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }
}

