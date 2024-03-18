import express from "express";
import ManagerController from "../controller/ManagerController.js";
import CompanyController from "../controller/CompanyController.js";

const companyRoute = express.Router()
companyRoute
    //coloca do caminho mais específico pro menos específico
    // .get("/admin/login/:email/:password", CompanyController.getAll)
    .post("/company/create", CompanyController.create)
    // .delete(`/admin/deleteUser/:id/:userId/:password`, ManagerController.deleteUser)
    // .put("/admin/changeRoleUser", ManagerController.changeRoleUser)
    // .put("/admin/updateUserInformations", ManagerController.updateUserInformations)

export default companyRoute