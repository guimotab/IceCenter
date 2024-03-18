import express from "express";
import StoreController from "../controller/StoreController.js";

const storeRoute = express.Router()
storeRoute
    //coloca do caminho mais específico pro menos específico
    // .get("/admin/login/:email/:password", ManagerController.getByStoreId)
    .post("/store/create", StoreController.createStore)
    // .delete(`/admin/deleteUser/:id/:userId/:password`, ManagerController.deleteUser)

export default storeRoute