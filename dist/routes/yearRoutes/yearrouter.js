"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const year_controller_1 = require("../../controller/yearController/year.controller");
const yearrouter = (0, express_1.Router)();
yearrouter.get("/:branchId", year_controller_1.getallyear);
// yearrouter.post("/create",createyear)
exports.default = yearrouter;
