import express from "express";
import RevenueController from "../controller/RevenueController.js";

const revenueRoute = express.Router()
revenueRoute
    //coloca do caminho mais específico pro menos específico
    .get("/revenue/:revenueId", RevenueController.get)
    .get("/revenue/stock/:storeId", RevenueController.getByStoreId)

export default revenueRoute