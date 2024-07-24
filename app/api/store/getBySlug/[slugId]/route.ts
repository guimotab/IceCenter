
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { slugId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { slugId } = params

  try {
    const store = await prisma.store.findUnique({ where: { slug: slugId } })

    if (!store) {
      return NextResponse.json({ resp: "Loja não encontrada" })
    }
    return NextResponse.json({ resp: "Success", data: store })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }
}


