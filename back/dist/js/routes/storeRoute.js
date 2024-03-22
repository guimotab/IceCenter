import express from "express";
import StoreController from "../controller/StoreController.js";
const storeRoute = express.Router();
storeRoute
    .get("/store/:storeId", StoreController.get)
    .put("/store/:storeId", StoreController.put)
    .get("/store/all/company/:idCompany", StoreController.getAllByIdCompany)
    .post("/store/create", StoreController.createStore);
export default storeRoute;
//# sourceMappingURL=storeRoute.js.map