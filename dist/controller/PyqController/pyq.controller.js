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
exports.getPyqById = exports.getpyq = exports.createmanypyq = exports.createpyq = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createpyq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId, links, pyqname, pyqyear } = req.body;
    if (!subjectId ||
        !pyqname ||
        !links ||
        !pyqyear ||
        links === "" ||
        subjectId === "" ||
        pyqname === "" ||
        pyqyear === "") {
        res.json({
            message: "All Fields Are Required",
        });
        return;
    }
    try {
        const newpyq = yield prisma.pyq.create({
            data: {
                subjectId,
                links,
                pyqname,
                pyqyear,
            },
        });
        res.json({
            pyq: newpyq,
        });
    }
    catch (error) {
        res.json({
            message: error,
        });
    }
});
exports.createpyq = createpyq;
const createmanypyq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pyqs } = req.body;
    if (!Array.isArray(pyqs) || pyqs.length === 0) {
        res.status(406).json({
            message: "At least one pyq is required"
        });
        return;
    }
    // Filter out invalid pyqs
    const validPyqs = pyqs.filter(pyq => {
        const { subjectId, pyqname, links, pyqtype, pyqyear } = pyq;
        return subjectId && pyqname && links && pyqname.trim() && links.trim() && pyqtype.trim() && pyqyear.trim();
    });
    if (validPyqs.length === 0) {
        res.status(406).json({
            message: "All fields are required for each pyq"
        });
        return;
    }
    try {
        const createdPyqs = yield prisma.pyq.createMany({
            data: validPyqs
        });
        res.status(201).json({
            message: `${createdPyqs.count} pyqs created`
        });
    }
    catch (error) {
        console.error("Error creating pyqs:", error);
        res.status(500).json({
            message: "An error occurred while creating pyqs"
        });
    }
});
exports.createmanypyq = createmanypyq;
const getpyq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject_id } = req.params;
    const parsedSubjectid = parseInt(subject_id);
    if (!parsedSubjectid) {
        res.json({
            message: "All Fields Are Required",
        });
        return;
    }
    try {
        const requireddata = yield prisma.pyq.findMany({
            where: {
                subjectId: parsedSubjectid,
            },
            select: {
                links: true,
                subjectId: true,
                pyqtype: true,
                pyq_id: true,
                pyqname: true,
                subject: true
            }
        });
        if (requireddata.length === 0) {
            res.status(404).json({
                message: "Nothing Found",
            });
            return;
        }
        res.json({
            pyq: requireddata,
        });
    }
    catch (error) {
        res.json({
            message: error,
        });
    }
});
exports.getpyq = getpyq;
const getPyqById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pyqid } = req.params;
        const parsedId = parseInt(pyqid);
        if (isNaN(parsedId)) {
            res.status(400).json({ error: 'Invalid PYQ ID format' });
            return;
        }
        const data = yield prisma.pyq.findUnique({
            where: { pyq_id: parsedId }, // Assuming 'id' is the column name
        });
        if (!data) {
            res.status(404).json({ error: 'PYQ not found' });
            return;
        }
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getPyqById = getPyqById;
