import { Router } from "express";
import {
  createSubject,
  createSubjectMany,
  getsubjects,
  getSubjectsByYear,
  getCommonsubjects,
  getallsubjects,
  getSubjectsByYearId,
} from "../../controller/SubjectController/subject.controller";
const subjectrouter = Router();

subjectrouter.get("/:branchid/:yearid", getSubjectsByYear);
subjectrouter.get("/:yearid",getSubjectsByYearId)
subjectrouter.post("/create", createSubject);
subjectrouter.post("/createmany", createSubjectMany);
subjectrouter.get("/data", getsubjects);
subjectrouter.get("/common", getCommonsubjects);
subjectrouter.get("/getall", getallsubjects);

export default subjectrouter;
