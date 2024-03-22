import express from "express";
import AddressController from "../controller/AddressController.js";
const addressRoute = express.Router();
addressRoute
    .get("/address/store/:storeId", AddressController.getByStoreId)
    .put("/address/:addressId", AddressController.put);
export default addressRoute;
//# sourceMappingURL=addressRoute.js.map