import express from "express";
import SalesController from "../controller/SalesController.js";
const salesRoutes = express.Router();
salesRoutes
    .get("/sales/:id", SalesController.get)
    .get("/sales/all/:revenueId", SalesController.getAllByRevenueId)
    .post("/sales/create", SalesController.createSale)
    .post("/sales/createMany", SalesController.createManySales);
export default salesRoutes;
//# sourceMappingURL=salesRoutes.js.map