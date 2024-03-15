import User from '../models/User.js';
class UserController {
    static async allUsers(req, res) {
        try {
            const user = await User.find({}, '-password');
            if (!user) {
                return res.json({ msg: "Usuário não encontrado" });
            }
            res.status(200).json({ msg: "Sucess", users: user });
        }
        catch (error) {
            console.log(error);
        }
    }
    static async findUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id, '-password');
            if (!user) {
                return res.json({ msg: "Usuário não encontrado" });
            }
            res.status(200).json({ msg: "Sucess", currentUser: user });
        }
        catch (error) {
            console.log(error);
            res.json({ msg: "Ocorreu um erro no servidor" });
        }
    }
}
export default UserController;
//# sourceMappingURL=UserController.js.map