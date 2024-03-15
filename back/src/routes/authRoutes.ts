import express from "express";
import AuthController from "../controller/AuthController.js";

const authRoute = express.Router()
authRoute
//coloca do caminho menos específico pro mais específico
    .post("/auth/register", AuthController.register)
    .get("/auth/login/:email/:password", AuthController.login)

export default authRoute