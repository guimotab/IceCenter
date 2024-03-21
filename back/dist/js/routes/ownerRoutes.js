import express from "express";
import OwnerController from "../controller/OwnerController.js";
const ownerRoute = express.Router();
ownerRoute
    .get("/owner/:ownerId", OwnerController.getById);
export default ownerRoute;
//# sourceMappingURL=ownerRoutes.js.map