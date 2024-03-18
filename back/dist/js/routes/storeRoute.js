import express from "express";
import StoreController from "../controller/StoreController.js";
const storeRoute = express.Router();
storeRoute
    .post("/store/create", StoreController.createStore);
export default storeRoute;
//# sourceMappingURL=storeRoute.js.map