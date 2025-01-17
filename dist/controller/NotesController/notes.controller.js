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
exports.getnotesbyid = exports.getnotesbysubjectid = exports.getnotes = exports.createnotes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createnotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId, link, notesname } = req.body;
    if (!subjectId || !link || !notesname || subjectId === "" || link === "" || notesname === "") {
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
                notesname
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
        if (!notes || notes.length === 0) {
            res.json({
                message: "No Notes Found",
            });
            return;
        }
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
const getnotesbysubjectid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId } = req.params;
    const parsedSubjectid = parseInt(subjectId);
    if (!subjectId || subjectId === "") {
        res.json({
            message: "All Fields Are Required",
        });
        return;
    }
    try {
        const notes = yield prisma.notes.findMany({
            where: {
                subjectId: parsedSubjectid
            },
            select: {
                notes_id: true,
                subjectId: true,
                link: true,
                notesname: true
            }
        });
        if (!notes || notes.length === 0) {
            res.status(404).json({
                message: "No Notes Found (get notes by id)",
            });
            return;
        }
        res.json({
            notes
        });
    }
    catch (error) {
        res.json({
            message: error
        });
    }
});
exports.getnotesbysubjectid = getnotesbysubjectid;
const getnotesbyid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { notes_id } = req.params;
    const parsedNotesid = parseInt(notes_id);
    if (!notes_id || notes_id === "") {
        res.json({
            message: "All Fields Are Required",
        });
        return;
    }
    try {
        const note = yield prisma.notes.findFirst({
            where: {
                notes_id: parsedNotesid
            }
        });
        if (!note) {
            res.status(404).json({
                message: "No Notes Found (get notes by id)",
            });
            return;
        }
        res.json({
            note
        });
    }
    catch (error) {
    }
});
exports.getnotesbyid = getnotesbyid;
