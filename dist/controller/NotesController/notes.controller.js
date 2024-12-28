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
exports.getnotes = exports.createnotes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createnotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId, link } = req.body;
    if (!subjectId || !link || subjectId === "" || link === "") {
        res.json({
            message: "All Fields Are Required",
        });
        return;
    }
    try {
        const notes = yield prisma.notes.create({
            data: {
                subjectId,
                link,
            },
        });
        res.json({
            notes: notes,
        });
    }
    catch (error) {
        res.json({
            error: error,
        });
    }
});
exports.createnotes = createnotes;
const getnotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId } = req.body;
    try {
        const notes = yield prisma.notes.findMany({
            where: {
                subjectId,
            },
            select: {
                notes_id: true,
                subjectId: true,
                link: true,
            },
        });
        res.json({
            notes: notes
        });
    }
    catch (error) {
        res.json({
            message: error
        });
    }
});
exports.getnotes = getnotes;
