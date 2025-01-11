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
exports.getCommonsubjects = exports.createSubjectMany = exports.createSubject = exports.getSubjectsByYear = exports.getsubjects = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getsubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { yearId, branchname } = req.body;
    if (!yearId || !branchname || yearId === "" || branchname === "") {
        res.status(400).json({
            message: "All Fields Are Required",
        });
        return;
    }
    try {
        const requireddata = yield prisma.subject.findMany({
            where: {
                yearId,
                branchname,
            },
        });
        res.status(200).json({
            subjects: requireddata,
        });
    }
    catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).json({
            error: "Failed to fetch subjects",
        });
    }
});
exports.getsubjects = getsubjects;
const getSubjectsByYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchid, yearid } = req.params;
    const parsedYearId = Number(yearid);
    const parsedBranchId = Number(branchid);
    // Check for NaN and ensure both are valid numbers
    if (isNaN(parsedYearId) || isNaN(parsedBranchId)) {
        res.status(400).json({
            message: "All fields are required and must be valid numbers.",
        });
        return;
    }
    try {
        const subjects = yield prisma.subject.findMany({
            where: {
                yearId: parsedYearId,
                branchid: parsedBranchId,
            },
        });
        if (!subjects || subjects.length === 0) {
            res.status(404).json({
                message: "No subjects found",
            });
            return;
        }
        res.status(200).json({ subjects });
    }
    catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).json({
            message: "An error occurred while fetching subjects.",
        });
    }
});
exports.getSubjectsByYear = getSubjectsByYear;
const createSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { yearId, subjectname, branchname, branchid } = req.body;
    if (!yearId ||
        !subjectname ||
        !branchname ||
        yearId === "" ||
        subjectname === "" ||
        branchname === "") {
        res.json({
            message: " Al Fields Are Required",
        });
        return;
    }
    const issubjectexist = yield prisma.subject.findMany({
        where: {
            subjectname: subjectname,
            yearId,
        },
    });
    if (issubjectexist.length > 0) {
        res.status(400).json({
            message: "Subject Already Exists",
        });
        return;
    }
    try {
        const newsubject = yield prisma.subject.create({
            data: {
                yearId,
                subjectname,
                branchname,
                branchid,
            },
        });
        res.json({
            message: "Subject Created Successfully",
            newsubject,
        });
    }
    catch (error) {
        message: "Filed";
        error;
        return;
    }
});
exports.createSubject = createSubject;
const createSubjectMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subjects = req.body; // Expecting an array of objects
    // Validate the input
    if (!Array.isArray(subjects) || subjects.length === 0) {
        res.status(400).json({
            message: "At least one subject is required",
        });
        return;
    }
    for (const subject of subjects) {
        const { yearId, subjectname, branchname, branchid } = subject;
        if (!yearId ||
            !subjectname ||
            !branchname ||
            !branchid ||
            subjectname === "" ||
            branchname === "") {
            res.status(400).json({
                message: "All fields are required for each subject",
            });
            return;
        }
    }
    try {
        // Insert multiple subjects
        const newSubjects = yield prisma.subject.createMany({
            data: subjects,
        });
        res.status(201).json({
            message: "Subjects created successfully",
            count: newSubjects.count, // Number of subjects created
        });
    }
    catch (error) {
        console.error("Error creating subjects:", error);
        res.status(500).json({
            message: "Failed to create subjects",
            error,
        });
    }
});
exports.createSubjectMany = createSubjectMany;
const getCommonsubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjects = yield prisma.subject.findMany({
            where: {
                iscommon: true,
            },
        });
        if (!subjects) {
            res.status(400).json({
                message: "No Subjects Found",
            });
            return;
        }
        res.json({
            subjects,
        });
    }
    catch (error) {
        error;
    }
});
exports.getCommonsubjects = getCommonsubjects;
