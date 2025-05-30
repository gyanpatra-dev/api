"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subject_controller_1 = require("../../controller/SubjectController/subject.controller");
const subjectrouter = (0, express_1.Router)();
subjectrouter.get("/common", subject_controller_1.getCommonsubjects);
subjectrouter.get("/getall", subject_controller_1.getallsubjects);
subjectrouter.get("/data", subject_controller_1.getsubjects);
subjectrouter.post("/create", subject_controller_1.createSubject);
subjectrouter.post("/createmany", subject_controller_1.createSubjectMany);
// Dynamic routes come last
subjectrouter.get("/:branchid/:yearid", subject_controller_1.getSubjectsByYear);
subjectrouter.get("/:yearid", subject_controller_1.getSubjectsByYearId);
exports.default = subjectrouter;
