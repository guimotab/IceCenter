import express from "express";
import AddressController from "../controller/AddressController.js";
const addressRoute = express.Router();
addressRoute
    .get("/address/store/:storeId", AddressController.getByStoreId);
export default addressRoute;
//# sourceMappingURL=AddressRoute%20copy.js.map