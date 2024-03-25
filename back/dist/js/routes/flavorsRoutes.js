import express from "express";
import FlavorsController from "../controller/FlavorsController.js";
const flavorsRoute = express.Router();
flavorsRoute
    .get("/flavors/all/stock/:storeId", FlavorsController.getAllByStockId)
    .put("/flavors/:stockId", FlavorsController.putAllByStockId);
export default flavorsRoute;
//# sourceMappingURL=flavorsRoutes.js.map