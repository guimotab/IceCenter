
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

export async function POST(res: Request, { params }: IParamsProps) {
  const { email, password, storeId } = await res.json() as IManager
  const { managerId } = params

  try {
    const userExist = await prisma.manager.findUnique({ where: { email } })
    if (userExist) {
      return NextResponse.json({ resp: "Este email já existe!" })
    }
    // create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    //create user
    const manager = await prisma.manager.create({ data: { email, password: passwordHash, storeId } })

    return NextResponse.json({ resp: "Success", data: manager })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: "Ocorreu um erro no servidor!" })
  }

}
