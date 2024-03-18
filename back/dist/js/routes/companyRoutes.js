import express from "express";
import CompanyController from "../controller/CompanyController.js";
const companyRoute = express.Router();
companyRoute
    .post("/company/create", CompanyController.create);
export default companyRoute;
//# sourceMappingURL=companyRoutes.js.map