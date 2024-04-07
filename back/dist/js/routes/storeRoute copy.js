import express from "express";
import StoreController from "../controller/StoreController.js";
const storeRoute = express.Router();
storeRoute
    .get("/store/all/company/:companyId", StoreController.getAllByIdCompany)
    .get("/store/:storeId", StoreController.get)
    .get("/:slug", StoreController.getBySlug)
    .put("/store/:storeId", StoreController.put)
    .post("/store/create", StoreController.createStore)
    .delete(`/store/:id`, StoreController.delete);
export default storeRoute;
//# sourceMappingURL=storeRoute%20copy.js.map