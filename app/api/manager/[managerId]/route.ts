
import * as bcrypt from 'bcryptjs'
import { IManager } from "@/interface/IManager";
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { managerId: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { managerId } = params

  try {
    const manager = await prisma.manager.findUnique({ where: { id: managerId } })
    if (!manager) {
      return NextResponse.json({ resp: "Gerente não encontrado" })
    }
    return NextResponse.json({ resp: "Success", data: manager })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }
}
export async function PUT(res: Request, { params }: IParamsProps) {
  const { ...data } = await res.json() as IManager
  const { managerId } = params

  try {
    const manager = await prisma.manager.update({ where: { id: managerId }, data })

    return NextResponse.json({ resp: "Success", data: manager })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor" })
  }

}
