import Company from '../models/Company.js';
import createUuid from "../createUuidUtil.js";
class CompanyController {
    static async create(req, res) {
        const { idOwner, name } = req.body;
        try {
            const company = await Company.create({ id: createUuid(), idOwner, name });
            const companyId = company.getDataValue('id');
            await company.save();
            res.status(201).json({ resp: "Sucess" });
            return companyId;
        }
        catch (error) {
            res.status(500).json({ resp: "Aconteceu um erro no servidor. Tente novamente mais tarde!" });
            console.log(error);
        }
    }
    static async getByOwnerId(idOwner) {
        try {
            const manager = await Company.findOne({ where: { idOwner: idOwner } });
            if (manager) {
                return manager.getDataValue("id");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
export default CompanyController;
//# sourceMappingURL=CompanyController.js.map