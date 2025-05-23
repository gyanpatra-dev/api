import { Router } from "express";
import { getAnalytics } from "../../controller/DashBoardController/dashboard.controller";
const dashboardRouter = Router()

dashboardRouter.get("/analytics",getAnalytics)

export default dashboardRouter