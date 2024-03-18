import Company from '../models/Company';
class CompanyController {
    static async create({ idOwner, name }) {
        try {
            const company = await Company.create({ idOwner, name });
            const companyId = company.getDataValue('id');
            await company.save();
            return companyId;
        }
        catch (error) {
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
//# sourceMappingURL=CompanyController%20copy.js.map