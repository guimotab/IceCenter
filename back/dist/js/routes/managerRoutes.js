import express from "express";
import ManagerController from "../controller/ManagerController.js";
const managerRoute = express.Router();
managerRoute
    .get("/manager/:managerId", ManagerController.get)
    .put("/manager/:managerId", ManagerController.put)
    .get("/manager/store/:storeId", ManagerController.getByStoreId)
    .post("/manager/create", ManagerController.createManager);
export default managerRoute;
//# sourceMappingURL=managerRoutes.js.map