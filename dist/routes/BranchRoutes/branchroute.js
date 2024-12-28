"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const branchrouter = (0, express_1.Router)();
const branch_controller_1 = require("../../controller/BranchController/branch.controller");
branchrouter.get("/", branch_controller_1.getallbranch);
exports.default = branchrouter;
