import express from "express";
import StoreController from "../controller/StoreController.js";

const storeRoute = express.Router()
storeRoute
    //coloca do caminho mais específico pro menos específico
    .get("/store/:storeId", StoreController.get)
    .put("/store/:storeId", StoreController.put)
    .get("/store/all/company/:idCompany", StoreController.getAllByIdCompany)
    .post("/store/create", StoreController.createStore)
    // .delete(`/admin/deleteUser/:id/:userId/:password`, ManagerController.deleteUser)

export default storeRoute