import { prisma } from "@/lib/prisma"
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid';

export class AuthService {
  static baseUrl = "http://localhost:4000/auth"

  static async registerCompany(name: string, email: string, password: string) {

    const owner = await prisma.owner.findUnique({ where: { email } })
    if (owner) {
      return { resp: "Esse email já está em uso!" }
    }

    const company = await prisma.company.findUnique({ where: { name } })
    if (company) {
      return { resp: "Esse nome já está em uso!" }
    }

    try {
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      //create user
      const ownerId = uuid()
      const company = await prisma.company.create({
        data: {
          id: uuid(),
          name,
          owner: {
            create: {
              id: ownerId,
              email,
              password: passwordHash
            }
          }
        }, include: {
          owner: true
        }
      })

      const secret = process.env.SECRET!
      const secretRefresh = process.env.REFRESH!

      const token = jwt.sign({ id: ownerId, }, secret, { expiresIn: "5m" })
      const refresh = jwt.sign({ id: ownerId, }, secretRefresh, { expiresIn: "30m" })

      return { resp: "Success", token: token, refresh: refresh, owner: company.owner }
    } catch (error) {
      console.log(error);
      return { resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" }
    }
  }
  static async loginAdmin(email: string, password: string) {
    //check if user exist
    const owner = await prisma.owner.findUnique({ where: { email: email } })
    if (!owner) {
      return { resp: "Email ou senha incorretos!" }
    }
    //check if password match
    const checkPassword = await bcrypt.compare(password, owner.password)
    if (!checkPassword) {
      return { resp: "Email ou senha incorretos!" }
    }
    try {
      const secret = process.env.SECRET!
      const secretRefresh = process.env.REFRESH!
      const token = jwt.sign({ id: owner.id, }, secret, { expiresIn: "5m" })
      const refresh = jwt.sign({ id: owner.id, }, secretRefresh, { expiresIn: "30m" })
      return { resp: "Success", token: token, refresh: refresh, owner: owner }
    } catch (error) {
      console.log(error);
      return { resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" }
    }
  }

  static async loginManager(email: string, password: string) {

    //check if user exist
    const manager = await prisma.manager.findUnique({ where: { email } })
    if (!manager) {
      return { resp: "Esse email não existe!" }
    }
    if (manager.email !== email) {
      return { resp: "Email ou senha incorretos!" }
    }
    //check if password match
    const checkPassword = await bcrypt.compare(password, manager.password)
    if (!checkPassword) {
      return { resp: "Email ou senha incorretos!" }
    }
    try {
      const secret = process.env.SECRET!
      const secretRefresh = process.env.REFRESH!
      const token = jwt.sign({ id: manager.id, }, secret, { expiresIn: "5m" })
      const refresh = jwt.sign({ id: manager.id, }, secretRefresh, { expiresIn: "30m" })
      return { resp: "Success", token: token, refresh: refresh, manager: manager }
    } catch (error) {
      console.log(error);
      return { resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" }
    }
  }
}