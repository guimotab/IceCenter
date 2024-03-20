import prisma from "../app";
class OwnerController {
    static async getByOwnerId(ownerId) {
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
export default OwnerController;
//# sourceMappingURL=OwnerController.js.map