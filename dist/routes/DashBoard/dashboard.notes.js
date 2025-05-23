"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../../controller/DashBoardController/dashboard.controller");
const dashboardRouter = (0, express_1.Router)();
dashboardRouter.get("/analytics", dashboard_controller_1.getAnalytics);
exports.default = dashboardRouter;
