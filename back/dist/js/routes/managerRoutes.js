import express from "express";
import ManagerController from "../controller/ManagerController.js";
const managerRoute = express.Router();
managerRoute
    .post("/manager/create", ManagerController.createManager);
export default managerRoute;
//# sourceMappingURL=managerRoutes.js.map