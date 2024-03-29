import prisma from "../app.js";
import { v4 as uuid } from 'uuid';
class CompanyController {
    static async create(req, res) {
        const { ownerId, name } = req.body;
        try {
            const company = await prisma.company.create({ data: { id: uuid(), name, ownerId } });
            res.status(201).json({ resp: "Success" });
            return company.id;
        }
        catch (error) {
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
            console.log(error);
        }
    }
    static async getByOwnerId(req, res) {
        const { ownerId } = req.params;
        try {
            const company = await prisma.company.findUnique({ where: { ownerId } });
            if (company) {
                res.status(201).json({ resp: "Success", data: company });
                return;
            }
            res.status(500).json({ resp: "Não foi possível carregar a empresa" });
        }
        catch (error) {
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
            console.log(error);
        }
    }
}
export default CompanyController;
//# sourceMappingURL=CompanyController.js.map