import express from "express";
import AddressController from "../controller/AddressController.js";

const addressRoute = express.Router()
addressRoute
    //coloca do caminho mais específico pro menos específico
    .get("/address/store/:storeId", AddressController.getByStoreId)
    .put("/address/:addressId", AddressController.put)

export default addressRoute