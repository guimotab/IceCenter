import express from "express";
import StockController from "../controller/StockController.js";
const stockRoute = express.Router();
stockRoute
    .get("/stock/store/:storeId", StockController.getByStoreId);
export default stockRoute;
//# sourceMappingURL=stockRoutes%20copy.js.map