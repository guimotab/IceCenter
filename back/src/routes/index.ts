import express, { Application } from 'express'
import authRoute from './authRoutes.js'
import managerRoute from './managerRoutes.js'
import ownerRoute from './ownerRoutes.js'
import companyRoute from './companyRoutes.js'
import storeRoute from './storeRoute.js'
import addressRoute from './AddressRoute.js'
import stockRoute from './StockRoutes.js'
const routes = (app: Application) => {
    app.get('/', (req, res) => {
        res.status(200).json({ msg: "Bem-vindo à nossa API!" })
    })
    app.use(
        express.json(),
        //busca caminhos
        authRoute,
        companyRoute,
        managerRoute,
        ownerRoute,
        storeRoute,
        addressRoute,
        stockRoute,
    )
}
export default routes
