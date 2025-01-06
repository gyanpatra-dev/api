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
exports.updatebranch = exports.createmanybranch = exports.createbranch = exports.getallbranch = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getallbranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const branches = yield prisma.branch.findMany();
        if (!branches) {
            res.json({
                message: "No Branch Found !",
            });
        }
        res.json({
            branches: branches,
            message: "Branch Fetched Successfully",
        });
    }
    catch (error) {
        res.json({
            error,
        });
    }
});
exports.getallbranch = getallbranch;
const createbranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchname, displayimage, branchcode } = req.body;
    if (!branchcode ||
        !branchname ||
        !displayimage ||
        branchname === "" ||
        displayimage === "" ||
        branchcode === "") {
        res.status(400).json({
            message: "All fields are required",
        });
        return;
    }
    const isbranchexist = yield prisma.branch.findUnique({
        where: { branchname },
    });
    if (isbranchexist) {
        res.status(400).json({ message: "Branch Already Exists" });
        return;
    }
    try {
        const newbranch = yield prisma.branch.create({
            data: { branchname, displayimage, branchcode },
        });
        res.json({ newbranch });
    }
    catch (error) {
        res.status(500).json({ error });
        console.error(error);
    }
});
exports.createbranch = createbranch;
const createmanybranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const branches = req.body;
    if (!Array.isArray(branches) || branches.length === 0) {
        res.status(400).json({ message: "Input must be an array of branches" });
        return;
    }
    for (const branch of branches) {
        const { branchname, displayimage, branchcode } = branch;
        if (!branchname || !displayimage || !branchcode || branchname === "" || displayimage === "" || branchcode === "") {
            res.status(400).json({ message: "All fields are required for each branch" });
            return;
        }
        const isbranchexist = yield prisma.branch.findUnique({
            where: { branchname },
        });
        if (isbranchexist) {
            res.status(400).json({ message: `Branch ${branch.branchname} already exists` });
            return;
        }
    }
    try {
        const newbranches = yield prisma.branch.createMany({ data: branches });
        res.json({ newbranches });
    }
    catch (error) {
        res.status(500).json({ error });
        console.error(error);
    }
});
exports.createmanybranch = createmanybranch;
const updatebranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchimage, displayimage, branchname } = req.body;
    if (!branchname ||
        !branchimage ||
        !displayimage ||
        branchname === "" ||
        displayimage === "" ||
        branchimage === "") {
        res.json({
            message: "ALL Fields Are Required",
        });
        return;
    }
    try {
        const updatedbranch = yield prisma.branch.update({
            where: {
                branchname,
            },
            data: {
                displayimage,
            },
        });
        res.json({
            updatedBranch: updatedbranch,
        });
    }
    catch (error) {
        res.json({
            err: error,
        });
        return;
    }
});
exports.updatebranch = updatebranch;
