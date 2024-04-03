import express from "express";
import StoreController from "../controller/StoreController.js";

const storeRoute = express.Router()
storeRoute
    //coloca do caminho mais específico pro menos específico
    .get("/store/:storeId", StoreController.get)
    .get("/:name", StoreController.getByWebName)
    .put("/store/:storeId", StoreController.put)
    .get("/store/all/company/:companyId", StoreController.getAllByIdCompany)
    .post("/store/create", StoreController.createStore)
    .delete(`/store/:id`, StoreController.delete)

export default storeRoute