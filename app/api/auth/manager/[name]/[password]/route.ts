
import { prisma } from "@/lib/prisma"
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";

interface IParamsProps {
  params: { email: string, password: string }
}

export async function GET(res: Request, { params }: IParamsProps) {
  const { email, password } = params

  try {
    //check if user exist
    const manager = await prisma.manager.findUnique({ where: { email } })
    if (!manager) {
      return NextResponse.json({ resp: "Esse email não existe!" })
    }
    if (manager.email !== email) {
      return NextResponse.json({ resp: "Email ou senha incorretos!" })
    }
    //check if password match
    const checkPassword = await bcrypt.compare(password, manager.password)
    if (!checkPassword) {
      return NextResponse.json({ resp: "Email ou senha incorretos!" })
    }
    const secret = process.env.SECRET!
    const secretRefresh = process.env.REFRESH!
    const token = jwt.sign({ id: manager.id, }, secret, { expiresIn: "5m" })
    const refresh = jwt.sign({ id: manager.id, }, secretRefresh, { expiresIn: "30m" })
    return NextResponse.json({ resp: "Success", token: token, refresh: refresh, manager: manager })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: error })
  }
}
