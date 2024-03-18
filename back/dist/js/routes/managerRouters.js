import express from "express";
import AdminController from "../controller/AdminController.js";
const adminRoute = express.Router();
adminRoute
    .get("/admin/login/:email/:password", AdminController.login)
    .delete(`/admin/deleteUser/:id/:userId/:password`, AdminController.deleteUser)
    .put("/admin/changeRoleUser", AdminController.changeRoleUser)
    .put("/admin/updateUserInformations", AdminController.updateUserInformations);
export default adminRoute;
//# sourceMappingURL=managerRouters.js.map