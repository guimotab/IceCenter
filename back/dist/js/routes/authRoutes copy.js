import express from "express";
import AuthController from "../controller/AuthController.js";
const authRoute = express.Router();
authRoute
    .post("/auth/register", AuthController.register)
    .get("/auth/login/:email/:password", AuthController.login);
export default authRoute;
//# sourceMappingURL=authRoutes%20copy.js.map