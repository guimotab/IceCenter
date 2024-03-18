import express from "express";
import AuthController from "../controller/AuthController.js";
import OwnerController from "../controller/OwnerController.js";

const ownerRoute = express.Router()
ownerRoute
//coloca do caminho menos específico pro mais específico
    // .post("/owner/createCompany", OwnerController.createCompany)
    // .get("/auth/login/:email/:password", OwnerController.login)

export default ownerRoute