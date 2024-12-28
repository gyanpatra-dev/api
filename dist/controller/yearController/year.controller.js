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
exports.createyear = exports.getallyear = void 0;
const client_1 = require("@prisma/client");
// instances
const prisma = new client_1.PrismaClient();
const getallyear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branch } = req.body;
    if (!branch || branch === "") {
        res.json({
            message: "All Fields Are Required"
        });
    }
    try {
        const requiredyear = yield prisma.year.findMany({
            where: {
                branch
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
const createyear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchId } = req.body;
    if (!branchId || branchId === "") {
        res.json({
            message: "All Fields Are Required"
        });
    }
    try {
        const newyear = yield prisma.year.create({
            data: {
                branchId,
            }
        });
        res.json({
            message: "Year Created Successfully",
            newyear
        });
    }
    catch (error) {
        message: error;
    }
});
exports.createyear = createyear;
