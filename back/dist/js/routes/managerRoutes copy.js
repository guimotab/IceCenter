import express from "express";
import ManagerController from "../controller/ManagerController.js";
const managerRoute = express.Router();
managerRoute
    .post("/admin/login/:email/:password", ManagerController.createManager);
export default managerRoute;
//# sourceMappingURL=managerRoutes%20copy.js.map