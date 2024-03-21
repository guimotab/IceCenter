import { StockService } from "@/service/StockService";
export class StockController {
    static async getByStockId(stockId) {
        return await this.stockService.getByStockId(stockId);
    }
    static async get(id) {
        return await this.stockService.get(id);
    }
    static async put(id, data) {
        await this.stockService.putData(id, data);
    }
    static async post(data) {
        return await this.stockService.postData("create", data);
    }
    static async delete(id) {
        await this.stockService.deleteData(id);
    }
}
StockController.stockService = StockService.getInstance();
//# sourceMappingURL=StockController.js.map