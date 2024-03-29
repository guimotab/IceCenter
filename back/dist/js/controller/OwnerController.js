import prisma from "../app.js";
class OwnerController {
    static async getById(req, res) {
        const { ownerId } = req.params;
        try {
            const owner = await prisma.owner.findUnique({ where: { id: ownerId } });
            if (owner) {
                res.status(201).json({ resp: "Success", data: owner });
                return;
            }
            res.status(500).json({ resp: "Não foi possível carregar o proprietário" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
        }
    }
}
export default OwnerController;
//# sourceMappingURL=OwnerController.js.map