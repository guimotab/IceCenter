import express from "express";
import OwnerController from "../controller/OwnerController.js";

const ownerRoute = express.Router()
ownerRoute
//coloca do caminho menos específico pro mais específico
    // .post("/owner/createCompany", OwnerController.createCompany)
    .get("/owner/:ownerId", OwnerController.getById)
    // .get("/auth/login/:email/:password", OwnerController.login)

export default ownerRoute