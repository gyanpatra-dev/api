"use strict";
// imports
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controller/auth.controller");
const auth_controller_2 = require("../controller/auth.controller");
// instances
const authrouter = (0, express_1.Router)();
// routes 
authrouter.post("/signup", auth_controller_1.signup);
authrouter.post("/signin", auth_controller_2.signin);
exports.default = authrouter;
