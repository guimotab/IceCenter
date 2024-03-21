import express from "express";
import CompanyController from "../controller/CompanyController.js";
const companyRoute = express.Router();
companyRoute
    .get("/company/owner/:ownerId", CompanyController.getByOwnerId)
    .post("/company/create", CompanyController.create);
export default companyRoute;
//# sourceMappingURL=companyRoutes.js.map