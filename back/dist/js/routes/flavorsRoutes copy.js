import express from "express";
import FlavorsController from "../controller/FlavorsController.js";
const flavorsRoute = express.Router();
flavorsRoute
    .get("/flavors/all/stock/:storeId", FlavorsController.getAllByStockId);
export default flavorsRoute;
//# sourceMappingURL=flavorsRoutes%20copy.js.map