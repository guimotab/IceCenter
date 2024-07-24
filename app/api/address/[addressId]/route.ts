
import { IAddress } from "@/interface/IAddress";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { storeId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { storeId } = params

  try {
    const address = await prisma.address.findUnique({ where: { storeId } })
    if (!address) {
      return NextResponse.json({ resp: "Endereço não encontrado" })
    }
    return NextResponse.json({ resp: "Success", data: address })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }

}
