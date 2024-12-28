"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const branchrouter = (0, express_1.Router)();
const branch_controller_1 = require("../../controller/BranchController/branch.controller");
const branch_controller_2 = require("../../controller/BranchController/branch.controller");
branchrouter.get("/", branch_controller_1.getallbranch);
branchrouter.post("/create", branch_controller_2.createbranch);
exports.default = branchrouter;
