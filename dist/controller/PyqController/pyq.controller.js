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
exports.getpyq = exports.createpyq = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createpyq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId, links } = req.body;
    if (!subjectId || !links || links === "" || subjectId === "") {
        res.json({
            message: "All Fields Are Required",
        });
        return;
    }
    try {
        const newpyq = yield prisma.pyq.create({
            data: {
                subjectId,
                links
            }
        });
        res.json({
            pyq: newpyq
        });
    }
    catch (error) {
        res.json({
            message: error
        });
    }
});
exports.createpyq = createpyq;
const getpyq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId } = req.body;
    if (!subjectId || subjectId === "") {
        res.json({
            message: "All Fields Are Required"
        });
    }
    try {
        const requireddata = yield prisma.pyq.findMany({
            where: {
                subjectId
            }
        });
        res.json({
            pyq: requireddata
        });
    }
    catch (error) {
        res.json({
            message: error
        });
    }
});
exports.getpyq = getpyq;
