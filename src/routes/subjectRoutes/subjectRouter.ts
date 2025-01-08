import { Router } from "express";
import { createSubject, createSubjectMany, getsubjects,getSubjectsByYear, getCommonsubjects } from "../../controller/SubjectController/subject.controller";
const subjectrouter = Router();


subjectrouter.get("/:branchid/:yearid", getSubjectsByYear);

subjectrouter.post("/create",createSubject);
subjectrouter.post("/createmany",createSubjectMany);
subjectrouter.get("/data",getsubjects);
subjectrouter.get("/common",getCommonsubjects)



export default subjectrouter;