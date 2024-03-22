import express from "express";
import ManagerController from "../controller/ManagerController.js";

const managerRoute = express.Router()
managerRoute
    //coloca do caminho mais específico pro menos específico
    .get("/manager/:managerId", ManagerController.get)
    .put("/manager/:managerId", ManagerController.put)
    .get("/manager/store/:storeId", ManagerController.getByStoreId)
    .post("/manager/create", ManagerController.createManager)
    // .delete(`/admin/deleteUser/:id/:userId/:password`, ManagerController.deleteUser)

export default managerRoute