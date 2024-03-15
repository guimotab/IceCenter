import express, { Application } from 'express'
import authRoute from './authRoutes.js'
import adminRoute from './adminRoutes.js'
const routes = (app: Application) => {
    app.get('/', (req, res) => {
        res.status(200).json({ msg: "Bem-vindo à nossa API!" })
    })
    app.use(
        express.json(),
        //busca caminhos
        adminRoute,
        authRoute,
    )
}
export default routes
