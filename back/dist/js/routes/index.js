import express from 'express';
import authRoute from './authRoutes.js';
import managerRoute from './managerRoutes.js';
import ownerRoute from './ownerRoutes.js';
import companyRoute from './companyRoutes.js';
import storeRoute from './storeRoute.js';
import flavorsRoute from './flavorsRoutes.js';
import revenueRoute from './revenueRoutes.js';
import addressRoute from './addressRoute.js';
import stockRoute from './stockRoutes.js';
const routes = (app) => {
    app.get('/', (req, res) => {
        res.status(200).json({ msg: "Bem-vindo à nossa API!" });
    });
    app.use(express.json(), authRoute, companyRoute, managerRoute, ownerRoute, storeRoute, addressRoute, stockRoute, flavorsRoute, revenueRoute);
};
export default routes;
//# sourceMappingURL=index.js.map