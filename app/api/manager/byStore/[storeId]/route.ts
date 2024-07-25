
import * as bcrypt from 'bcryptjs'
import { IManager } from "@/interface/IManager";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { storeId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { storeId } = params

  try {
    const manager = await prisma.manager.findUnique({ where: { storeId } })
    if (!manager) {
      return NextResponse.json({ resp: "Gerente não encontrado" })
    }
    return NextResponse.json({ resp: "Success", data: manager })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }
}
