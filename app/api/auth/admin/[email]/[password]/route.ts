
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
    const owner = await prisma.owner.findUnique({ where: { email: email } })
    if (!owner) {
      return NextResponse.json({ resp: "Email ou senha incorretos!" })
    }
    //check if password match
    const checkPassword = await bcrypt.compare(password, owner.password)
    if (!checkPassword) {
      return NextResponse.json({ resp: "Email ou senha incorretos!" })
    }
    const secret = process.env.SECRET!
    const secretRefresh = process.env.REFRESH!
    const token = jwt.sign({ id: owner.id, }, secret, { expiresIn: "5m" })
    const refresh = jwt.sign({ id: owner.id, }, secretRefresh, { expiresIn: "30m" })

    return NextResponse.json({ resp: "Success", token: token, refresh: refresh, owner: owner })
  } catch (error) {
    console.log(error);
    return NextResponse.json({ resp: error })
  }
}
