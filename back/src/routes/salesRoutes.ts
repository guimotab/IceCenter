import express from "express";
import StoreController from "../controller/StoreController.js";

const salesRoutes = express.Router()
salesRoutes
    //coloca do caminho mais específico pro menos específico
    .get("/store/all/company/:companyId", StoreController.getAllByIdCompany)
    .put("/sales/:salesId", StoreController.put)
    .post("/store/create", StoreController.createStore)
    .delete(`/store/:id`, StoreController.delete)

export default salesRoutes