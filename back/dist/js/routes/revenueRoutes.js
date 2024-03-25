import express from "express";
import RevenueController from "../controller/RevenueController.js";
const revenueRoute = express.Router();
revenueRoute
    .get("/revenue/:revenueId", RevenueController.get)
    .get("/revenue/stock/:storeId", RevenueController.getByStoreId)
    .put("/revenue/:revenueId", RevenueController.put);
export default revenueRoute;
//# sourceMappingURL=revenueRoutes.js.map