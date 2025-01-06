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
exports.createYear = exports.getallyear = void 0;
const client_1 = require("@prisma/client");
// instances
const prisma = new client_1.PrismaClient();
const getallyear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchId } = req.params;
    const branchid = Number(branchId);
    if (!branchid) {
        res.status(400).json({
            message: "All Fields Are Required"
        });
        return;
    }
    try {
        const requiredyear = yield prisma.year.findMany({
            where: {
                branchId: branchid
            }
        });
        res.json({
            requiredyear
        });
    }
    catch (error) {
        message: "Not Found";
        err: error;
    }
});
exports.getallyear = getallyear;
const createYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchId, yearName } = req.body;
    const branchid = Number(branchId);
    if (!branchid || !yearName || yearName.trim() === "") {
        res.status(400).json({
            message: "All Fields Are Required"
        });
        return;
    }
    try {
        const newYear = yield prisma.year.create({
            data: {
                branchId: branchid,
                yearName: yearName
            }
        });
        res.status(201).json({
            message: "Year Created Successfully",
            newYear
        });
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the year",
        });
    }
});
exports.createYear = createYear;
