"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pyq_controller_1 = require("../../controller/PyqController/pyq.controller");
const pyqrouter = (0, express_1.Router)();
pyqrouter.post("/create", pyq_controller_1.createpyq);
pyqrouter.get("/", pyq_controller_1.getpyq);
exports.default = pyqrouter;
