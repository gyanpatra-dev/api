"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminrouter = (0, express_1.Router)();
const user_controller_1 = require("../../controller/UserController/user.controller");
adminrouter.get("/", user_controller_1.getusers);
exports.default = adminrouter;
