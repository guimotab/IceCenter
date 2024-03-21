import express from "express";
import StockController from "../controller/StockController.js";

const stockRoute = express.Router()
stockRoute
    //coloca do caminho mais específico pro menos específico
    .get("/stock/store/:storeId", StockController.getByStoreId)

export default stockRoute