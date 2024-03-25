import express from "express";
import StockController from "../controller/StockController.js";
const stockRoute = express.Router();
stockRoute
    .get("/stock/store/:storeId", StockController.getByStoreId)
    .put("/stock/:stockId", StockController.put);
export default stockRoute;
//# sourceMappingURL=stockRoutes.js.map