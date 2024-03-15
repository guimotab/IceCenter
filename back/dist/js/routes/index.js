import express from 'express';
import authRoute from './authRoutes.js';
import adminRoute from './adminRoutes.js';
const routes = (app) => {
    app.get('/', (req, res) => {
        res.status(200).json({ msg: "Bem-vindo à nossa API!" });
    });
    app.use(express.json(), adminRoute, authRoute);
};
export default routes;
//# sourceMappingURL=index.js.map