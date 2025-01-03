"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatebranch = exports.createbranch = exports.getallbranch = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getallbranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branches = yield prisma.branch.findMany();
        if (!branches) {
            res.json({
                message: "No Branch Found !"
            });
        }
        res.json({
            branches: branches,
            message: "Branch Fetched Successfully"
        });
    }
    catch (error) {
        res.json({
            error
        });
    }
});
exports.getallbranch = getallbranch;
const createbranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchname, displayimage, branchimage } = req.body;
    if (!branchname ||
        !displayimage ||
        !branchimage ||
        branchname === "" ||
        branchimage === "" ||
        displayimage === "") {
        res.json({
            message: " All fields are required",
        });
        return;
    }
    try {
        const newbranch = yield prisma.branch.create({
            data: {
                branchname,
                displayimage,
                branchimage,
            },
        });
        if (newbranch) {
            res.json({
                newbranch: newbranch,
            });
        }
    }
    catch (error) {
        res.json({
            error: error,
        });
        console.log(error);
        return;
    }
});
exports.createbranch = createbranch;
const updatebranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchimage, displayimage, branchname } = req.body;
    if (!branchname || !branchimage || !displayimage || branchname === "" || displayimage === "" || branchimage === "") {
        res.json({
            message: "ALL Fields Are Required"
        });
        return;
    }
    try {
        const updatedbranch = yield prisma.branch.update({
            where: {
                branchname
            },
            data: {
                branchimage,
                displayimage
            }
        });
        res.json({
            updatedBranch: updatedbranch
        });
    }
    catch (error) {
        res.json({
            err: error
        });
        return;
    }
});
exports.updatebranch = updatebranch;
