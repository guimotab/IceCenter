import Company from '../models/Company.js';
class OwnerController {
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
export default OwnerController;
//# sourceMappingURL=OwnerController.js.map