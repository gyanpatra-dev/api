"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const user_controller_1 = require("../controller/user.controller");
router.get("/", user_controller_1.hello);
exports.default = router;
