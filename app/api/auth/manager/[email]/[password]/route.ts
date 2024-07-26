
import { prisma } from "@/lib/prisma"
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
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
    const token = jwt.sign({ id: manager.id, }, secret, { expiresIn: "1d" })

    cookies().set(`token-icecenter-manager`, JSON.stringify({ token }))

    return NextResponse.json({ resp: "Success", token: token, manager: manager })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: error })
  }
}
