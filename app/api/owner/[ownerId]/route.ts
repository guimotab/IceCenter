
import { IManager } from "@/interface/IManager";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { ownerId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { ownerId } = params

  try {
    const owner = await prisma.owner.findUnique({ where: { id: ownerId } })
    if (!owner) {
      return NextResponse.json({ resp: "Não foi possível carregar o proprietário" })
    }
    return NextResponse.json({ resp: "Success", data: owner })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }

}
