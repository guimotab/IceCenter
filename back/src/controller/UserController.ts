import { Request, Response } from 'express';
import User from '../models/User.js';
abstract class UserController{
    static async allUsers(req: Request, res: Response){
        try{
            const user = await User.find({}, '-password') //não devolve a senha na requisição
            if (!user) {
                return res.json({ msg: "Usuário não encontrado" })
            }
            res.status(200).json({ msg:"Sucess", users: user })
        } catch (error){
            console.log(error);
        }
    }
    static async findUser(req: Request, res: Response){
        try{
            const { id } = req.params
            const user = await User.findById(id, '-password') //não devolve a senha na requisição
            if (!user) {
                return res.json({ msg: "Usuário não encontrado" })
            }
            res.status(200).json({ msg:"Sucess", currentUser: user })
        } catch (error){
            console.log(error);
            res.json({ msg:"Ocorreu um erro no servidor" })
        }
    }
}
export default UserController