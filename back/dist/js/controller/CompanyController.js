import createUuid from "../util/createUuidUtil.js";
import prisma from "../app.js";
class CompanyController {
    static async create(req, res) {
        const { ownerId, name } = req.body;
        try {
            const company = await prisma.company.create({ data: { id: createUuid(), name, ownerId } });
            res.status(201).json({ resp: "Sucess" });
            return company.id;
        }
        catch (error) {
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
            console.log(error);
        }
    }
    static async getByOwnerId(companyId, ownerId) {
        try {
            const manager = await prisma.company.findUnique({ where: { ownerId } });
            if (manager) {
                return manager.id;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default CompanyController;
//# sourceMappingURL=CompanyController.js.map