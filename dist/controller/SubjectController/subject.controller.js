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
exports.createSubjectMany = exports.createSubject = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { yearId, subjectname, branchname } = req.body;
    if (!yearId || !subjectname || !branchname || yearId === "" || subjectname === "" || branchname === "") {
        res.json({
            message: " Al Fields Are Required"
        });
        return;
    }
    try {
        const newsubject = yield prisma.subject.create({
            data: {
                yearId,
                subjectname,
                branchname
            }
        });
        res.json({
            message: "Subject Created Successfully",
            newsubject
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
        const { yearId, subjectname, branchname } = subject;
        if (!yearId || !subjectname || !branchname || subjectname === "" || branchname === "") {
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
